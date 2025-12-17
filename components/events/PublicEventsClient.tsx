"use client";

import { motion } from "framer-motion";
import { Search, MapPin, Calendar, Clock, ChevronRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function PublicEventsClient({ events }: { events: any[] }) {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const filteredEvents = events.filter(e =>
        e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.venue.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-primary selection:text-white pb-20">
            {/* Navigation */}
            <nav className="absolute top-0 w-full z-50 py-6 px-6 lg:px-12">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <img src="/logo.svg" alt="TickEx Logo" className="w-10 h-10" />
                        <span className="text-xl font-bold tracking-tight text-slate-900">TickEx</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8 font-medium text-slate-600">
                        <Link href="/events" className="text-slate-900 font-bold transition-colors">Schedule</Link>
                        <Link href="/events" className="hover:text-primary transition-colors">Speakers</Link>
                        <Link href="/events" className="hover:text-primary transition-colors">Ticket</Link>
                        <Link href="/help" className="hover:text-primary transition-colors">Contact</Link>
                        <Link href="/auth/customer/login" className="text-primary font-bold hover:text-[#d90d6b] transition-colors">Login</Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-slate-900"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>

                {/* Mobile Menu Overlay */}
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-slate-200 p-6 flex flex-col gap-4 shadow-xl z-50 rounded-b-2xl"
                    >
                        <Link href="/events" className="text-slate-900 font-bold">Schedule</Link>
                        <Link href="/events" className="text-slate-600 hover:text-primary">Speakers</Link>
                        <Link href="/events" className="text-slate-600 hover:text-primary">Ticket</Link>
                        <Link href="/auth/customer/login" className="text-primary font-bold">Login</Link>
                    </motion.div>
                )}
            </nav>

            {/* Header Section */}
            <div className="relative py-32 px-6 lg:px-12 overflow-hidden bg-white">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />

                <div className="max-w-7xl mx-auto relative z-10 text-center md:text-left">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
                        Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#9926f0]">Events</span>
                    </h1>

                    {/* Search Bar */}
                    <div className="bg-white p-2 rounded-full shadow-2xl border border-slate-100 flex items-center max-w-2xl mx-auto md:mx-0">
                        <div className="pl-6 pr-4">
                            <Search className="w-5 h-5 text-slate-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search events, venues, artists..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-transparent text-slate-900 py-3 focus:outline-none placeholder:text-slate-400 font-medium"
                        />
                        <button className="bg-primary hover:bg-[#d90d6b] text-white px-8 py-3 rounded-full font-bold transition-all ml-2">
                            Search
                        </button>
                    </div>
                </div>
            </div>

            {/* Events Grid */}
            <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-12">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-xl font-bold text-slate-900">All Events</h2>
                    <div className="text-slate-500 text-sm">{filteredEvents.length} results found</div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredEvents.map((event, index) => (
                        <Link href={`/events/${event.id}`} key={event.id}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ y: -10 }}
                                className="bg-white rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl group cursor-pointer h-full flex flex-col border border-slate-100"
                            >
                                <div className="relative h-48 overflow-hidden">
                                    <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg shadow-sm">
                                        <div className="text-xs font-bold text-primary uppercase tracking-wider">{event.category || 'Event'}</div>
                                    </div>
                                    <div className="absolute top-4 right-4 z-10 bg-primary px-3 py-1 rounded-full shadow-lg">
                                        <div className="text-xs font-bold text-white">{event.price}</div>
                                    </div>
                                    <img
                                        src={event.imageUrl || event.image || "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500&q=80"}
                                        alt={event.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>

                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex gap-4 mb-4">
                                        <div className="flex flex-col items-center min-w-[3rem] text-primary">
                                            <span className="text-xs font-bold uppercase">DATE</span>
                                            <span className="text-xl font-bold text-slate-900">{event.date ? event.date.split(' ')[0] : 'TBA'}</span>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                                                {event.title}
                                            </h3>
                                            <div className="flex items-center gap-2 text-slate-500 text-sm mb-1">
                                                <MapPin className="w-4 h-4" />
                                                <span className="line-clamp-1">{event.venue}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-slate-500 text-sm">
                                                <Clock className="w-4 h-4" />
                                                <span>{event.time}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-auto pt-4 border-t border-slate-100 flex justify-between items-center text-sm">
                                        <div className="flex -space-x-2">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white" />
                                            ))}
                                            <div className="w-6 h-6 rounded-full bg-slate-300 border-2 border-white flex items-center justify-center text-[8px] text-slate-700">
                                                +20
                                            </div>
                                        </div>
                                        <span className="text-primary font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                                            Get Ticket <ChevronRight className="w-4 h-4" />
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>

                {filteredEvents.length === 0 && (
                    <div className="text-center py-20">
                        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Search className="w-10 h-10 text-slate-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">No Events Found</h3>
                        <p className="text-slate-500">Try adjusting your search terms</p>
                    </div>
                )}
            </div>
        </div>
    );
}
