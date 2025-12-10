"use client";

import { Info } from "lucide-react";

export function BookingsStats() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-white p-6 rounded-xl border border-[#e2e8f0] mb-6">
            <div>
                <div className="text-xs text-[#64748b] mb-1">Today&apos;s Sales</div>
                <div className="text-2xl font-bold text-[#0f172a]">SZL 4,280</div>
            </div>
            <div>
                <div className="text-xs text-[#64748b] mb-1">Pending Payments</div>
                <div className="text-2xl font-bold text-orange-500">SZL 1,200</div>
            </div>
            <div>
                <div className="text-xs text-[#64748b] mb-1">Refund Requests</div>
                <div className="text-2xl font-bold text-red-500">3</div>
            </div>
            <div>
                <div className="flex items-center gap-1 text-xs text-[#64748b] mb-1">
                    Avg Ticket Price
                    <Info className="w-3 h-3 text-[#94a3b8]" />
                </div>
                <div className="text-2xl font-bold text-[#1DB954]">SZL 89</div>
            </div>
        </div>
    );
}
