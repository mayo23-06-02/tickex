import dbConnect from "@/lib/db/connect";
import Event from "@/lib/db/models/Event";
import TicketType from "@/lib/db/models/TicketType";

export const dynamic = 'force-dynamic';

export default async function DiagnosticsPage() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let eventsWithTickets: any[] = [];
    let error = null;

    try {
        await dbConnect();

        // Get all events
        const events = await Event.find({}).limit(10).lean();

        // Get ticket types for each event
        eventsWithTickets = await Promise.all(
            events.map(async (event) => {
                const tickets = await TicketType.find({ event: event._id }).lean();
                return {
                    id: event._id.toString(),
                    title: event.title,
                    status: event.status,
                    ticketCount: tickets.length,
                    tickets: tickets.map(t => ({
                        name: t.name,
                        price: t.price,
                        remaining: t.quantityTotal - t.quantitySold
                    }))
                };
            })
        );
    } catch (e: any) {
        console.error("Diagnostics DB Error:", e);
        error = e.message || "Failed to connect to database";
    }

    if (error) {
        return (
            <div className="min-h-screen bg-background p-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold text-foreground mb-8">Database Diagnostics</h1>
                    <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 text-destructive">
                        <h2 className="text-xl font-semibold mb-2">Connection Error</h2>
                        <p>{error}</p>
                        <p className="mt-4 text-sm text-muted-foreground">
                            Check your MONGODB_URI and ensuring your IP is whitelisted in MongoDB Atlas.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-foreground mb-8">Database Diagnostics</h1>

                <div className="bg-card border border-border rounded-lg p-6 mb-6">
                    <h2 className="text-xl font-semibold text-foreground mb-4">
                        Events in Database: {eventsWithTickets.length}
                    </h2>

                    {eventsWithTickets.length === 0 ? (
                        <div className="text-muted-foreground">
                            No events found. Create an event at <a href="/events/create" className="text-primary underline">/events/create</a>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {eventsWithTickets.map((event) => (
                                <div key={event.id} className="border border-border rounded-lg p-4">
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <h3 className="font-semibold text-foreground">{event.title}</h3>
                                            <p className="text-sm text-muted-foreground">ID: {event.id}</p>
                                            <p className="text-sm text-muted-foreground">Status: {event.status}</p>
                                        </div>
                                        <a
                                            href={`/events/${event.id}`}
                                            className="px-3 py-1 bg-primary text-primary-foreground rounded-md text-sm hover:opacity-90"
                                        >
                                            View Event
                                        </a>
                                    </div>

                                    <div className="mt-3">
                                        <p className="text-sm font-medium text-foreground mb-2">
                                            Tickets ({event.ticketCount}):
                                        </p>
                                        {event.tickets.length === 0 ? (
                                            <p className="text-sm text-muted-foreground">No tickets configured</p>
                                        ) : (
                                            <ul className="space-y-1">
                                                {event.tickets.map((ticket, i) => (
                                                    <li key={i} className="text-sm text-muted-foreground">
                                                        • {ticket.name} - SZL {ticket.price} ({ticket.remaining} remaining)
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="bg-info/10 border border-info/20 rounded-lg p-4">
                    <h3 className="font-semibold text-foreground mb-2">Quick Actions</h3>
                    <div className="space-y-2">
                        <a href="/events" className="block text-primary hover:underline">→ View All Events</a>
                        <a href="/events/create" className="block text-primary hover:underline">→ Create New Event</a>
                        <a href="/dashboard" className="block text-primary hover:underline">→ Go to Dashboard</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
