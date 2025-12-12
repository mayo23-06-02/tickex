import DashboardLayout from "@/components/layout/DashboardLayout";
import { MetricGrid } from "@/components/dashboard/MetricGrid";
import { TimelineSection } from "@/components/dashboard/TimelineSection";
import { PredictiveForecast } from "@/components/dashboard/PredictiveForecast";
import { EmptyStateDashboard } from "@/components/dashboard/EmptyStateDashboard";
import { Calendar } from "lucide-react";
import Link from 'next/link';
import { auth } from "@/auth";
import { getDashboardMetrics } from "@/lib/data/dashboard";
import { Button } from "@/components/ui/Button";

export default async function Dashboard() {
    const session = await auth();
    const userId = session?.user?.id;

    // Fetch Real Data if logged in, otherwise mock or empty
    let metrics = { revenue: 0, orders: 0, ticketsSold: 0, activeEvents: 0 };

    if (userId) {
        try {
            metrics = await getDashboardMetrics(userId);
        } catch (e) {
            console.error("Failed to load metrics", e);
        }
    }

    return (
        <DashboardLayout>
            <div className="mb-8 flex justify-between items-start">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
                    <p className="text-muted-foreground">Welcome back, {session?.user?.name || 'Organizer'}</p>
                </div>
                <Button className="gap-2" href="/event-timeline">
                    <Calendar className="w-4 h-4" />
                    Manage Timeline
                </Button>
            </div>


            {metrics.activeEvents === 0 ? (
                <EmptyStateDashboard />
            ) : (
                <>
                    <MetricGrid data={metrics} />

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-1">
                            <TimelineSection />
                        </div>
                        <div className="lg:col-span-2">
                            <PredictiveForecast />
                        </div>
                    </div>
                </>
            )}
        </DashboardLayout>
    );
}
