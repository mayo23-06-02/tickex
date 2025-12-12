import dbConnect from "@/lib/db/connect";
import Order from "@/lib/db/models/Order";
import Ticket from "@/lib/db/models/Ticket";
import Event from "@/lib/db/models/Event";
import TicketType from "@/lib/db/models/TicketType";

export async function getUserTickets(userId: string) {
    await dbConnect();

    // 1. Fetch Paid Orders
    const orders = await Order.find({ userId, status: 'paid' }).sort({ createdAt: -1 });
    const orderIds = orders.map(o => o._id);

    // 2. Fetch Tickets associated with these orders
    const tickets = await Ticket.find({ orderId: { $in: orderIds } });

    // 3. Enrich with Event Details
    const enrichedTickets = await Promise.all(tickets.map(async (ticket) => {
        const order = orders.find(o => o._id.toString() === ticket.orderId.toString());
        const event = await Event.findById(order.eventId);
        const ticketType = await TicketType.findById(ticket.ticketTypeId);

        return {
            id: ticket._id.toString(),
            code: ticket.ticketCode,
            status: ticket.status,
            eventName: event ? event.title : "Unknown Event",
            eventDate: event ? event.startDate : null,
            eventLocation: event ? event.location : "Unknown Location",
            ticketType: ticketType ? ticketType.name : "General Admission",
            price: ticketType ? ticketType.price : 0,
            purchaseDate: order.createdAt
        };
    }));

    return JSON.parse(JSON.stringify(enrichedTickets));
}
