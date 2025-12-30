"use client";

import { Calendar, MoreVertical, Copy, Trash2, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Event } from "@/app/dashboard/events/page";

interface EventsGridProps {
    events: Event[];
    viewMode: "grid" | "list" | "calendar";
    onDelete: (id: string) => void;
    onDuplicate: (id: string) => void;
}

export function EventsGrid({ events, viewMode, onDelete, onDuplicate }: EventsGridProps) {
    const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
    const router = useRouter();

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Active": return "bg-[#1DB954] text-white";
            case "Upcoming": return "bg-blue-100 text-blue-700";
            case "Draft": return "bg-slate-100 text-slate-700";
            case "Completed": return "bg-purple-100 text-purple-700";
            case "Cancelled": return "bg-red-100 text-red-700";
            default: return "bg-slate-100 text-slate-700";
        }
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    if (viewMode === "grid") {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                    {events.map((event) => (
                        <motion.div
                            key={event.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-white rounded-2xl overflow-hidden border border-[#e2e8f0] hover:shadow-lg transition-all group cursor-pointer"
                            onClick={() => router.push(`/dashboard/events/${event.id}`)}
                        >
                            {/* Event Color Header */}
                            <div
                                className="h-32 relative flex items-center justify-center bg-cover bg-center"
                                style={{
                                    background: event.imageUrl ? `url(${event.imageUrl})` : event.color,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }}
                            >
                                <div className="absolute inset-0 bg-black/20" /> {/* Overlay for text readability */}
                                <h3 className="text-white text-xl font-bold px-4 text-center z-10 relative shadow-black/50 drop-shadow-md">{event.name}</h3>

                                {/* Menu Button */}
                                <div className="absolute top-3 right-3" onClick={(e) => e.stopPropagation()}>
                                    <button
                                        onClick={() => setMenuOpenId(menuOpenId === event.id ? null : event.id)}
                                        className="p-2 bg-white/20 hover:bg-white/30 rounded-lg backdrop-blur-sm transition-colors"
                                    >
                                        <MoreVertical className="w-4 h-4 text-white" />
                                    </button>

                                    <AnimatePresence>
                                        {menuOpenId === event.id && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                className="absolute right-0 top-10 z-10 bg-white shadow-xl rounded-lg border border-[#e2e8f0] p-1 min-w-[160px]"
                                            >
                                                <button
                                                    onClick={() => router.push(`/dashboard/events/${event.id}`)}
                                                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[#0f172a] hover:bg-slate-50 rounded-md transition-colors"
                                                >
                                                    <ExternalLink className="w-3.5 h-3.5" />
                                                    View Details
                                                </button>
                                                <button
                                                    onClick={() => onDuplicate(event.id)}
                                                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[#0f172a] hover:bg-slate-50 rounded-md transition-colors"
                                                >
                                                    <Copy className="w-3.5 h-3.5" />
                                                    Duplicate
                                                </button>
                                                <button
                                                    onClick={() => onDelete(event.id)}
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

                            {/* Event Details */}
                            <div className="p-5">
                                <div className="flex items-center gap-2 text-sm text-[#64748b] mb-3">
                                    <Calendar className="w-4 h-4" />
                                    {formatDate(event.date)}
                                </div>

                                <div className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold mb-4 ${getStatusColor(event.status)}`}>
                                    {event.status}
                                </div>

                                <div className="space-y-3">
                                    <div>
                                        <div className="flex justify-between text-xs text-[#64748b] mb-1.5">
                                            <span>Tickets</span>
                                            <span>{event.ticketsSold}/{event.ticketsTotal}</span>
                                        </div>
                                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-[#1DB954] rounded-full transition-all"
                                                style={{ width: `${(event.ticketsSold / event.ticketsTotal) * 100}%` }}
                                            />
                                        </div>
                                    </div>

                                    <div className="pt-3 border-t border-[#e2e8f0]">
                                        <div className="text-xs text-[#64748b] mb-1">Revenue</div>
                                        <div className="text-xl font-bold text-[#1DB954]">
                                            SZL {event.revenue.toLocaleString()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {events.length === 0 && (
                    <div className="col-span-full text-center py-16 text-slate-400">
                        <Calendar className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p className="text-lg font-semibold mb-2">No events found</p>
                        <p className="text-sm">Try adjusting your filters or create a new event</p>
                    </div>
                )}
            </div>
        );
    }

    // List View
    return (
        <div className="bg-white rounded-xl border border-[#e2e8f0] overflow-hidden">
            <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-slate-50 border-b border-[#e2e8f0] text-xs font-semibold text-[#64748b] uppercase tracking-wider">
                <div className="col-span-4">Event Name</div>
                <div className="col-span-2">Date</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2">Tickets</div>
                <div className="col-span-2">Revenue</div>
            </div>

            <AnimatePresence>
                {events.map((event) => (
                    <motion.div
                        key={event.id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-[#e2e8f0] last:border-b-0 hover:bg-slate-50 cursor-pointer transition-colors"
                        onClick={() => router.push(`/dashboard/events/${event.id}`)}
                    >
                        <div className="col-span-4 flex items-center gap-3">
                            {event.imageUrl ? (
                                <div className="w-8 h-8 rounded-lg bg-cover bg-center flex-shrink-0 border border-slate-200" style={{ backgroundImage: `url(${event.imageUrl})` }} />
                            ) : (
                                <div
                                    className="w-3 h-3 rounded-full flex-shrink-0"
                                    style={{ background: event.color }}
                                />
                            )}
                            <span className="font-semibold text-[#0f172a] truncate">{event.name}</span>
                        </div>
                        <div className="col-span-2 flex items-center text-sm text-[#64748b]">
                            {formatDate(event.date)}
                        </div>
                        <div className="col-span-2 flex items-center">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(event.status)}`}>
                                {event.status}
                            </span>
                        </div>
                        <div className="col-span-2 flex items-center text-sm text-[#64748b]">
                            {event.ticketsSold}/{event.ticketsTotal}
                        </div>
                        <div className="col-span-2 flex items-center justify-between">
                            <span className="font-bold text-[#1DB954]">
                                SZL {event.revenue.toLocaleString()}
                            </span>
                            <div className="relative" onClick={(e) => e.stopPropagation()}>
                                <button
                                    onClick={() => setMenuOpenId(menuOpenId === event.id ? null : event.id)}
                                    className="p-1 hover:bg-slate-100 rounded-md"
                                >
                                    <MoreVertical className="w-4 h-4 text-[#64748b]" />
                                </button>

                                <AnimatePresence>
                                    {menuOpenId === event.id && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            className="absolute right-0 top-8 z-10 bg-white shadow-xl rounded-lg border border-[#e2e8f0] p-1 min-w-[160px]"
                                        >
                                            <button
                                                onClick={() => router.push(`/dashboard/events/${event.id}`)}
                                                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[#0f172a] hover:bg-slate-50 rounded-md transition-colors"
                                            >
                                                <ExternalLink className="w-3.5 h-3.5" />
                                                View Details
                                            </button>
                                            <button
                                                onClick={() => onDuplicate(event.id)}
                                                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[#0f172a] hover:bg-slate-50 rounded-md transition-colors"
                                            >
                                                <Copy className="w-3.5 h-3.5" />
                                                Duplicate
                                            </button>
                                            <button
                                                onClick={() => onDelete(event.id)}
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
                    </motion.div>
                ))}
            </AnimatePresence>

            {events.length === 0 && (
                <div className="text-center py-16 text-slate-400">
                    <Calendar className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-semibold mb-2">No events found</p>
                    <p className="text-sm">Try adjusting your filters or create a new event</p>
                </div>
            )}
        </div>
    );
}
