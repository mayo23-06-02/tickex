"use server";

import dbConnect from "@/lib/db/connect";
import Order from "@/lib/db/models/Order";
import TicketType from "@/lib/db/models/TicketType";
import Ticket from "@/lib/db/models/Ticket";
import Event from "@/lib/db/models/Event";
import { stripe } from "@/lib/services/stripe";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';

interface TicketSelection {
    ticketTypeId: string;
    quantity: number;
}

// export async function checkout(eventId: string, items: TicketSelection[]) {
// Changed to Server Action pattern compatible with FormData if needed, but keeping it flexible
export async function checkout(prevState: any, formData: FormData) {
    const eventId = formData.get("eventId") as string;
    const itemsJson = formData.get("items") as string;

    if (!eventId || !itemsJson) {
        return { error: "Missing checkout data" };
    }

    const items: TicketSelection[] = JSON.parse(itemsJson);

    const session = await auth();
    if (!session?.user) {
        return { error: "You must be logged in to purchase tickets." };
    }
    const userId = session.user.id;

    try {
        await dbConnect();

        // 1. Validate Inventory & Calculate Total
        let totalAmount = 0;
        const lineItems = [];
        const orderItems = [];

        for (const item of items) {
            const ticketType = await TicketType.findById(item.ticketTypeId);
            if (!ticketType) return { error: `Ticket not found: ${item.ticketTypeId}` };

            if (ticketType.quantitySold + item.quantity > ticketType.quantityTotal) {
                return { error: `Not enough tickets available for ${ticketType.name}` };
            }

            const itemTotal = ticketType.price * item.quantity;
            totalAmount += itemTotal;

            orderItems.push({
                ticketTypeId: ticketType._id,
                quantity: item.quantity,
                priceAtPurchase: ticketType.price,
                total: itemTotal
            });

            lineItems.push({
                price_data: {
                    currency: 'szl', // Or usd if Stripe doesn't support SZL directly
                    product_data: {
                        name: ticketType.name,
                    },
                    unit_amount: Math.round(ticketType.price * 100), // cents
                },
                quantity: item.quantity,
            });
        }

        // 2. Create Pending Order
        const order = await Order.create({
            userId,
            eventId,
            items: orderItems,
            totalAmount,
            status: "pending"
        });

        // 3. Create Stripe Checkout Session
        const stripeSession = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/tickets?success=true&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/events/${eventId}?cancelled=true`,
            metadata: {
                orderId: order._id.toString(),
                userId: userId
            }
        });

        // Save session ID to order
        order.stripeSessionId = stripeSession.id;
        await order.save();

        redirect(stripeSession.url!);
    } catch (error) {
        if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
            throw error;
        }
        console.error("Checkout error:", error);
        return { error: "Checkout failed. Please try again." };
    }
}

/**
 * Mocks the payment process for demonstration purposes.
 * Updates the database (orders, tickets, event stats) without actual payment gateway.
 */
export async function processMockPayment(orderData: {
    eventId: string;
    items: {
        ticketTypeId: string;
        ticketName: string;
        quantity: number;
        price: number;
    }[];
    totalAmount: number;
    userId: string;
    paymentMethod: string;
}) {
    await dbConnect();

    try {
        console.log("Processing mock payment for user:", orderData.userId);

        // 1. Create Order
        const orderItems = orderData.items.map(item => ({
            ticketTypeId: item.ticketTypeId,
            quantity: item.quantity,
            priceAtPurchase: item.price,
            total: item.price * item.quantity
        }));

        const newOrder = await Order.create({
            userId: orderData.userId,
            eventId: orderData.eventId,
            items: orderItems,
            totalAmount: orderData.totalAmount,
            currency: 'SZL',
            status: 'paid', // Immediately paid for mock
            stripePaymentIntentId: `mock_pi_${uuidv4()}`
        });

        console.log("Order created:", newOrder._id);

        // 2. Create Tickets
        const ticketsToCreate = [];
        for (const item of orderData.items) {
            for (let i = 0; i < item.quantity; i++) {
                ticketsToCreate.push({
                    orderId: newOrder._id,
                    ticketTypeId: item.ticketTypeId,
                    ticketCode: `TIX-${uuidv4().substring(0, 8).toUpperCase()}`,
                    status: 'active'
                });
            }
        }
        await Ticket.insertMany(ticketsToCreate);
        console.log(`Created ${ticketsToCreate.length} tickets`);

        // 3. Update Inventory & Event Stats
        let totalTicketsSold = 0;

        for (const item of orderData.items) {
            // Update TicketType
            await TicketType.findByIdAndUpdate(item.ticketTypeId, {
                $inc: { quantitySold: item.quantity }
            });
            totalTicketsSold += item.quantity;
        }

        // Update Event Stats
        await Event.findByIdAndUpdate(orderData.eventId, {
            $inc: {
                ticketsSold: totalTicketsSold,
                revenue: orderData.totalAmount
            }
        });
        console.log("Updated event stats");

        return { success: true, orderId: newOrder._id.toString() };
    } catch (error) {
        console.error("Mock payment error:", error);
        return { success: false, error: "Payment processing failed" };
    }
}
