"use client";

import { useState } from "react";
import { Search, MapPin, Calendar, ChevronRight, Star, Ticket, Music, Film, Palette, Theater, TrendingUp, Heart, Share2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LandingPage() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCity, setSelectedCity] = useState("Mbabane");
    const [bookmarkedEvents, setBookmarkedEvents] = useState<number[]>([]);

    const categories = [
        {
            id: "movies",
            title: "NEW MOVIES",
            color: "from-red-500 to-red-600",
            icon: Film,
            image: "🎬"
        },
        {
            id: "standup",
            title: "STAND-UP",
            color: "from-yellow-400 to-yellow-500",
            icon: Star,
            image: "🎤"
        },
        {
            id: "musical",
            title: "MUSICAL",
            color: "from-cyan-400 to-cyan-500",
            icon: Music,
            image: "🎵"
        },
        {
            id: "theater",
            title: "THEATER",
            color: "from-orange-400 to-orange-500",
            icon: Theater,
            image: "🎭"
        },
        {
            id: "exhibitions",
            title: "EXHIBITIONS",
            color: "from-purple-500 to-purple-600",
            icon: Palette,
            image: "🎨"
        }
    ];

    const featuredEvents = [
        {
            id: 1,
            title: "Neon Dreams Festival",
            artist: "Various Artists",
            date: "March 15, 2025",
            time: "19:00",
            venue: "Central Stadium",
            price: "From SZL 150",
            image: "bg-gradient-to-br from-green-400 to-emerald-600",
            category: "Musical"
        },
        {
            id: 2,
            title: "Comedy Night Live",
            artist: "Top Comedians",
            date: "March 20, 2025",
            time: "20:00",
            venue: "Mavuso Trade Centre",
            price: "From SZL 200",
            image: "bg-gradient-to-br from-yellow-400 to-orange-500",
            category: "Stand-up"
        },
        {
            id: 3,
            title: "Art & Culture Expo",
            artist: "Local Artists",
            date: "March 25, 2025",
            time: "10:00",
            venue: "National Museum",
            price: "From SZL 50",
            image: "bg-gradient-to-br from-purple-400 to-pink-500",
            category: "Exhibition"
        }
    ];

    const trendingEvents = [
        { name: "Jazz in the Park", sales: "1.2K", trend: "+15%" },
        { name: "Rock Festival 2025", sales: "2.5K", trend: "+28%" },
        { name: "Classical Evening", sales: "850", trend: "+12%" },
        { name: "Hip Hop Showcase", sales: "1.8K", trend: "+22%" }
    ];

    // Handler Functions
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            toast.success(`Searching for "${searchQuery}"...`);
            // In production: router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    const handleCategoryClick = (categoryId: string, categoryTitle: string) => {
        toast.info(`Browsing ${categoryTitle}`);
        // In production: router.push(`/events/category/${categoryId}`);
    };

    const handleEventClick = (eventId: number, eventTitle: string) => {
        toast.info(`Opening ${eventTitle}...`);
        // In production: router.push(`/events/${eventId}`);
    };

    const handleBuyTicket = (e: React.MouseEvent, eventId: number, eventTitle: string) => {
        e.stopPropagation();
        toast.success(`Redirecting to checkout for ${eventTitle}...`);
        // In production: router.push(`/checkout/${eventId}`);
    };

    const handleBookmark = (e: React.MouseEvent, eventId: number) => {
        e.stopPropagation();
        if (bookmarkedEvents.includes(eventId)) {
            setBookmarkedEvents(bookmarkedEvents.filter(id => id !== eventId));
            toast.info("Removed from bookmarks");
        } else {
            setBookmarkedEvents([...bookmarkedEvents, eventId]);
            toast.success("Added to bookmarks");
        }
    };

    const handleShare = (e: React.MouseEvent, eventTitle: string) => {
        e.stopPropagation();
        if (navigator.share) {
            navigator.share({
                title: eventTitle,
                text: `Check out ${eventTitle} on TickEx!`,
                url: window.location.href
            }).then(() => {
                toast.success("Shared successfully!");
            }).catch(() => {
                toast.error("Sharing cancelled");
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            toast.success("Link copied to clipboard!");
        }
    };

    const handleTrendingClick = (eventName: string) => {
        toast.info(`Opening ${eventName}...`);
        // In production: router.push(`/events/${eventName}`);
    };

    const handleCityChange = (city: string) => {
        setSelectedCity(city);
        toast.success(`Switched to ${city}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#1DB954] to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-200 group-hover:shadow-green-300 transition-all group-hover:scale-105">
                                <Ticket className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-2xl font-black text-[#0f172a]">
                                TICK<span className="text-[#1DB954]">EX</span>
                            </span>
                        </Link>

                        {/* City Selector */}
                        <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-lg cursor-pointer hover:bg-slate-200 transition-colors">
                            <MapPin className="w-4 h-4 text-[#64748b]" />
                            <select
                                value={selectedCity}
                                onChange={(e) => handleCityChange(e.target.value)}
                                className="bg-transparent text-sm font-medium text-[#0f172a] outline-none cursor-pointer"
                            >
                                <option>Mbabane</option>
                                <option>Manzini</option>
                                <option>Lobamba</option>
                                <option>Siteki</option>
                            </select>
                        </div>

                        {/* Search Bar */}
                        <form onSubmit={handleSearch} className="flex-1 max-w-xl mx-8">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94a3b8]" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Events, artists, places"
                                    className="w-full pl-12 pr-4 py-3 bg-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1DB954]/20 focus:bg-white transition-all"
                                />
                            </div>
                        </form>

                        {/* Nav Links */}
                        <nav className="flex items-center gap-6">
                            <Link href="/bookmarks" className="text-sm font-medium text-[#64748b] hover:text-[#0f172a] transition-colors">
                                Bookmarks
                            </Link>
                            <Link href="/my-tickets" className="text-sm font-medium text-[#64748b] hover:text-[#0f172a] transition-colors">
                                My Tickets
                            </Link>
                            <Link href="/dashboard" className="px-6 py-2.5 bg-[#1DB954] hover:bg-[#1ed760] text-white font-semibold rounded-lg transition-all shadow-lg shadow-green-200 hover:shadow-green-300 hover:scale-105">
                                Dashboard
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Hero Section with Categories */}
            <section className="relative overflow-hidden">
                {/* Animated Wave Background */}
                <div className="absolute inset-0">
                    <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="wave-gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#1DB954" stopOpacity="0.1" />
                                <stop offset="50%" stopColor="#10b981" stopOpacity="0.15" />
                                <stop offset="100%" stopColor="#1DB954" stopOpacity="0.1" />
                            </linearGradient>
                            <linearGradient id="wave-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#10b981" stopOpacity="0.08" />
                                <stop offset="50%" stopColor="#1DB954" stopOpacity="0.12" />
                                <stop offset="100%" stopColor="#10b981" stopOpacity="0.08" />
                            </linearGradient>
                        </defs>

                        {/* Wave 1 */}
                        <path
                            fill="url(#wave-gradient-1)"
                            d="M0,96L48,112C96,128,192,160,288,165.3C384,171,480,149,576,128C672,107,768,85,864,90.7C960,96,1056,128,1152,133.3C1248,139,1344,117,1392,106.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                            className="animate-wave-slow"
                        />

                        {/* Wave 2 */}
                        <path
                            fill="url(#wave-gradient-2)"
                            d="M0,192L48,197.3C96,203,192,213,288,202.7C384,192,480,160,576,154.7C672,149,768,171,864,181.3C960,192,1056,192,1152,181.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                            className="animate-wave-fast"
                        />
                    </svg>
                </div>

                <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
                    {/* Hero Title */}
                    <div className="text-center mb-12">
                        <h1 className="text-6xl font-black text-[#0f172a] mb-4 tracking-tight">
                            CHOOSE WHERE TO GO
                        </h1>
                        <p className="text-xl text-[#64748b] font-medium">
                            Discover amazing events happening in {selectedCity}
                        </p>
                    </div>

                    {/* Category Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {categories.map((category) => (
                            <div
                                key={category.id}
                                onClick={() => handleCategoryClick(category.id, category.title)}
                                className="group relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${category.color}`} />

                                {/* 3D Character Placeholder */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-8xl transform group-hover:scale-110 transition-transform duration-300">
                                        {category.image}
                                    </div>
                                </div>

                                {/* Title */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                                    <h3 className="text-2xl font-black text-white tracking-tight">
                                        {category.title}
                                    </h3>
                                </div>

                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Events */}
            <section className="max-w-7xl mx-auto px-6 py-16">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-4xl font-black text-[#0f172a]">Featured Events</h2>
                    <button className="flex items-center gap-2 text-[#1DB954] font-semibold hover:gap-3 transition-all">
                        View All <ChevronRight className="w-5 h-5" />
                    </button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredEvents.map((event) => (
                        <div
                            key={event.id}
                            onClick={() => handleEventClick(event.id, event.title)}
                            className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
                        >
                            {/* Event Image */}
                            <div className={`h-64 ${event.image} relative`}>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                                <div className="absolute top-4 right-4 flex gap-2">
                                    <button
                                        onClick={(e) => handleBookmark(e, event.id)}
                                        className={`p-2 rounded-full backdrop-blur-sm transition-all ${bookmarkedEvents.includes(event.id)
                                            ? 'bg-red-500 text-white'
                                            : 'bg-white/90 text-[#64748b] hover:text-red-500'
                                            }`}
                                    >
                                        <Heart className={`w-4 h-4 ${bookmarkedEvents.includes(event.id) ? 'fill-current' : ''}`} />
                                    </button>
                                    <button
                                        onClick={(e) => handleShare(e, event.title)}
                                        className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-[#64748b] hover:text-[#1DB954] transition-colors"
                                    >
                                        <Share2 className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-[#0f172a]">
                                    {event.category}
                                </div>
                                <div className="absolute bottom-4 left-4 right-4">
                                    <h3 className="text-2xl font-black text-white mb-1">{event.title}</h3>
                                    <p className="text-sm text-white/80 font-medium">{event.artist}</p>
                                </div>
                            </div>

                            {/* Event Details */}
                            <div className="p-6">
                                <div className="space-y-3 mb-4">
                                    <div className="flex items-center gap-3 text-sm text-[#64748b]">
                                        <Calendar className="w-4 h-4" />
                                        <span>{event.date} at {event.time}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-[#64748b]">
                                        <MapPin className="w-4 h-4" />
                                        <span>{event.venue}</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-lg font-bold text-[#0f172a]">{event.price}</span>
                                    <button
                                        onClick={(e) => handleBuyTicket(e, event.id, event.title)}
                                        className="px-6 py-2.5 bg-[#1DB954] hover:bg-[#1ed760] text-white font-semibold rounded-lg transition-all shadow-md shadow-green-200 hover:shadow-green-300 group-hover:scale-105"
                                    >
                                        Buy Ticket
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Trending Section */}
            <section className="max-w-7xl mx-auto px-6 py-16">
                <div className="bg-white rounded-3xl p-8 shadow-xl">
                    <div className="flex items-center gap-3 mb-6">
                        <TrendingUp className="w-6 h-6 text-[#1DB954]" />
                        <h2 className="text-3xl font-black text-[#0f172a]">Trending Now</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {trendingEvents.map((event, index) => (
                            <div
                                key={index}
                                onClick={() => handleTrendingClick(event.name)}
                                className="p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl hover:shadow-lg transition-all cursor-pointer group"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <span className="text-3xl font-black text-[#1DB954]">#{index + 1}</span>
                                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                                        {event.trend}
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-[#0f172a] mb-2 group-hover:text-[#1DB954] transition-colors">
                                    {event.name}
                                </h3>
                                <p className="text-sm text-[#64748b]">{event.sales} tickets sold</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="max-w-7xl mx-auto px-6 py-16">
                <div className="bg-gradient-to-br from-[#1DB954] to-emerald-600 rounded-3xl p-12 text-center shadow-2xl shadow-green-200">
                    <h2 className="text-5xl font-black text-white mb-4">
                        Start Selling Your Events
                    </h2>
                    <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                        Join thousands of event organizers using TickEx to sell tickets and manage their events
                    </p>
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#1DB954] font-bold rounded-xl hover:bg-slate-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
                    >
                        Get Started Free
                        <ChevronRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#0f172a] text-white py-12">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 bg-[#1DB954] rounded-lg flex items-center justify-center">
                                    <Ticket className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-xl font-black">TICKEX</span>
                            </div>
                            <p className="text-sm text-slate-400">
                                Your premier event ticketing platform in Eswatini
                            </p>
                        </div>

                        <div>
                            <h4 className="font-bold mb-4">Events</h4>
                            <ul className="space-y-2 text-sm text-slate-400">
                                <li><a href="#" className="hover:text-white transition-colors">Browse Events</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Categories</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Trending</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold mb-4">Organizers</h4>
                            <ul className="space-y-2 text-sm text-slate-400">
                                <li><a href="#" className="hover:text-white transition-colors">Create Event</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Resources</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold mb-4">Support</h4>
                            <ul className="space-y-2 text-sm text-slate-400">
                                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Terms & Privacy</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-400">
                        <p>© 2025 TickEx. All rights reserved. Made with ❤️ in Eswatini</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
