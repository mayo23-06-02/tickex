"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { MetricGrid } from "@/components/dashboard/MetricGrid";
import { TimelineSection } from "@/components/dashboard/TimelineSection";
import { PredictiveForecast } from "@/components/dashboard/PredictiveForecast";
import { Calendar } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  return (
    <DashboardLayout>
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-[#0f172a]">Dashboard</h1>
          <p className="text-[#64748b]">Command center for Summer Music Festival 2025</p>
        </div>
        <button
          onClick={() => router.push("/event-timeline")}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#1DB954] hover:bg-[#1ed760] text-white rounded-lg font-medium transition-all shadow-sm shadow-green-200 hover:shadow-md hover:shadow-green-300"
        >
          <Calendar className="w-4 h-4" />
          Manage Timeline
        </button>
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
