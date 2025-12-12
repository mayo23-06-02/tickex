import dbConnect from "@/lib/db/connect";
import Event from "@/lib/db/models/Event";
import TicketType from "@/lib/db/models/TicketType";

export async function getOrganizerEvents(userId: string) {
    await dbConnect();

    // 1. Fetch Events
    const events = await Event.find({ organizerId: userId }).sort({ startDate: 1 });

    // 2. Fetch Ticket Stats for each event (to calculate ticketsSold and revenue)
    // This could be optimized with aggregation, but loop is fine for MVP
    const eventsWithStats = await Promise.all(events.map(async (event) => {
        const ticketTypes = await TicketType.find({ event: event._id });

        let ticketsSold = 0;
        let ticketsTotal = 0;
        let revenue = 0; // This is potential revenue based on sold * price, or we can use Orders

        // Simpler to just sum ticketType sold * price for now (assuming all sales are valid paid)
        for (const type of ticketTypes) {
            ticketsSold += type.quantitySold;
            ticketsTotal += type.quantityTotal;
            // Note: This is an approximation. Real revenue should come from Orders.
            // But TicketType doesn't store revenue directly.
            // For now, let's just multiply.
            revenue += type.quantitySold * type.price;
        }

        return {
            id: event._id.toString(),
            name: event.title,
            date: event.startDate,
            status: event.status === 'published' ? (new Date(event.endDate) < new Date() ? 'Completed' : 'Active') : 'Draft',
            ticketsSold,
            ticketsTotal,
            revenue,
            color: "#1DB954", // Default color
            imageUrl: event.imageUrl
        };
    }));

    return JSON.parse(JSON.stringify(eventsWithStats));
}

export async function getOrganizerEventById(eventId: string, userId: string) {
    await dbConnect();

    const event = await Event.findOne({ _id: eventId, organizerId: userId });
    if (!event) return null;

    const ticketTypes = await TicketType.find({ event: event._id });

    let ticketsSold = 0;
    let ticketsTotal = 0;
    let revenue = 0;

    for (const type of ticketTypes) {
        ticketsSold += type.quantitySold;
        ticketsTotal += type.quantityTotal;
        revenue += type.quantitySold * type.price;
    }

    return JSON.parse(JSON.stringify({
        id: event._id.toString(),
        name: event.title,
        description: event.description,
        date: event.startDate,
        endDate: event.endDate,
        location: event.location,
        status: event.status === 'published' ? (new Date(event.endDate) < new Date() ? 'Completed' : 'Active') : 'Draft',
        ticketsSold,
        ticketsTotal,
        revenue,
        color: "#1DB954",
        imageUrl: event.imageUrl,
        category: event.category
    }));
}

export async function getEventForEditing(eventId: string, userId: string) {
    await dbConnect();

    const event = await Event.findOne({ _id: eventId, organizerId: userId });
    if (!event) return null;

    const ticketTypes = await TicketType.find({ event: event._id });

    // Map to EventFormData structure
    return {
        id: event._id.toString(), // Keep ID for updates
        name: event.title,
        organizer: "Tickex Organizer", // Need to fetch or keep default?
        category: event.category || "",
        startDate: new Date(event.startDate), // Ensure Date
        endDate: new Date(event.endDate),
        location: typeof event.location === 'string' ? event.location : (event.location?.name || ""),
        description: event.description || "",
        tickets: ticketTypes.map((t: any, index: number) => ({
            id: index + 1, // Wizard uses number IDs. We need to track real ID separately maybe?
            realId: t._id.toString(), // Add realId to track existing tickets
            name: t.name,
            price: t.price,
            quantity: t.quantityTotal,
            description: t.description
        })),
        refundPolicy: "non-refundable", // Default for now, as DB might not store it yet
        ageRestriction: "18+", // Default
        imageFile: null,
        imageUrl: event.imageUrl // Pass existing URL
    };
}
