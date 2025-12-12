import { redirect } from "next/navigation";
import { auth } from "@/auth";
import CheckoutPageClient from "@/components/checkout/CheckoutPageClient";
import { getEventById } from "@/lib/data/public-events";

interface PageProps {
    searchParams: Promise<{
        eventId?: string;
        tickets?: string; // JSON string of selected tickets
    }>;
}

export default async function CheckoutPage(props: PageProps) {
    const searchParams = await props.searchParams;
    const { eventId, tickets } = searchParams;

    if (!eventId || !tickets) {
        redirect('/');
    }

    const event = await getEventById(eventId);
    const session = await auth();

    if (!event) {
        redirect('/');
    }

    // Parse selected tickets
    const selectedTickets = JSON.parse(decodeURIComponent(tickets));

    // Build checkout items
    const items = Object.entries(selectedTickets)
        .filter(([_, qty]) => (qty as number) > 0)
        .map(([ticketTypeId, quantity]) => {
            const ticket = event.tickets.find(t => t.id === ticketTypeId);
            if (!ticket) return null;

            return {
                ticketTypeId,
                ticketName: ticket.name,
                quantity: quantity as number,
                price: ticket.price
            };
        })
        .filter(Boolean) as any[];

    if (items.length === 0) {
        redirect(`/events/${eventId}`);
    }

    const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <CheckoutPageClient
            eventId={eventId}
            eventTitle={event.title}
            items={items}
            totalAmount={totalAmount}
            currentUserId={session?.user?.id}
        />
    );
}
