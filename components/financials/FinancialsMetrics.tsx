"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, ArrowDownRight, MoreHorizontal, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { getFinancialData } from "@/app/actions/financials";
import { toast } from "sonner";

export function FinancialsMetrics() {
    const [metrics, setMetrics] = useState({
        totalRevenue: 0,
        ticketSales: 0,
        pendingPayouts: 0,
        recentTransactions: [] // Placeholder until we add a transaction feed endpoint
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            try {
                const data = await getFinancialData();
                setMetrics({
                    totalRevenue: data.totalRevenue,
                    ticketSales: data.totalSales,
                    pendingPayouts: data.pendingPayouts,
                    recentTransactions: data.recentTransactions || []
                });
            } catch (error) {
                console.error("Failed to fetch financial data:", error);
                // toast.error("Could not load financial data");
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    if (loading) {
        return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3].map(i => <div key={i} className="bg-slate-100 h-64 rounded-xl"></div>)}
        </div>;
    }

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
                    <div className="text-3xl font-bold text-[#0f172a] mb-2">
                        SZL {metrics.totalRevenue.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <span className="flex items-center text-green-600 font-medium">
                            <ArrowUpRight className="w-4 h-4 mr-0.5" />
                            +12.5%
                        </span>
                        <span className="text-[#94a3b8]">vs last month</span>
                    </div>
                    <div className="mt-4 space-y-2">
                        <div className="flex justify-between text-xs">
                            <span className="text-[#64748b]">Ticket Sales Count</span>
                            <span className="font-medium text-[#0f172a]">{metrics.ticketSales}</span>
                        </div>
                        <div className="h-1.5 bg-[#f1f5f9] rounded-full overflow-hidden">
                            <div className="h-full bg-[#1DB954] w-[100%] rounded-full" />
                        </div>
                    </div>
                    <div className="mt-4 text-xs font-medium text-[#1DB954]">
                        Pending Payouts: SZL {metrics.pendingPayouts.toLocaleString()}
                    </div>
                </div>
            </motion.div>

            {/* Total Expenses (Static for now as requested by user context impliciation of DB steps usually being incremental) */}
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
                    <div className="text-3xl font-bold text-[#0f172a] mb-2">SZL 0</div>
                    <div className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full mb-4">
                        Profit Margin: 100%
                    </div>
                    <div className="text-sm text-[#64748b] italic">
                        Expense tracking coming soon.
                    </div>
                </div>
            </motion.div>

            {/* Live Transaction Feed (Mocked based on Orders later) */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-[#e2e8f0] flex flex-col"
            >
                {/* Recent Transactions Feed */}
                <h3 className="text-lg font-bold text-[#0f172a] mb-4">Recent Transactions</h3>
                <div className="space-y-4">
                    {metrics.recentTransactions && metrics.recentTransactions.length > 0 ? (
                        metrics.recentTransactions.map((t: any) => (
                            <div key={t.id} className="flex justify-between items-center border-b border-slate-50 pb-3 last:border-0 last:pb-0">
                                <div>
                                    <div className="font-semibold text-slate-800 text-sm">{t.customer}</div>
                                    <div className="text-xs text-slate-500">{t.event} • {new Date(t.date).toLocaleDateString()}</div>
                                </div>
                                <div className="text-right">
                                    <div className="font-bold text-[#1DB954]">+ SZL {t.amount}</div>
                                    <div className="text-[10px] uppercase font-bold text-slate-400">{t.status}</div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-slate-400 py-8 text-sm">No recent transactions</div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
