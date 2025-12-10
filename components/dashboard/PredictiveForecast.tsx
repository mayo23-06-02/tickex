"use client";

import { Sparkles } from "lucide-react";

export function PredictiveForecast() {
    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e2e8f0] h-full flex flex-col">
            <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-4 h-4 text-[#1DB954]" />
                <h2 className="text-sm font-semibold text-[#0f172a]">Predictive Forecast</h2>
            </div>

            <div className="space-y-6 flex-1">
                {/* Sellout Probability */}
                <div className="bg-slate-50 rounded-lg p-4 border border-[#e2e8f0]">
                    <div className="flex justify-between items-end mb-2">
                        <span className="text-sm font-medium text-[#0f172a]">Sellout Probability</span>
                        <span className="text-lg font-bold text-[#1DB954]">94%</span>
                    </div>
                    <div className="h-2 bg-[#e2e8f0] rounded-full overflow-hidden">
                        <div className="h-full bg-[#1DB954] rounded-full" style={{ width: '94%' }}></div>
                    </div>
                </div>

                {/* Revenue Forecast */}
                <div className="bg-slate-50 rounded-lg p-4 border border-[#e2e8f0]">
                    <div className="mb-1 text-sm font-medium text-[#0f172a]">Revenue Forecast</div>
                    <div className="text-2xl font-bold text-[#0f172a] mb-1">SZL 58,400</div>
                    <div className="text-xs text-[#64748b]">Expected total revenue</div>
                </div>

                {/* Peak Sales Times */}
                <div>
                    <div className="text-sm font-medium text-[#0f172a] mb-3">Peak Sales Times</div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-3 text-xs">
                            <span className="w-24 text-[#64748b]">Friday 6-8 PM</span>
                            <div className="flex-1 h-2 bg-[#e2e8f0] rounded-full overflow-hidden">
                                <div className="h-full bg-[#1DB954] rounded-full" style={{ width: '85%' }}></div>
                            </div>
                            <span className="text-[#0f172a] font-medium w-8 text-right">High</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs">
                            <span className="w-24 text-[#64748b]">Saturday 2-4 PM</span>
                            <div className="flex-1 h-2 bg-[#e2e8f0] rounded-full overflow-hidden">
                                <div className="h-full bg-[#1DB954] rounded-full" style={{ width: '60%' }}></div>
                            </div>
                            <span className="text-[#0f172a] font-medium w-8 text-right">Med</span>
                        </div>
                    </div>
                </div>

                {/* Recommended Actions */}
                <div>
                    <div className="text-sm font-medium text-[#0f172a] mb-3">Recommended Actions</div>
                    <div className="space-y-2">
                        <div className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-lg border border-[#e2e8f0]">
                            <div className="w-1 h-1 rounded-full bg-[#0f172a] mt-1.5 flex-shrink-0"></div>
                            <span className="text-xs text-[#64748b]">Send email blast on Friday at 5 PM</span>
                        </div>
                        <div className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-lg border border-[#e2e8f0]">
                            <div className="w-1 h-1 rounded-full bg-[#0f172a] mt-1.5 flex-shrink-0"></div>
                            <span className="text-xs text-[#64748b]">Create urgency: Only 358 tickets left</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
