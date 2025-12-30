"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import DashboardLayout from "@/components/shared/layout/DashboardLayout";
import { TimelineManager } from "@/components/timeline/TimelineManager";
import { TimelineGantt } from "@/components/timeline/TimelineGantt";
import { TimelineStats } from "@/components/timeline/TimelineStatsDynamic";
import { LayoutList, BarChart3, Calendar, Plus } from "lucide-react";

export default function EventTimelinePage() {
  const [viewMode, setViewMode] = useState<"list" | "gantt">("list");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const search = useSearchParams();
  const eventIdParam = search.get("eventId") || undefined;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-[#0f172a]">
              Event Timeline
            </h1>
            <p className="text-[#64748b]">
              Manage milestones and track progress for Summer Music Festival
              2025
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* View Toggle */}
            <div className="flex bg-white rounded-lg border border-[#e2e8f0] p-1">
              <button
                onClick={() => setViewMode("list")}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  viewMode === "list"
                    ? "bg-[#1DB954] text-white shadow-sm"
                    : "text-[#64748b] hover:text-[#0f172a]"
                }`}
              >
                <LayoutList className="w-4 h-4" />
                List View
              </button>
              <button
                onClick={() => setViewMode("gantt")}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  viewMode === "gantt"
                    ? "bg-[#1DB954] text-white shadow-sm"
                    : "text-[#64748b] hover:text-[#0f172a]"
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                Gantt Chart
              </button>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#1DB954] hover:bg-[#1ed760] text-white rounded-lg font-medium transition-all shadow-sm shadow-green-200"
            >
              <Plus className="w-4 h-4" />
              Add Milestone
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <TimelineStats eventId={eventIdParam} />

        {/* Timeline Content */}
        {viewMode === "list" ? (
          <TimelineManager
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            eventId={eventIdParam}
          />
        ) : (
          <TimelineGantt eventId={eventIdParam} />
        )}
      </div>
    </DashboardLayout>
  );
}
