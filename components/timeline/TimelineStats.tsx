"use client";

import { CheckCircle2, Clock, AlertCircle, TrendingUp } from "lucide-react";

export function TimelineStats() {
    const stats = [
        {
            label: "Completed",
            value: "2",
            total: "5",
            percentage: 40,
            icon: CheckCircle2,
            color: "text-[#1DB954]",
            bgColor: "bg-green-50",
        },
        {
            label: "In Progress",
            value: "1",
            total: "5",
            percentage: 20,
            icon: Clock,
            color: "text-blue-500",
            bgColor: "bg-blue-50",
        },
        {
            label: "Pending",
            value: "2",
            total: "5",
            percentage: 40,
            icon: AlertCircle,
            color: "text-amber-500",
            bgColor: "bg-amber-50",
        },
        {
            label: "On Track",
            value: "85%",
            total: "",
            percentage: 85,
            icon: TrendingUp,
            color: "text-[#1DB954]",
            bgColor: "bg-green-50",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
                <div
                    key={index}
                    className="bg-white rounded-xl p-6 border border-[#e2e8f0] shadow-sm hover:shadow-md transition-shadow"
                >
                    <div className="flex items-start justify-between mb-4">
                        <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                            <stat.icon className={`w-6 h-6 ${stat.color}`} />
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-[#64748b] mb-1">{stat.label}</p>
                            <p className="text-2xl font-bold text-[#0f172a]">
                                {stat.value}
                                {stat.total && <span className="text-sm text-[#64748b]">/{stat.total}</span>}
                            </p>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs text-[#64748b]">
                            <span>Progress</span>
                            <span>{stat.percentage}%</span>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                                className={`h-full rounded-full transition-all duration-500 ${stat.color === "text-[#1DB954]"
                                        ? "bg-[#1DB954]"
                                        : stat.color === "text-blue-500"
                                            ? "bg-blue-500"
                                            : "bg-amber-500"
                                    }`}
                                style={{ width: `${stat.percentage}%` }}
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
