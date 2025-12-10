"use client";

import { Plus, Clock, Info } from "lucide-react";

export function PayoutSchedule() {
    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e2e8f0]">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-[#0f172a]">Payout Schedule</h3>
                <button className="flex items-center gap-1 bg-[#1DB954] text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-[#169c46] transition-colors shadow-sm">
                    <Plus className="w-3.5 h-3.5" />
                    Schedule Payment
                </button>
            </div>

            <div className="space-y-4">
                {/* Payout Item 1 */}
                <div className="border border-[#e2e8f0] rounded-lg p-4 bg-slate-50/50">
                    <div className="flex justify-between items-start mb-3">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 mt-1">
                                <Clock className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold text-[#0f172a]">Venue Rental</h4>
                                <p className="text-xs text-[#64748b]">Due: Mar 1, 2025</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-sm font-bold text-[#0f172a]">SZL 15,000</div>
                            <div className="inline-block bg-orange-100 text-orange-700 text-[10px] font-bold px-1.5 py-0.5 rounded mt-1">
                                Pending
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3 mt-4">
                        <button className="flex-1 bg-[#1DB954] text-white py-2 rounded-lg text-xs font-bold hover:bg-[#169c46] transition-colors shadow-sm">
                            Mark as Paid
                        </button>
                        <button className="flex-1 bg-white border border-[#e2e8f0] text-[#64748b] py-2 rounded-lg text-xs font-semibold hover:bg-slate-50 hover:text-[#0f172a] transition-colors">
                            Send Reminder
                        </button>
                    </div>
                </div>

                {/* Payout Item 2 */}
                <div className="border border-[#e2e8f0] rounded-lg p-4 bg-slate-50/50">
                    <div className="flex justify-between items-start mb-3">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 mt-1">
                                <Clock className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold text-[#0f172a]">Catering Service</h4>
                                <p className="text-xs text-[#64748b]">Due: Mar 5, 2025</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-sm font-bold text-[#0f172a]">SZL 8,500</div>
                            <div className="inline-block bg-orange-100 text-orange-700 text-[10px] font-bold px-1.5 py-0.5 rounded mt-1">
                                Pending
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3 mt-4">
                        <button className="flex-1 bg-[#1DB954] text-white py-2 rounded-lg text-xs font-bold hover:bg-[#169c46] transition-colors shadow-sm">
                            Mark as Paid
                        </button>
                        <button className="flex-1 bg-white border border-[#e2e8f0] text-[#64748b] py-2 rounded-lg text-xs font-semibold hover:bg-slate-50 hover:text-[#0f172a] transition-colors">
                            Send Reminder
                        </button>
                    </div>
                </div>

                {/* Payout Item 3 */}
                <div className="border border-[#e2e8f0] rounded-lg p-4 bg-white opacity-75">
                    <div className="flex justify-between items-start mb-2">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mt-1">
                                <Info className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold text-[#0f172a]">Artist Payment</h4>
                                <p className="text-xs text-[#64748b]">Due: Mar 10, 2025</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-sm font-bold text-[#0f172a]">SZL 12,000</div>
                            <div className="inline-block bg-blue-100 text-blue-700 text-[10px] font-bold px-1.5 py-0.5 rounded mt-1">
                                Scheduled
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
