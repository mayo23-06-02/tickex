import { notFound } from "next/navigation";
import { getEventById } from "@/lib/data/public-events";
import EventDetailsClient from "@/components/events/EventDetailsClient";
import { auth } from "@/auth";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EventPage(props: PageProps) {
    const params = await props.params;
    const event = await getEventById(params.id);
    const session = await auth();

    if (!event) {
        notFound();
    }

    // This page is public - no dashboard layout needed
    // It will use the root layout only
    return (
        <EventDetailsClient
            event={event}
            currentUserId={session?.user?.id}
        />
    );
}
