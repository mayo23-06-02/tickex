import { getPublicEvents } from "@/lib/data/public-events";
import { PublicEventsClient } from "@/components/events/PublicEventsClient";

export default async function PublicEventsPage() {
    const { featured } = await getPublicEvents();

    return <PublicEventsClient events={featured} />;
}
