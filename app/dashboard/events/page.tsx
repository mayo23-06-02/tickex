import { auth } from "@/auth";
import { redirect } from "next/navigation";
import EventsClient from "@/components/events/EventsClient";
import { getOrganizerEvents } from "@/lib/data/events";

export interface Event {
    id: string;
    name: string;
    date: Date;
    status: "Active" | "Upcoming" | "Draft" | "Completed" | "Cancelled";
    ticketsSold: number;
    ticketsTotal: number;
    revenue: number;
    color: string;
    imageUrl?: string;
}

export default async function EventsPage() {
    const session = await auth();

    // Redirect non-organizers to dashboard (or login)
    if (!session?.user || session.user.role !== "organizer") {
        redirect("/dashboard");
    }

    const userId = session.user.id;
    let events: Event[] = [];

    try {
        const rawEvents = await getOrganizerEvents(userId);
        // Ensure dates are Dates (serialized as strings from JSON.parse/stringify)
        events = rawEvents.map((e: any) => ({
            ...e,
            date: new Date(e.date)
        }));
    } catch (error) {
        console.error("Failed to fetch events:", error);
    }

    return <EventsClient initialEvents={events} />;
}
