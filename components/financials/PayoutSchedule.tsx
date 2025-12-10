"use client";

import { useState } from "react";
import { Plus, Clock, Info, CheckSquare, Square } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PayoutItem {
    id: string;
    title: string;
    date: string;
    amount: number;
    status: "Pending" | "Scheduled" | "Paid";
    type: "rent" | "service" | "artist";
}

export function PayoutSchedule() {
    const [payouts, setPayouts] = useState<PayoutItem[]>([
        { id: "1", title: "Venue Rental", date: "Mar 1, 2025", amount: 15000, status: "Pending", type: "rent" },
        { id: "2", title: "Catering Service", date: "Mar 5, 2025", amount: 8500, status: "Pending", type: "service" },
        { id: "3", title: "Artist Payment", date: "Mar 10, 2025", amount: 12000, status: "Scheduled", type: "artist" },
    ]);

    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

    const toggleSelection = (id: string) => {
        const newSelected = new Set(selectedIds);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelectedIds(newSelected);
    };

    const handleBulkPay = () => {
        setPayouts(prev => prev.map(item =>
            selectedIds.has(item.id) ? { ...item, status: "Paid" } : item
        ));
        setSelectedIds(new Set());
    };

    const handleMarkAsPaid = (id: string) => {
        setPayouts(prev => prev.map(item =>
            item.id === id ? { ...item, status: "Paid" } : item
        ));
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case "rent": return <Clock className="w-5 h-5" />;
            case "service": return <Clock className="w-5 h-5" />;
            case "artist": return <Info className="w-5 h-5" />;
            default: return <Info className="w-5 h-5" />;
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case "rent": case "service": return "bg-orange-100 text-orange-500";
            case "artist": return "bg-blue-100 text-blue-500";
            default: return "bg-slate-100 text-slate-500";
        }
    };

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e2e8f0]">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-[#0f172a]">Payout Schedule</h3>
                <div className="flex gap-2">
                    {selectedIds.size > 0 && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            onClick={handleBulkPay}
                            className="bg-[#0f172a] text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-slate-800 transition-colors shadow-sm"
                        >
                            Pay Selected ({selectedIds.size})
                        </motion.button>
                    )}
                    <button className="flex items-center gap-1 bg-[#1DB954] text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-[#169c46] transition-colors shadow-sm">
                        <Plus className="w-3.5 h-3.5" />
                        Schedule Payment
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                <AnimatePresence>
                    {payouts.map((item) => (
                        <motion.div
                            key={item.id}
                            layout
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`border ${selectedIds.has(item.id) ? 'border-[#1DB954] ring-1 ring-[#1DB954]' : 'border-[#e2e8f0]'} rounded-lg p-4 transition-all ${item.status === 'Paid' ? 'bg-slate-50 opacity-60' : 'bg-white'}`}
                        >
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex items-start gap-3">
                                    <button
                                        onClick={() => toggleSelection(item.id)}
                                        className="mt-1 text-slate-400 hover:text-[#1DB954] transition-colors"
                                    >
                                        {selectedIds.has(item.id) ? (
                                            <CheckSquare className="w-5 h-5 text-[#1DB954]" />
                                        ) : (
                                            <Square className="w-5 h-5" />
                                        )}
                                    </button>

                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mt-1 ${getTypeColor(item.type)}`}>
                                        {getTypeIcon(item.type)}
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-[#0f172a]">{item.title}</h4>
                                        <p className="text-xs text-[#64748b]">Due: {item.date}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-bold text-[#0f172a]">SZL {item.amount.toLocaleString()}</div>
                                    <div className={`inline-block text-[10px] font-bold px-1.5 py-0.5 rounded mt-1
                                        ${item.status === 'Paid' ? 'bg-green-100 text-green-700' :
                                            item.status === 'Pending' ? 'bg-orange-100 text-orange-700' :
                                                'bg-blue-100 text-blue-700'}`}>
                                        {item.status}
                                    </div>
                                </div>
                            </div>

                            {item.status !== 'Paid' && (
                                <div className="flex gap-3 mt-4 pl-8">
                                    <button
                                        onClick={() => handleMarkAsPaid(item.id)}
                                        className="flex-1 bg-[#1DB954]/10 text-[#1DB954] py-2 rounded-lg text-xs font-bold hover:bg-[#1DB954] hover:text-white transition-all"
                                    >
                                        Mark as Paid
                                    </button>
                                    <button className="flex-1 bg-white border border-[#e2e8f0] text-[#64748b] py-2 rounded-lg text-xs font-semibold hover:bg-slate-50 hover:text-[#0f172a] transition-colors">
                                        Send Reminder
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>

                {payouts.length === 0 && (
                    <div className="text-center py-8 text-slate-400 text-sm">No scheduled payouts</div>
                )}
            </div>
        </div>
    );
}
