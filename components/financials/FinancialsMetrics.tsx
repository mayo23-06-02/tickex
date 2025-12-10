"use client";

import { ArrowUpRight, ArrowDownRight, MoreHorizontal, Plus } from "lucide-react";
import { motion } from "framer-motion";

export function FinancialsMetrics() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Total Revenue */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-[#e2e8f0]"
            >
                <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-[#1DB954]">
                        <span className="text-xl font-bold">$</span>
                    </div>
                    <button className="text-[#94a3b8] hover:text-[#64748b]">
                        <MoreHorizontal className="w-5 h-5" />
                    </button>
                </div>
                <div>
                    <h3 className="text-sm font-medium text-[#64748b] mb-1">Total Revenue</h3>
                    <div className="text-3xl font-bold text-[#0f172a] mb-2">SZL 42,100</div>
                    <div className="flex items-center gap-2 text-sm">
                        <span className="flex items-center text-green-600 font-medium">
                            <ArrowUpRight className="w-4 h-4 mr-0.5" />
                            +12.5%
                        </span>
                        <span className="text-[#94a3b8]">vs last month</span>
                    </div>
                    <div className="mt-4 space-y-2">
                        <div className="flex justify-between text-xs">
                            <span className="text-[#64748b]">Online Sales</span>
                            <span className="font-medium text-[#0f172a]">SZL 35,280</span>
                        </div>
                        <div className="h-1.5 bg-[#f1f5f9] rounded-full overflow-hidden">
                            <div className="h-full bg-[#1DB954] w-[83%] rounded-full" />
                        </div>
                        <div className="flex justify-between text-xs">
                            <span className="text-[#64748b]">Box Office</span>
                            <span className="font-medium text-[#0f172a]">SZL 6,820</span>
                        </div>
                        <div className="h-1.5 bg-[#f1f5f9] rounded-full overflow-hidden">
                            <div className="h-full bg-[#0f172a] w-[17%] rounded-full" />
                        </div>
                    </div>
                    <div className="mt-4 text-xs font-medium text-[#1DB954]">
                        Projection: SZL 58,400 →
                    </div>
                </div>
            </motion.div>

            {/* Total Expenses */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-[#e2e8f0]"
            >
                <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-500">
                        <ArrowDownRight className="w-6 h-6" />
                    </div>
                    <button className="flex items-center gap-1 bg-[#1DB954] text-white px-2 py-1 rounded-md text-xs font-medium hover:bg-[#158e42] transition-colors">
                        <Plus className="w-3 h-3" />
                        Add
                    </button>
                </div>
                <div>
                    <h3 className="text-sm font-medium text-[#64748b] mb-1">Total Expenses</h3>
                    <div className="text-3xl font-bold text-[#0f172a] mb-2">SZL 27,786</div>
                    <div className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full mb-4">
                        Profit Margin: 34%
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2 text-[#64748b]">
                                <div className="w-2 h-2 rounded-full bg-[#1DB954]" />
                                Venue
                            </div>
                            <span className="font-medium text-[#0f172a]">SZL 15,000</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2 text-[#64748b]">
                                <div className="w-2 h-2 rounded-full bg-[#94a3b8]" />
                                Marketing
                            </div>
                            <span className="font-medium text-[#0f172a]">SZL 8,286</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2 text-[#64748b]">
                                <div className="w-2 h-2 rounded-full bg-[#cbd5e1]" />
                                Production
                            </div>
                            <span className="font-medium text-[#0f172a]">SZL 4,500</span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Live Transaction Feed */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-[#e2e8f0] flex flex-col"
            >
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-sm font-medium text-[#64748b]">Live Transaction Feed</h3>
                    <div className="flex gap-2">
                        <div className="flex items-center gap-1 bg-red-50 px-2 py-1 rounded text-red-500">
                            <span className="animate-pulse w-1.5 h-1.5 rounded-full bg-red-500" />
                        </div>
                        <div className="bg-blue-50 p-1 rounded text-blue-500">
                            <div className="w-4 h-4" /> {/* Placeholder for pause icon */}
                        </div>
                    </div>
                </div>

                <div className="flex-1 space-y-5">
                    {[
                        { name: "John Smith", time: "2 min ago", amount: "+SZL 375", type: "Card", color: "text-green-500" },
                        { name: "Sarah Johnson", time: "5 min ago", amount: "+SZL 240", type: "PayPal", color: "text-green-500" },
                        { name: "Mike Wilson", time: "8 min ago", amount: "+SZL 180", type: "Card", color: "text-green-500" },
                        { name: "Emma Davis", time: "12 min ago", amount: "+SZL 50", type: "Cash", color: "text-green-500" },
                        { name: "Tom Brown", time: "15 min ago", amount: "+SZL 420", type: "Card", color: "text-green-500" },
                    ].slice(0, 4).map((tx, i) => (
                        <div key={i} className="flex justify-between items-center">
                            <div>
                                <div className="text-sm font-medium text-[#0f172a]">{tx.name}</div>
                                <div className="text-xs text-[#94a3b8]">{tx.time}</div>
                            </div>
                            <div className="text-right">
                                <div className={`text-sm font-medium ${tx.color}`}>{tx.amount}</div>
                                <div className="text-xs text-[#94a3b8]">{tx.type}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <button className="w-full mt-auto pt-4 text-xs font-medium text-[#64748b] hover:text-[#0f172a] border-t border-[#e2e8f0]">
                    View Full Transaction History
                </button>
            </motion.div>
        </div>
    );
}
