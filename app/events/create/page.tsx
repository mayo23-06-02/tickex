import DashboardLayout from "@/components/layout/DashboardLayout";
import { CreateEventWizard } from "@/components/events/create/CreateEventWizard";

export default function CreateEventPage() {
    return (
        <DashboardLayout>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-[#0f172a]">Create New Event</h1>
                <p className="text-[#64748b]">Follow the steps to launch your event on Tickex.</p>
            </div>

            <CreateEventWizard />
        </DashboardLayout>
    );
}
