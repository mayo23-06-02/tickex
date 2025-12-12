"use server";

import { auth } from "@/auth";
import dbConnect from "@/lib/db/connect";
import Order from "@/lib/db/models/Order";
import Event from "@/lib/db/models/Event";
import User from "@/lib/db/models/User";

export async function getCustomers() {
    const session = await auth();
    if (!session?.user?.id) throw new Error("Unauthorized");
    await dbConnect();

    // 1. Get Organizer's Events
    const events = await Event.find({ organizerId: session.user.id }, '_id');
    const eventIds = events.map(e => e._id);

    // 2. Find Orders
    // We only care about paid orders for "Customers" list usually
    const orders = await Order.find({
        eventId: { $in: eventIds },
        status: 'paid'
    })
        .populate('userId', 'name email image')
        .populate('eventId', 'title')
        .sort({ createdAt: -1 });

    // 3. Group by User
    const customerMap = new Map();

    for (const order of orders) {
        if (!order.userId) continue; // Skip orphaned orders
        const uid = order.userId._id.toString();

        if (!customerMap.has(uid)) {
            customerMap.set(uid, {
                id: uid,
                userObj: order.userId, // Store for derived fields
                orders: [],
                totalSpent: 0,
                firstPurchaseDate: order.createdAt,
                lastPurchaseDate: order.createdAt,
            });
        }

        const cust = customerMap.get(uid);

        // Add order to history
        cust.orders.push({
            id: order._id.toString(), // Display ID can be simplified
            event: order.eventId?.title || "Unknown Event",
            date: order.createdAt,
            amount: order.totalAmount,
            tickets: order.items.reduce((acc: number, item: any) => acc + item.quantity, 0)
        });

        // Update stats
        cust.totalSpent += order.totalAmount;
        if (new Date(order.createdAt) > new Date(cust.lastPurchaseDate)) {
            cust.lastPurchaseDate = order.createdAt;
        }
        if (new Date(order.createdAt) < new Date(cust.firstPurchaseDate)) {
            cust.firstPurchaseDate = order.createdAt;
        }
    }

    // 4. Format for UI
    const customers = Array.from(customerMap.values()).map(c => {
        const orderCount = c.orders.length;

        // Tier Logic
        let tier = 'Bronze';
        if (c.totalSpent > 5000) tier = 'VIP';
        else if (c.totalSpent > 2500) tier = 'Gold';
        else if (c.totalSpent > 1000) tier = 'Silver';

        // Tags Logic
        const tags = [];
        if (tier === 'VIP') tags.push('VIP');
        if (orderCount > 1) tags.push('Repeat');
        else tags.push('First-time');

        // Engagement Score (Mock logic based on spend/orders)
        const engagementScore = Math.min(100, Math.floor((c.totalSpent / 100) + (orderCount * 10)));

        const name = c.userObj.name || "Unknown Customer";
        const email = c.userObj.email || "No Email";
        const initials = name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase();

        return {
            id: c.id,
            name,
            email,
            initials,
            tier,
            totalSpent: c.totalSpent,
            lastPurchaseDate: new Date(c.lastPurchaseDate).toLocaleDateString(), // Format? UI expects string relative? UI mock: "3 days ago". I'll pass ISO or Date and UI formats. Mock pass string.
            // I'll pass formatted string for now to match UI expectation or modify UI. 
            // Better to pass Date string.
            tags,
            avatarColor: "bg-green-500", // Could hash name to get color
            stats: {
                lifetimeValue: c.totalSpent,
                totalPurchases: orderCount,
                lastActivity: new Date(c.lastPurchaseDate).toLocaleDateString(),
                customerSince: new Date(c.firstPurchaseDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }),
                engagementScore
            },
            history: c.orders // Include history for details view
        };
    });

    return JSON.parse(JSON.stringify(customers));
}
