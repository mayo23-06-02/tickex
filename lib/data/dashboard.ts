import dbConnect from "@/lib/db/connect";
import Order from "@/lib/db/models/Order";
import Event from "@/lib/db/models/Event";
import TicketType from "@/lib/db/models/TicketType";
import mongoose from "mongoose";

export async function getDashboardMetrics(userId: string, eventId?: string) {
    await dbConnect();

    // 1. Get Events by this organizer
    const events = await Event.find({ organizerId: userId }).select('_id');
    let eventIds = events.map(e => e._id);
    const activeEventsCount = (eventId && eventId !== 'all') ? 1 : events.length;
    if (eventId && eventId !== 'all') {
        const oid = new mongoose.Types.ObjectId(eventId);
        eventIds = [oid];
    }

    // 2. Aggregate Sales (Total Revenue)
    const salesResult = await Order.aggregate([
        { $match: { eventId: { $in: eventIds }, status: 'paid' } },
        { $group: { _id: null, totalRevenue: { $sum: "$totalAmount" }, totalOrders: { $sum: 1 } } }
    ]);

    const totalRevenue = salesResult[0]?.totalRevenue || 0;
    const totalOrders = salesResult[0]?.totalOrders || 0;

    // 3. Tickets Sold
    const ticketsResult = await TicketType.aggregate([
        { $match: { event: { $in: eventIds } } },
        { $group: { _id: null, totalSold: { $sum: "$quantitySold" } } }
    ]);

    const ticketsSold = ticketsResult[0]?.totalSold || 0;

    return {
        revenue: totalRevenue,
        orders: totalOrders,
        ticketsSold: ticketsSold,
        activeEvents: activeEventsCount
    };
}

export async function getRecentBookings(userId: string, limit = 5) {
    await dbConnect();

    // Find all events for this user to filter bookings
    const userEvents = await Event.find({ organizerId: userId }).select('_id');
    const eventIds = userEvents.map(e => e._id);

    const bookings = await Order.find({
        eventId: { $in: eventIds },
        status: 'paid'
    })
        .sort({ createdAt: -1 })
        .limit(limit)
        .populate('userId', 'name email') // Populate customer details
        .populate('items.ticketTypeId', 'name');

    return JSON.parse(JSON.stringify(bookings));
}
