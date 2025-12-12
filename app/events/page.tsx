import { getPublicEvents } from "@/lib/data/public-events";
import { CustomerLayout } from "@/components/layout/CustomerLayout";
import { PublicEventsClient } from "@/components/events/PublicEventsClient";

export default async function PublicEventsPage() {
    const { featured } = await getPublicEvents();

    return (
        <CustomerLayout>
            <PublicEventsClient events={featured} />
        </CustomerLayout>
    );
}
