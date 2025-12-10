"use client";

import { Lightbulb, HelpCircle } from "lucide-react";

export function SalesIntelligenceSidebar() {
    return (
        <div className="space-y-6">
            {/* Sales Over Time */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-[#0f172a]">Sales Over Time</h3>
                    <div className="flex bg-slate-100 rounded-lg p-0.5">
                        <button className="px-2 py-0.5 text-xs font-medium text-[#64748b]">Day</button>
                        <button className="px-2 py-0.5 text-xs font-medium bg-white rounded shadow-sm text-[#0f172a]">Week</button>
                        <button className="px-2 py-0.5 text-xs font-medium text-[#64748b]">Month</button>
                    </div>
                </div>

                {/* Simplified Bar Chart */}
                <div className="h-40 flex items-end gap-2">
                    {[30, 45, 25, 60, 75, 50, 65].map((h, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                            <div
                                className="w-full bg-[#1DB954] rounded-t-sm opacity-20 group-hover:opacity-100 transition-opacity relative"
                                style={{ height: `${h}%` }}
                            >
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                    SZL {h * 100}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between mt-2 text-xs text-[#94a3b8]">
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                    <span>Sun</span>
                </div>
            </div>

            {/* Conversion Funnel */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-[#0f172a]">Conversion Funnel</h3>
                    <button className="text-xs text-[#1DB954] font-medium hover:underline">Optimize →</button>
                </div>

                <div className="space-y-4">
                    {/* Website Visitors */}
                    <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                            <span className="text-[#64748b]">Website Visitors</span>
                            <span className="font-medium text-[#0f172a]">12,450</span>
                        </div>
                        <div className="h-2 bg-[#e2e8f0] rounded-full overflow-hidden">
                            <div className="h-full bg-[#1DB954] rounded-full w-full"></div>
                        </div>
                    </div>

                    {/* Ticket Page */}
                    <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                            <span className="text-[#64748b]">Ticket Page</span>
                            <span className="font-medium text-[#0f172a]">8,920</span>
                        </div>
                        <div className="h-2 bg-[#e2e8f0] rounded-full overflow-hidden">
                            <div className="h-full bg-[#1DB954] rounded-full w-[72%]"></div>
                        </div>
                        <div className="text-[10px] text-red-500 font-medium">-28% drop-off</div>
                    </div>

                    {/* Checkout */}
                    <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                            <span className="text-[#64748b]">Checkout</span>
                            <span className="font-medium text-[#0f172a]">3,280</span>
                        </div>
                        <div className="h-2 bg-[#e2e8f0] rounded-full overflow-hidden">
                            <div className="h-full bg-[#1DB954] rounded-full w-[26%]"></div>
                        </div>
                        <div className="text-[10px] text-red-500 font-medium">-63% drop-off</div>
                    </div>

                    {/* Purchase */}
                    <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                            <span className="text-[#64748b]">Purchase</span>
                            <span className="font-medium text-[#0f172a]">2,850</span>
                        </div>
                        <div className="h-2 bg-[#e2e8f0] rounded-full overflow-hidden">
                            <div className="h-full bg-[#1DB954] rounded-full w-[23%]"></div>
                        </div>
                        <div className="text-[10px] text-[#1DB954] font-medium">23% conversion rate</div>
                    </div>
                </div>
            </div>

            {/* Optimization Tip */}
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                <div className="flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                        <h4 className="text-sm font-semibold text-blue-900 mb-1">Optimization Tip</h4>
                        <p className="text-xs text-blue-700 leading-relaxed">
                            Reduce checkout drop-off by simplifying the payment form. Consider enabling guest checkout.
                        </p>
                    </div>
                </div>
            </div>

            {/* Top Performers */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-[#0f172a]">Top Performers</h3>
                    <HelpCircle className="w-4 h-4 text-[#94a3b8]" />
                </div>
            </div>
        </div>
    );
}
