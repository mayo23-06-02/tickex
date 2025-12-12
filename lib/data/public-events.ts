import dbConnect from "@/lib/db/connect";
import Event from "@/lib/db/models/Event";
import TicketType from "@/lib/db/models/TicketType";
import mongoose from 'mongoose';

export async function getPublicEvents() {
    await dbConnect();

    // 1. Fetch upcoming published events
    const today = new Date();
    const events = await Event.find({
        status: 'published',
        startDate: { $gte: today }
    })
        .sort({ startDate: 1 })
        .limit(10); // Limit for homepage

    // 2. Fetch price range for each event
    const eventsWithDetails = await Promise.all(events.map(async (event) => {
        const ticketTypes = await TicketType.find({ event: event._id }).sort({ price: 1 });
        const minPrice = ticketTypes.length > 0 ? ticketTypes[0].price : 0;

        // Parse location - handle both string and object formats
        const venue = typeof event.location === 'string'
            ? event.location
            : (event.location?.name || event.location?.address || 'TBD');

        return {
            id: event._id.toString(),
            title: event.title,
            artist: event.organizerId ? "Organizer Host" : "Various Artists", // Ideally fetch User name
            date: event.startDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
            time: event.startDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            venue,
            price: minPrice > 0 ? `From SZL ${minPrice}` : 'Free',
            image: event.imageUrl || "bg-gradient-to-br from-green-400 to-emerald-600", // Fallback if no image
            category: event.category,
            imageUrl: event.imageUrl // Explicit URL field for client
        };
    }));

    // Mock trending logic for now (could be real aggregation later)
    // Just select random 3 from the list
    const trending = eventsWithDetails.slice(0, 4).map(e => ({
        name: e.title,
        sales: "100+", // Mock
        trend: "Rising"
    }));

    return {
        featured: JSON.parse(JSON.stringify(eventsWithDetails)),
        trending: JSON.parse(JSON.stringify(trending))
    };
}

export async function getEventById(id: string) {
    await dbConnect();

    try {
        // Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            console.error(`Invalid ObjectId format: ${id}`);
            return null;
        }

        const event = await Event.findById(id).lean();

        if (!event) {
            console.error(`Event not found with ID: ${id}`);
            return null;
        }

        console.log(`Found event: ${event.title}`);

        const ticketTypes = await TicketType.find({ event: event._id }).lean();
        console.log(`Found ${ticketTypes.length} ticket types`);

        // Fetch Organizer Name
        let organizerName = "Tickex Organizer";
        try {
            const User = mongoose.model('User');
            const organizer = await User.findById(event.organizerId).lean();
            if (organizer) {
                organizerName = (organizer as any).name;
            }
        } catch (err) {
            console.warn("Could not fetch organizer:", err);
        }

        // Parse location - handle both string and object formats
        let location = { name: '', address: '' };
        if (typeof event.location === 'string') {
            location = { name: event.location, address: event.location };
        } else if (event.location && typeof event.location === 'object') {
            location = {
                name: (event.location as any).name || (event.location as any).address || 'TBD',
                address: (event.location as any).address || (event.location as any).name || 'TBD'
            };
        }

        return {
            id: event._id.toString(),
            title: event.title,
            description: event.description,
            location,
            startDate: event.startDate.toISOString(),
            endDate: event.endDate.toISOString(),
            imageUrl: event.imageUrl,
            category: event.category,
            organizerName,
            tickets: ticketTypes.map(t => ({
                id: t._id.toString(),
                name: t.name,
                price: t.price,
                description: t.description || '',
                quantity: t.quantityTotal,
                remaining: t.quantityTotal - t.quantitySold,
                designUrl: t.ticketDesignUrl || null
            }))
        };
    } catch (error) {
        console.error("Error fetching event:", error);
        return null;
    }
}
