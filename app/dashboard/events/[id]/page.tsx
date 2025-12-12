import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getOrganizerEventById } from "@/lib/data/events";
import OrganizerEventDetailsClient from "@/components/events/OrganizerEventDetailsClient";

export default async function OrganizerEventDetailsPage(props: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session?.user || session.user.role !== "organizer") {
        redirect("/dashboard");
    }

    const params = await props.params;
    const event = await getOrganizerEventById(params.id, session.user.id);

    if (!event) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <h1 className="text-2xl font-bold">Event Not Found</h1>
                    <p>The event you are looking for does not exist or you do not have permission to view it.</p>
                </div>
            </div>
        );
    }

    return <OrganizerEventDetailsClient event={event} />;
}
