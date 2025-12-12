"use client";

import { useState } from "react";
import { Search, MapPin, ChevronRight, ChevronLeft, User, ShoppingBag, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface LandingPageProps {
    featuredEvents: any[];
    trendingEvents: any[];
}

export default function LandingPageClient({ featuredEvents, trendingEvents }: LandingPageProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCity, setSelectedCity] = useState("Mbabane");

    const categories = [
        { id: "sports", title: "Sports", icon: "⚽", gradient: "from-blue-500 to-blue-600" },
        { id: "concerts", title: "Concerts", icon: "🎸", gradient: "from-purple-500 to-purple-600" },
        { id: "family", title: "Family Friendly", icon: "👨‍👩‍👧", gradient: "from-pink-500 to-pink-600" },
        { id: "theater", title: "Theater & Comedy", icon: "🎭", gradient: "from-orange-500 to-orange-600" },
        { id: "music", title: "Music", icon: "🎵", gradient: "from-green-500 to-green-600" },
    ];

    const musicGenres = [
        { id: "pop", title: "Pop", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400" },
        { id: "rock", title: "Rock", image: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=400" },
        { id: "country", title: "Country", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400" },
        { id: "hiphop", title: "Hip-Hop", image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400" },
        { id: "rnb", title: "R&B", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400" },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#1DB954] to-[#1ed760] rounded-xl flex items-center justify-center shadow-lg shadow-green-500/50">
                                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                                </svg>
                            </div>
                            <span className="text-2xl font-black text-white">TickEx</span>
                        </Link>

                        {/* Search Bar */}
                        <div className="hidden md:flex flex-1 max-w-xl mx-8">
                            <div className="relative w-full">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search for event, performer, venue"
                                    className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1DB954]/50 focus:border-[#1DB954] transition-all"
                                />
                            </div>
                        </div>

                        {/* Right Actions */}
                        <div className="flex items-center gap-4">
                            <button className="hidden sm:flex items-center gap-2 px-4 py-2 text-white hover:text-[#1DB954] transition-colors">
                                <MapPin className="w-4 h-4" />
                                <span className="text-sm font-medium">{selectedCity}</span>
                            </button>

                            <Link href="/my-orders" className="hidden sm:flex items-center gap-2 px-4 py-2 text-white hover:text-[#1DB954] transition-colors">
                                <ShoppingBag className="w-4 h-4" />
                                <span className="text-sm font-medium">My Orders</span>
                            </Link>

                            <Link href="/auth/organizer/login" className="px-5 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white text-sm font-bold rounded-full transition-all">
                                Sell Tickets
                            </Link>

                            <Link href="/auth/customer/login" className="p-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full transition-all">
                                <User className="w-5 h-5 text-white" />
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/20 to-slate-900"></div>

                <div className="relative max-w-7xl mx-auto px-6 py-16">
                    {/* Featured Event Hero */}
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-purple-900/50">
                        <div className="aspect-[21/9] relative">
                            {featuredEvents[0]?.imageUrl ? (
                                <img
                                    src={featuredEvents[0].imageUrl}
                                    alt={featuredEvents[0].title}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600"></div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

                            {/* Hero Content */}
                            <div className="absolute bottom-0 left-0 right-0 p-12">
                                <div className="max-w-2xl">
                                    <h1 className="text-5xl md:text-6xl font-black text-white mb-4 leading-tight">
                                        {featuredEvents[0]?.title || "Discover Amazing Events"}
                                    </h1>
                                    <p className="text-xl text-white/90 mb-8">
                                        {featuredEvents[0]?.artist || "See the best live events near you"}
                                    </p>
                                    <Link
                                        href={featuredEvents[0] ? `/events/${featuredEvents[0].id}` : "/events"}
                                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#1DB954] to-[#1ed760] text-white font-bold rounded-full shadow-lg shadow-green-500/50 hover:shadow-green-500/70 hover:scale-105 transition-all"
                                    >
                                        Get Tickets
                                        <ChevronRight className="w-5 h-5" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Category Tabs */}
                    <div className="mt-8 flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                className="flex-shrink-0 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full text-white font-semibold transition-all hover:scale-105"
                            >
                                <span className="mr-2">{category.icon}</span>
                                {category.title}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Music Genres Section */}
            <section className="py-12 bg-black/20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-black text-white">Browse by Genre</h2>
                        <button className="flex items-center gap-2 text-[#1DB954] hover:text-[#1ed760] font-semibold transition-colors">
                            View All
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {musicGenres.map((genre) => (
                            <motion.div
                                key={genre.id}
                                whileHover={{ scale: 1.05 }}
                                className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group"
                            >
                                <img
                                    src={genre.image}
                                    alt={genre.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                                <div className="absolute inset-0 bg-[#1DB954]/0 group-hover:bg-[#1DB954]/20 transition-all"></div>
                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <h3 className="text-2xl font-black text-white">{genre.title}</h3>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Upcoming Events Section */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <h2 className="text-3xl font-black text-white">Upcoming Events in</h2>
                            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full">
                                <MapPin className="w-4 h-4 text-[#1DB954]" />
                                <span className="text-white font-semibold">{selectedCity}</span>
                            </div>
                        </div>
                        <button className="flex items-center gap-2 text-[#1DB954] hover:text-[#1ed760] font-semibold transition-colors">
                            Show +300 More
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Events Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredEvents.slice(0, 6).map((event) => (
                            <Link
                                key={event.id}
                                href={`/events/${event.id}`}
                                className="group"
                            >
                                <motion.div
                                    whileHover={{ y: -8 }}
                                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-[#1DB954]/50 transition-all shadow-xl"
                                >
                                    {/* Event Image */}
                                    <div className="relative aspect-[4/3]">
                                        {event.imageUrl ? (
                                            <img
                                                src={event.imageUrl}
                                                alt={event.title}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-purple-600 to-pink-600"></div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                                        {/* Price Badge */}
                                        <div className="absolute top-4 right-4 px-4 py-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-bold rounded-full shadow-lg">
                                            {event.price}
                                        </div>

                                        {/* Date Badge */}
                                        <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-black/60 backdrop-blur-sm rounded-full">
                                            <Calendar className="w-4 h-4 text-white" />
                                            <span className="text-sm text-white font-medium">{event.date}</span>
                                        </div>
                                    </div>

                                    {/* Event Info */}
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#1DB954] transition-colors">
                                            {event.title}
                                        </h3>
                                        <div className="flex items-center gap-2 text-slate-400 text-sm mb-3">
                                            <MapPin className="w-4 h-4" />
                                            <span>{event.venue}</span>
                                        </div>
                                        <p className="text-slate-300 text-sm">{event.artist}</p>
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>

                    {/* Empty State */}
                    {featuredEvents.length === 0 && (
                        <div className="text-center py-16">
                            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Calendar className="w-10 h-10 text-slate-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">No Events Yet</h3>
                            <p className="text-slate-400 mb-6">Be the first to create an amazing event!</p>
                            <Link
                                href="/auth/organizer/register"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#1DB954] to-[#1ed760] text-white font-bold rounded-full hover:scale-105 transition-all"
                            >
                                Create Event
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-black/40 backdrop-blur-xl border-t border-white/10 py-12">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-10 h-10 bg-gradient-to-br from-[#1DB954] to-[#1ed760] rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                                    </svg>
                                </div>
                                <span className="text-xl font-black text-white">TickEx</span>
                            </div>
                            <p className="text-slate-400 text-sm">
                                Your premier event ticketing platform in Eswatini
                            </p>
                        </div>

                        <div>
                            <h4 className="font-bold text-white mb-4">Events</h4>
                            <ul className="space-y-2 text-sm text-slate-400">
                                <li><a href="#" className="hover:text-white transition-colors">Browse Events</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Categories</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Trending</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-white mb-4">Organizers</h4>
                            <ul className="space-y-2 text-sm text-slate-400">
                                <li><Link href="/auth/organizer/login" className="hover:text-white transition-colors">Organizer Login</Link></li>
                                <li><Link href="/auth/organizer/register" className="hover:text-white transition-colors">Start Selling</Link></li>
                                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-white mb-4">Support</h4>
                            <ul className="space-y-2 text-sm text-slate-400">
                                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Terms & Privacy</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-white/10 pt-8 text-center text-sm text-slate-400">
                        <p>© 2025 TickEx. All rights reserved. Made with ❤️ in Eswatini</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
