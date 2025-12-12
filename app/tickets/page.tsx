import { auth } from "@/auth";
import OrganizerTicketsClient from "@/components/tickets/OrganizerTicketsClient";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/db/connect";
import TicketType from "@/lib/db/models/TicketType";
import Event from "@/lib/db/models/Event";

export default async function TicketsPage() {
    const session = await auth();

    if (!session?.user) {
        redirect("/auth/organizer/login");
    }

    // Fetch tickets for organizer
    let tickets: any[] = [];

    if (session.user.role === "organizer") {
        try {
            await dbConnect();

            // Get all events for this organizer
            const events = await Event.find({ organizerId: session.user.id });
            const eventIds = events.map(e => e._id);

            // Get all ticket types for these events
            const ticketTypes = await TicketType.find({
                event: { $in: eventIds }
            }).populate('event');

            // Transform to display format
            tickets = ticketTypes.map(tt => {
                const event = tt.event as any;
                return {
                    id: tt._id.toString(),
                    eventId: event._id.toString(),
                    eventTitle: event.title,
                    eventDate: event.startDate.toISOString(),
                    eventLocation: event.location.name || event.location.address || 'TBD',
                    ticketType: tt.name,
                    quantity: tt.quantityTotal,
                    quantitySold: tt.quantitySold,
                    price: tt.price,
                    description: tt.description,
                    status: tt.quantitySold >= tt.quantityTotal ? 'used' :
                        new Date(event.endDate) < new Date() ? 'expired' : 'active',
                    qrCode: `QR_${tt._id}`,
                    designUrl: tt.ticketDesignUrl,
                    // Advanced fields
                    perks: tt.perks || [],
                    accessRules: tt.accessRules || {},
                    designConfig: tt.designConfig || { backgroundColor: '#1DB954', textColor: '#FFFFFF' },
                    transferSettings: tt.transferSettings || {}
                };
            });

            // Serialize events for dropdown
            const serializedEvents = events.map(e => ({
                id: e._id.toString(),
                title: e.title,
                date: e.startDate.toISOString(),
                location: e.location.name || e.location.address || 'TBD'
            }));

            return <OrganizerTicketsClient tickets={tickets} events={serializedEvents} />;
        } catch (error) {
            console.error("Failed to fetch tickets:", error);
            return <OrganizerTicketsClient tickets={[]} events={[]} />;
        }
    }

    return <OrganizerTicketsClient tickets={[]} events={[]} />;
}
