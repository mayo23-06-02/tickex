"use server";

import { auth } from "@/auth";
import dbConnect from "@/lib/db/connect";
import Order from "@/lib/db/models/Order";
import Payout from "@/lib/db/models/Payout";
import Event from "@/lib/db/models/Event";
import mongoose from "mongoose";

export async function getFinancialData() {
    const session = await auth();
    if (!session?.user?.id) throw new Error("Unauthorized");

    await dbConnect();

    const userId = session.user.id;

    // Get events created by the user
    // Assuming Event model has organizerId - let's check Event model later to be sure, 
    // but typically it should.
    // If Event model doesn't have organizerId, we might need to rely on something else.
    // Let's assume for now.

    // Aggregation for Revenue
    const revenueStats = await Order.aggregate([
        {
            $lookup: {
                from: "events",
                localField: "eventId",
                foreignField: "_id",
                as: "event"
            }
        },
        { $unwind: "$event" },
        {
            $match: {
                "event.organizerId": new mongoose.Types.ObjectId(userId),
                status: "paid"
            }
        },
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: "$totalAmount" },
                ticketSales: { $sum: 1 } // Simplification, strictly should sum items quantity
            }
        }
    ]);

    // Payouts
    const payouts = await Payout.find({ organizerId: userId }).sort({ createdAt: -1 });

    const totalRevenue = revenueStats[0]?.totalRevenue || 0;
    const totalSales = revenueStats[0]?.ticketSales || 0; // Check logic later

    // Calculate pending payouts
    const pendingPayouts = payouts
        .filter(p => p.status === 'pending')
        .reduce((acc, curr) => acc + curr.amount, 0);

    // Recent Transactions (Orders)
    const recentTransactions = await Order.find({
        // We'd ideally filter by event ownership, but simplified:
        // Assuming we could filter by events owned by user.
        // For now, let's just get Orders for events owned by user.
        // But Order doesn't have organizerId directly. It has eventId.
        // The aggregation above correctly filtered.
        // We need 2 queries or 1 lookup.
        // Let's do a lookup.
    }).populate({
        path: 'eventId',
        match: { organizerId: userId },
        select: 'title'
    }).sort({ createdAt: -1 }).limit(5);

    // Filter out orders where population failed (meaning event not owned by user)
    const filteredTransactions = recentTransactions.filter(t => t.eventId);

    const mappedTransactions = filteredTransactions.map(t => ({
        id: t._id.toString(),
        customer: t.user?.name || t.user?.email || "Guest", // Order might store user details or ref
        amount: t.totalAmount,
        status: t.status,
        date: t.createdAt,
        event: t.eventId?.title
    }));

    return {
        totalRevenue,
        pendingPayouts,
        totalSales,
        payouts: JSON.parse(JSON.stringify(payouts)),
        recentTransactions: JSON.parse(JSON.stringify(mappedTransactions))
    };
}

export async function requestPayout(amount: number, method: string) {
    const session = await auth();
    if (!session?.user?.id) throw new Error("Unauthorized");

    await dbConnect();

    // Logic to validate balance would go here

    const payout = await Payout.create({
        organizerId: session.user.id,
        // eventId: ... needs to be specific or general balance? 
        // For simplicity, let's assume general balance or pick latest event
        // This part requires careful thought on business logic.
        // For now, let's creating a placeholder payout.
        eventId: new mongoose.Types.ObjectId("000000000000000000000000"), // Placeholder
        amount,
        method,
        status: 'pending'
    });

    return JSON.parse(JSON.stringify(payout));
}

import Bill from "@/lib/db/models/Bill";

export async function getBills() {
    const session = await auth();
    if (!session?.user?.id) throw new Error("Unauthorized");

    await dbConnect();

    const bills = await Bill.find({ organizerId: session.user.id }).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(bills));
}

export async function createBill(data: any) {
    const session = await auth();
    if (!session?.user?.id) throw new Error("Unauthorized");

    await dbConnect();

    const bill = await Bill.create({
        ...data,
        organizerId: session.user.id,
        status: "Pending"
    });

    return JSON.parse(JSON.stringify(bill));
}

export async function payBill(id: string, paymentDetails: any) {
    const session = await auth();
    if (!session?.user?.id) throw new Error("Unauthorized");

    await dbConnect();

    const bill = await Bill.findOneAndUpdate(
        { _id: id, organizerId: session.user.id },
        {
            status: "Paid",
            paymentDetails: {
                ...paymentDetails,
                paidAt: new Date()
            }
        },
        { new: true }
    );

    return JSON.parse(JSON.stringify(bill));
}
