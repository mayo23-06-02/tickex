"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar, ZoomIn, ZoomOut } from "lucide-react";

interface GanttTask {
    id: string;
    title: string;
    startDate: Date;
    endDate: Date;
    progress: number;
    status: "completed" | "active" | "pending";
    dependencies?: string[];
}

const tasks: GanttTask[] = [
    {
        id: "1",
        title: "Planning & Strategy",
        startDate: new Date("2024-11-01"),
        endDate: new Date("2024-12-15"),
        progress: 100,
        status: "completed",
    },
    {
        id: "2",
        title: "Marketing Launch",
        startDate: new Date("2024-12-10"),
        endDate: new Date("2025-01-10"),
        progress: 100,
        status: "completed",
        dependencies: ["1"],
    },
    {
        id: "3",
        title: "Ticket Sales",
        startDate: new Date("2025-01-15"),
        endDate: new Date("2025-03-15"),
        progress: 65,
        status: "active",
        dependencies: ["2"],
    },
    {
        id: "4",
        title: "Venue Setup",
        startDate: new Date("2025-03-01"),
        endDate: new Date("2025-03-14"),
        progress: 0,
        status: "pending",
        dependencies: ["3"],
    },
    {
        id: "5",
        title: "Event Day",
        startDate: new Date("2025-03-15"),
        endDate: new Date("2025-03-15"),
        progress: 0,
        status: "pending",
        dependencies: ["4"],
    },
];

export function TimelineGantt() {
    const [zoom, setZoom] = useState(1);
    const [currentDate] = useState(new Date());

    // Calculate date range
    const allDates = tasks.flatMap((task) => [task.startDate, task.endDate]);
    const minDate = new Date(Math.min(...allDates.map((d) => d.getTime())));
    const maxDate = new Date(Math.max(...allDates.map((d) => d.getTime())));

    // Generate months for the timeline
    const generateMonths = () => {
        const months = [];
        const current = new Date(minDate);
        current.setDate(1);

        while (current <= maxDate) {
            months.push(new Date(current));
            current.setMonth(current.getMonth() + 1);
        }
        return months;
    };

    const months = generateMonths();
    const totalDays = Math.ceil((maxDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24));

    const getTaskPosition = (task: GanttTask) => {
        const startOffset = Math.ceil((task.startDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24));
        const duration = Math.ceil((task.endDate.getTime() - task.startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
        const left = (startOffset / totalDays) * 100;
        const width = (duration / totalDays) * 100;
        return { left: `${left}%`, width: `${width}%` };
    };

    const getTodayPosition = () => {
        const todayOffset = Math.ceil((currentDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24));
        return (todayOffset / totalDays) * 100;
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "completed":
                return "bg-[#1DB954]";
            case "active":
                return "bg-blue-500";
            case "pending":
                return "bg-slate-300";
            default:
                return "bg-slate-300";
        }
    };

    return (
        <div className="bg-white rounded-xl border border-[#e2e8f0] shadow-sm overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-[#e2e8f0] flex justify-between items-center">
                <div>
                    <h2 className="text-lg font-bold text-[#0f172a]">Gantt Chart View</h2>
                    <p className="text-sm text-[#64748b] mt-1">Visual timeline of all milestones</p>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setZoom(Math.max(0.5, zoom - 0.25))}
                        className="p-2 hover:bg-slate-50 rounded-lg transition-colors"
                        disabled={zoom <= 0.5}
                    >
                        <ZoomOut className="w-4 h-4 text-[#64748b]" />
                    </button>
                    <span className="text-sm text-[#64748b] min-w-[60px] text-center">{Math.round(zoom * 100)}%</span>
                    <button
                        onClick={() => setZoom(Math.min(2, zoom + 0.25))}
                        className="p-2 hover:bg-slate-50 rounded-lg transition-colors"
                        disabled={zoom >= 2}
                    >
                        <ZoomIn className="w-4 h-4 text-[#64748b]" />
                    </button>
                </div>
            </div>

            {/* Gantt Chart */}
            <div className="overflow-x-auto">
                <div style={{ minWidth: `${800 * zoom}px` }}>
                    {/* Timeline Header */}
                    <div className="flex border-b border-[#e2e8f0] bg-slate-50">
                        <div className="w-64 flex-shrink-0 p-4 border-r border-[#e2e8f0]">
                            <span className="text-sm font-semibold text-[#0f172a]">Milestone</span>
                        </div>
                        <div className="flex-1 relative">
                            <div className="flex h-full">
                                {months.map((month, index) => {
                                    const monthDays = new Date(
                                        month.getFullYear(),
                                        month.getMonth() + 1,
                                        0
                                    ).getDate();
                                    const monthWidth = (monthDays / totalDays) * 100;

                                    return (
                                        <div
                                            key={index}
                                            className="border-r border-[#e2e8f0] p-4"
                                            style={{ width: `${monthWidth}%` }}
                                        >
                                            <div className="text-sm font-semibold text-[#0f172a]">
                                                {month.toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Task Rows */}
                    <div className="divide-y divide-[#e2e8f0]">
                        {tasks.map((task, index) => (
                            <div key={task.id} className="flex hover:bg-slate-50/50 transition-colors">
                                {/* Task Name */}
                                <div className="w-64 flex-shrink-0 p-4 border-r border-[#e2e8f0]">
                                    <div className="flex items-center gap-2">
                                        <div
                                            className={`w-2 h-2 rounded-full ${task.status === "completed"
                                                    ? "bg-[#1DB954]"
                                                    : task.status === "active"
                                                        ? "bg-blue-500"
                                                        : "bg-slate-300"
                                                }`}
                                        />
                                        <span className="text-sm font-medium text-[#0f172a]">{task.title}</span>
                                    </div>
                                    <div className="text-xs text-[#64748b] mt-1">
                                        {task.startDate.toLocaleDateString()} - {task.endDate.toLocaleDateString()}
                                    </div>
                                </div>

                                {/* Gantt Bar */}
                                <div className="flex-1 relative p-4">
                                    <div className="relative h-8">
                                        {/* Today Indicator */}
                                        {index === 0 && (
                                            <div
                                                className="absolute top-0 bottom-0 w-px bg-red-500 z-10"
                                                style={{ left: `${getTodayPosition()}%` }}
                                            >
                                                <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-red-500 text-white text-xs px-2 py-0.5 rounded whitespace-nowrap">
                                                    Today
                                                </div>
                                            </div>
                                        )}

                                        {/* Task Bar */}
                                        <motion.div
                                            initial={{ scaleX: 0 }}
                                            animate={{ scaleX: 1 }}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                            className="absolute top-1/2 -translate-y-1/2 h-6 rounded-lg overflow-hidden shadow-sm"
                                            style={getTaskPosition(task)}
                                        >
                                            <div className={`h-full ${getStatusColor(task.status)} relative`}>
                                                {/* Progress Overlay */}
                                                {task.progress < 100 && (
                                                    <div
                                                        className="absolute inset-y-0 right-0 bg-white/30"
                                                        style={{ width: `${100 - task.progress}%` }}
                                                    />
                                                )}
                                                {/* Progress Text */}
                                                <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white">
                                                    {task.progress}%
                                                </div>
                                            </div>
                                        </motion.div>

                                        {/* Dependency Lines */}
                                        {task.dependencies?.map((depId) => {
                                            const depTask = tasks.find((t) => t.id === depId);
                                            if (!depTask) return null;

                                            const depIndex = tasks.findIndex((t) => t.id === depId);
                                            const verticalOffset = (index - depIndex) * 56; // Approximate row height

                                            return (
                                                <svg
                                                    key={depId}
                                                    className="absolute inset-0 pointer-events-none"
                                                    style={{ overflow: "visible" }}
                                                >
                                                    <path
                                                        d={`M ${getTodayPosition()}% -${verticalOffset} L ${getTodayPosition()}% 0`}
                                                        stroke="#94a3b8"
                                                        strokeWidth="1"
                                                        strokeDasharray="4 2"
                                                        fill="none"
                                                    />
                                                </svg>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Legend */}
            <div className="p-6 border-t border-[#e2e8f0] bg-slate-50">
                <div className="flex items-center gap-6 text-sm">
                    <span className="text-[#64748b] font-medium">Status:</span>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-[#1DB954]" />
                        <span className="text-[#0f172a]">Completed</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-blue-500" />
                        <span className="text-[#0f172a]">In Progress</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-slate-300" />
                        <span className="text-[#0f172a]">Pending</span>
                    </div>
                    <div className="flex items-center gap-2 ml-auto">
                        <div className="w-px h-4 bg-red-500" />
                        <span className="text-[#0f172a]">Today</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
