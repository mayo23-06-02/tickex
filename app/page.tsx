import DashboardLayout from "@/components/layout/DashboardLayout";
import { MetricGrid } from "@/components/dashboard/MetricGrid";
import { TimelineSection } from "@/components/dashboard/TimelineSection";
import { PredictiveForecast } from "@/components/dashboard/PredictiveForecast";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#0f172a]">Dashboard</h1>
        <p className="text-[#64748b]">Command center for Summer Music Festival 2025</p>
      </div>

      <MetricGrid />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <TimelineSection />
        </div>
        <div className="lg:col-span-2">
          <PredictiveForecast />
        </div>
      </div>
    </DashboardLayout>
  );
}
