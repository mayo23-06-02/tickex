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
            color: "text-success",
            bgColor: "bg-success/10",
        },
        {
            label: "In Progress",
            value: "1",
            total: "5",
            percentage: 20,
            icon: Clock,
            color: "text-info",
            bgColor: "bg-info/10",
        },
        {
            label: "Pending",
            value: "2",
            total: "5",
            percentage: 40,
            icon: AlertCircle,
            color: "text-warning",
            bgColor: "bg-warning/10",
        },
        {
            label: "On Track",
            value: "85%",
            total: "",
            percentage: 85,
            icon: TrendingUp,
            color: "text-success",
            bgColor: "bg-success/10",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
                <div
                    key={index}
                    className="bg-card rounded-xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow"
                >
                    <div className="flex items-start justify-between mb-4">
                        <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                            <stat.icon className={`w-6 h-6 ${stat.color}`} />
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                            <p className="text-2xl font-bold text-foreground">
                                {stat.value}
                                {stat.total && <span className="text-sm text-muted-foreground">/{stat.total}</span>}
                            </p>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Progress</span>
                            <span>{stat.percentage}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div
                                className={`h-full rounded-full transition-all duration-500 ${stat.color === "text-success"
                                    ? "bg-success"
                                    : stat.color === "text-info"
                                        ? "bg-info"
                                        : "bg-warning"
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
