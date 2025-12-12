import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/services/stripe';
import dbConnect from '@/lib/db/connect';
import Order from '@/lib/db/models/Order';
import Ticket from '@/lib/db/models/Ticket';
import TicketType from '@/lib/db/models/TicketType';
import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose';
import { sendTicketEmail } from '@/lib/services/email';

export async function POST(req: Request) {
    const body = await req.text();
    const headersList = await headers();
    const signature = headersList.get('stripe-signature') as string;

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (err: any) {
        console.error(`Webhook signature verification failed: ${err.message}`);
        return NextResponse.json({ error: err.message }, { status: 400 });
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as any;
        const orderId = session.metadata.orderId;

        await dbConnect();

        // 1. Update Order Status
        const order = await Order.findById(orderId);
        if (!order) {
            console.error('Order not found for webhook:', orderId);
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }

        order.status = 'paid';
        order.stripePaymentIntentId = session.payment_intent;
        await order.save();

        // 2. Generate Tickets
        const ticketsToInsert = [];
        for (const item of order.items) {
            // Update inventory
            await TicketType.findByIdAndUpdate(item.ticketTypeId, {
                $inc: { quantitySold: item.quantity }
            });

            // Create individual tickets
            for (let i = 0; i < item.quantity; i++) {
                ticketsToInsert.push({
                    orderId: order._id,
                    ticketTypeId: item.ticketTypeId,
                    ticketCode: uuidv4(), // Generate unique QR string
                    status: 'active'
                });
            }
        }

        await Ticket.insertMany(ticketsToInsert);

        // Fetch user for email
        const user = await mongoose.model('User').findById(order.userId);

        // Send Email
        await sendTicketEmail(
            user.email,
            user.name,
            "Event Name Placeholder", // Ideally verify populate or store event name in order snapshot
            order._id.toString()
        );

        console.log(`Tickets generated and email sent for Order ${orderId}`);
    }

    return NextResponse.json({ received: true });
}
