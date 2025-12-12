"use client";

import { Info } from "lucide-react";

interface BookingsStatsProps {
    stats: {
        todaysSales: number;
        pendingPayments: number;
        refundRequests: number;
        avgTicketPrice: number;
    };
    loading?: boolean;
}

export function BookingsStats({ stats, loading = false }: BookingsStatsProps) {
    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-card p-6 rounded-xl border border-border mb-6">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="animate-pulse">
                        <div className="h-4 bg-muted rounded w-24 mb-2"></div>
                        <div className="h-8 bg-muted rounded w-32"></div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-card p-6 rounded-xl border border-border mb-6">
            <div>
                <div className="text-xs text-muted-foreground mb-1">Today&apos;s Sales</div>
                <div className="text-2xl font-bold text-foreground">SZL {stats.todaysSales.toLocaleString()}</div>
            </div>
            <div>
                <div className="text-xs text-muted-foreground mb-1">Pending Payments</div>
                <div className="text-2xl font-bold text-warning">SZL {stats.pendingPayments.toLocaleString()}</div>
            </div>
            <div>
                <div className="text-xs text-muted-foreground mb-1">Refund Requests</div>
                <div className="text-2xl font-bold text-error">{stats.refundRequests}</div>
            </div>
            <div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                    Avg Ticket Price
                    <Info className="w-3 h-3 text-muted-foreground" />
                </div>
                <div className="text-2xl font-bold text-success">SZL {stats.avgTicketPrice.toLocaleString()}</div>
            </div>
        </div>
    );
}
