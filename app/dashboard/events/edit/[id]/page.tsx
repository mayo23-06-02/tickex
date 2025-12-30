import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getEventForEditing } from "@/lib/data/events";
import { CreateEventWizard } from "@/components/events/create/CreateEventWizard";
import DashboardLayout from "@/components/shared/layout/DashboardLayout";

export default async function EditEventPage(props: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user || session.user.role !== "organizer") {
    redirect("/dashboard");
  }

  const params = await props.params;
  const event = await getEventForEditing(params.id, session.user.id);

  if (!event) {
    redirect("/dashboard/events");
  }

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#0f172a]">Edit Event</h1>
        <p className="text-[#64748b]">
          Update your event details and settings.
        </p>
      </div>

      <CreateEventWizard initialData={event as any} isEditing={true} />
    </DashboardLayout>
  );
}
