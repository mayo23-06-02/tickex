"use client";

import { useEffect, useState, useCallback } from "react";
import { CheckCircle2, Clock, AlertCircle, TrendingUp } from "lucide-react";
import { getMilestones } from "@/app/actions/timeline";

export function TimelineStats({ eventId }: { eventId?: string }) {
    const [counts, setCounts] = useState({
        completed: 0,
        active: 0,
        pending: 0,
        total: 0,
    });

    const load = useCallback(async () => {
        try {
            const data = await getMilestones(eventId);
            const total = data.length;
            let completed = 0;
            let active = 0;
            let pending = 0;
            for (const m of data) {
                const s = (m.status === "in_progress" ? "active" : m.status) as "completed" | "active" | "pending";
                if (s === "completed") completed++;
                else if (s === "active") active++;
                else pending++;
            }
            setCounts({ completed, active, pending, total });
        } catch {
            setCounts({ completed: 0, active: 0, pending: 0, total: 0 });
        }
    }, [eventId]);

    useEffect(() => {
        const id = setTimeout(() => {
            void load();
        }, 0);
        return () => clearTimeout(id);
    }, [load]);

    const onTrackPct = counts.total > 0 ? Math.round(((counts.completed + counts.active) / counts.total) * 100) : 0;

    const cards = [
        { label: "Completed", value: `${counts.completed}`, total: `${counts.total}`, percentage: counts.total ? Math.round((counts.completed / counts.total) * 100) : 0, icon: CheckCircle2, color: "text-success", bgColor: "bg-success/10" },
        { label: "In Progress", value: `${counts.active}`, total: `${counts.total}`, percentage: counts.total ? Math.round((counts.active / counts.total) * 100) : 0, icon: Clock, color: "text-info", bgColor: "bg-info/10" },
        { label: "Pending", value: `${counts.pending}`, total: `${counts.total}`, percentage: counts.total ? Math.round((counts.pending / counts.total) * 100) : 0, icon: AlertCircle, color: "text-warning", bgColor: "bg-warning/10" },
        { label: "On Track", value: `${onTrackPct}%`, total: "", percentage: onTrackPct, icon: TrendingUp, color: "text-success", bgColor: "bg-success/10" },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cards.map((stat, index) => (
                <div key={index} className="bg-card rounded-xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow">
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
                                className={`h-full rounded-full transition-all duration-500 ${stat.color === "text-success" ? "bg-success" : stat.color === "text-info" ? "bg-info" : "bg-warning"}`}
                                style={{ width: `${stat.percentage}%` }}
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
