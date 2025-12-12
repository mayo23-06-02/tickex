"use client";

import { motion } from "framer-motion";
import { Search, MapPin, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function PublicEventsClient({ events }: { events: any[] }) {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredEvents = events.filter(e =>
        e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.venue.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Hero / Filter Section */}
            <div className="bg-slate-900 text-white py-12 px-6">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-3xl font-bold mb-6">Explore Events</h1>
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search events, venues..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1DB954]"
                        />
                    </div>
                </div>
            </div>

            {/* Events Grid */}
            <div className="max-w-6xl mx-auto px-6 mt-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredEvents.map((event) => (
                        <Link href={`/events/${event.id}`} key={event.id}>
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl transition-all h-full flex flex-col"
                            >
                                <div
                                    className="h-48 bg-cover bg-center"
                                    style={{ backgroundImage: `url(${event.imageUrl || event.image})` }}
                                />
                                <div className="p-5 flex flex-col flex-grow">
                                    <div className="text-xs font-bold text-[#1DB954] mb-2 uppercase tracking-wide">{event.category}</div>
                                    <h3 className="font-bold text-lg text-slate-900 mb-2 line-clamp-2">{event.title}</h3>
                                    <div className="space-y-2 mt-auto">
                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                            <Calendar className="w-4 h-4" />
                                            {event.date}
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                            <Clock className="w-4 h-4" />
                                            {event.time}
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                            <MapPin className="w-4 h-4" />
                                            {event.venue}
                                        </div>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
                                        <span className="font-bold text-slate-900">{event.price}</span>
                                        <span className="text-sm font-medium text-blue-600">Get Tickets &rarr;</span>
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>

                {filteredEvents.length === 0 && (
                    <div className="text-center py-20 text-slate-500">
                        No events found matching your search.
                    </div>
                )}
            </div>
        </div>
    );
}
