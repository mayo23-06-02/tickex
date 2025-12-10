"use client";

import { useState } from "react";
import { Plus, Search, MoreHorizontal, LayoutTemplate, Tag, Users, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface TicketType {
    id: string;
    name: string;
    price: number;
    sold: number;
    total: number;
    status: "Active" | "Inactive";
    color?: string;
}

interface TicketSidebarProps {
    tickets: TicketType[];
    selectedId: string;
    onSelect: (id: string) => void;
    onCreate: () => void;
    onDelete: (id: string) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

export function TicketSidebar({
    tickets,
    selectedId,
    onSelect,
    onCreate,
    onDelete,
    searchQuery,
    setSearchQuery
}: TicketSidebarProps) {
    const [menuOpenId, setMenuOpenId] = useState<string | null>(null);

    return (
        <div className="w-80 flex-shrink-0 flex flex-col gap-6" onClick={() => setMenuOpenId(null)}>
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="font-semibold text-[#0f172a]">Ticket Types</h2>
                <button
                    onClick={onCreate}
                    className="w-8 h-8 flex items-center justify-center bg-[#1DB954] hover:bg-[#1ed760] text-white rounded-lg transition-colors shadow-sm shadow-green-200"
                >
                    <Plus className="w-5 h-5" />
                </button>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" />
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search ticket types..."
                    className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#e2e8f0] rounded-lg text-sm focus:outline-none focus:border-[#1DB954] transition-all"
                />
            </div>

            {/* Ticket List */}
            <div className="space-y-3">
                {tickets.map((ticket) => (
                    <motion.div
                        key={ticket.id}
                        onClick={() => onSelect(ticket.id)}
                        whileHover={{ scale: 1.01 }}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all relative ${selectedId === ticket.id
                            ? "bg-white border-[#1DB954] shadow-sm"
                            : "bg-white border-transparent hover:border-slate-200"
                            }`}
                    >
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${ticket.status === 'Active' ? 'bg-[#1DB954]' : 'bg-slate-300'}`} />
                                <span className="font-bold text-[#0f172a]">{ticket.name}</span>
                            </div>
                            <div className="relative" onClick={(e) => e.stopPropagation()}>
                                <button
                                    onClick={() => setMenuOpenId(menuOpenId === ticket.id ? null : ticket.id)}
                                    className="p-1 hover:bg-slate-100 rounded-md transition-colors"
                                >
                                    <MoreHorizontal className="w-4 h-4 text-[#94a3b8] hover:text-[#0f172a]" />
                                </button>

                                <AnimatePresence>
                                    {menuOpenId === ticket.id && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            className="absolute right-0 top-6 z-10 bg-white shadow-lg rounded-lg border border-[#e2e8f0] p-1 min-w-[120px]"
                                        >
                                            <button
                                                onClick={() => onDelete(ticket.id)}
                                                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                                Delete
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        <div className="text-sm font-medium text-[#64748b] mb-3">SZL {ticket.price}</div>

                        <div className="space-y-1.5">
                            <div className="flex justify-between text-xs text-[#64748b]">
                                <span>{ticket.sold}/{ticket.total} sold</span>
                                <span className={ticket.status === 'Active' ? "text-[#1DB954]" : "text-slate-400"}>
                                    {ticket.status}
                                </span>
                            </div>
                            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full ${ticket.status === 'Active' ? 'bg-[#1DB954]' : 'bg-slate-300'}`}
                                    style={{ width: `${(ticket.sold / ticket.total) * 100}%` }}
                                />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Create New / Templates */}
            <div
                onClick={onCreate}
                className="p-6 bg-white border border-[#e2e8f0] border-dashed rounded-xl flex flex-col items-center justify-center text-center gap-3 cursor-pointer hover:bg-slate-50 transition-colors group"
            >
                <div className="w-10 h-10 bg-slate-50 group-hover:bg-white rounded-full flex items-center justify-center text-[#94a3b8] group-hover:text-[#1DB954] transition-colors">
                    <Plus className="w-6 h-6" />
                </div>
                <div>
                    <div className="font-medium text-[#0f172a] text-sm">Create New Ticket</div>
                    <div className="text-xs text-[#64748b]">Choose from templates</div>
                </div>
            </div>

            {/* Quick Templates */}
            <div>
                <h3 className="text-xs font-semibold text-[#64748b] uppercase tracking-wider mb-3">Quick Templates</h3>
                <div className="space-y-2">
                    {[
                        { icon: LayoutTemplate, label: "VIP Template", color: "text-amber-500" },
                        { icon: Tag, label: "Early Bird", color: "text-rose-500" },
                        { icon: Users, label: "Group Ticket", color: "text-purple-500" },
                    ].map((template, i) => (
                        <button
                            key={i}
                            onClick={onCreate}
                            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white transition-colors text-sm text-[#64748b] hover:text-[#0f172a] hover:shadow-sm"
                        >
                            <template.icon className={`w-4 h-4 ${template.color}`} />
                            <span>{template.label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
