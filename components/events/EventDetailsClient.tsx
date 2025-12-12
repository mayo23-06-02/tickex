"use client";

import { useState } from "react";
import { Calendar, MapPin, Share2, ArrowLeft, Loader2, Minus, Plus, Ticket } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { checkout } from "@/app/actions/payments";
import { motion } from "framer-motion";
import { CustomerLayout } from "@/components/layout/CustomerLayout";

interface TicketType {
    id: string;
    name: string;
    price: number;
    description: string;
    remaining: number;
}

interface EventDetails {
    id: string;
    title: string;
    description: string;
    location: { name: string; address: string };
    startDate: string;
    endDate: string;
    imageUrl?: string;
    category: string;
    organizerName: string;
    tickets: TicketType[];
}

interface Props {
    event: EventDetails;
    currentUserId?: string;
}

export default function EventDetailsClient({ event, currentUserId }: Props) {
    const router = useRouter();
    const [selectedTickets, setSelectedTickets] = useState<{ [key: string]: number }>({});
    const [isCheckingOut, setIsCheckingOut] = useState(false);

    const handleTicketChange = (ticketId: string, delta: number) => {
        const currentQty = selectedTickets[ticketId] || 0;
        const ticket = event.tickets.find(t => t.id === ticketId);

        if (!ticket) return;

        const newQty = Math.max(0, Math.min(ticket.remaining, currentQty + delta));

        setSelectedTickets(prev => ({
            ...prev,
            [ticketId]: newQty
        }));
    };

    const totalAmount = event.tickets.reduce((sum, ticket) => {
        return sum + (ticket.price * (selectedTickets[ticket.id] || 0));
    }, 0);

    const totalCount = Object.values(selectedTickets).reduce((a, b) => a + b, 0);

    const handleCheckout = async () => {
        if (totalCount === 0) {
            toast.error("Please select at least one ticket");
            return;
        }

        // Redirect to checkout page with selected tickets
        const ticketsParam = encodeURIComponent(JSON.stringify(selectedTickets));
        router.push(`/checkout?eventId=${event.id}&tickets=${ticketsParam}`);
    };

    // Date formatting
    const startDate = new Date(event.startDate).toLocaleDateString('en-US', {
        weekday: 'long', month: 'long', day: 'numeric'
    });
    const startTime = new Date(event.startDate).toLocaleTimeString('en-US', {
        hour: '2-digit', minute: '2-digit'
    });

    return (
        <CustomerLayout>
            <div className="min-h-screen bg-background">
                {/* Header Image */}
                <div className="relative h-[40vh] md:h-[50vh] bg-slate-900">
                    {event.imageUrl ? (
                        <img
                            src={event.imageUrl}
                            alt={event.title}
                            className="w-full h-full object-cover opacity-80"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#1DB954] to-emerald-900 flex items-center justify-center">
                            <Ticket className="w-24 h-24 text-white/20" />
                        </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                    <div className="absolute top-6 left-6 z-10">
                        <button
                            onClick={() => router.back()}
                            className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all"
                        >
                            <ArrowLeft className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div>
                                <span className="inline-block px-3 py-1 bg-[#1DB954] text-white text-xs font-bold rounded-full mb-4 uppercase tracking-wider">
                                    {event.category}
                                </span>
                                <h1 className="text-4xl md:text-5xl font-black text-white mb-2 shadow-sm">
                                    {event.title}
                                </h1>
                                <p className="text-white/80 font-medium text-lg">
                                    by {event.organizerName}
                                </p>
                            </div>
                            <button className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all">
                                <Share2 className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>

                <main className="max-w-7xl mx-auto px-6 py-12">
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-12">
                            {/* Key Details */}
                            <div className="grid sm:grid-cols-2 gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-white rounded-xl shadow-sm text-[#1DB954]">
                                        <Calendar className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-[#0f172a] mb-1">Date & Time</h3>
                                        <p className="text-sm text-slate-600 font-medium">{startDate}</p>
                                        <p className="text-sm text-slate-500">{startTime}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-white rounded-xl shadow-sm text-[#1DB954]">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-[#0f172a] mb-1">Location</h3>
                                        <p className="text-sm text-slate-600 font-medium">{event.location.name}</p>
                                        <p className="text-sm text-slate-500">{event.location.address}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <h2 className="text-2xl font-bold text-[#0f172a] mb-4">About This Event</h2>
                                <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed whitespace-pre-line">
                                    {event.description}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar / Ticket Selection */}
                        <div className="relative">
                            <div className="sticky top-24 bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
                                <div className="p-6 bg-[#0f172a] text-white">
                                    <h3 className="text-xl font-bold">Select Tickets</h3>
                                    <p className="text-slate-400 text-sm">Choose your perfect spot</p>
                                </div>

                                <div className="p-6 space-y-6">
                                    {event.tickets.map((ticket) => (
                                        <div key={ticket.id} className="pb-6 border-b border-slate-100 last:border-0 last:pb-0">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h4 className="font-bold text-[#0f172a]">{ticket.name}</h4>
                                                    <p className="text-sm text-slate-500">{ticket.description}</p>
                                                </div>
                                                <div className="text-right">
                                                    <div className="font-bold text-[#1DB954] text-lg">SZL {ticket.price}</div>
                                                    <div className="text-xs text-slate-400">{ticket.remaining} left</div>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-end gap-4 mt-3">
                                                <button
                                                    onClick={() => handleTicketChange(ticket.id, -1)}
                                                    disabled={!selectedTickets[ticket.id]}
                                                    className="w-8 h-8 flex items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:border-[#1DB954] hover:text-[#1DB954] disabled:opacity-30 disabled:hover:border-slate-200 disabled:hover:text-slate-600 transition-colors"
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="font-bold w-4 text-center">{selectedTickets[ticket.id] || 0}</span>
                                                <button
                                                    onClick={() => handleTicketChange(ticket.id, 1)}
                                                    disabled={ticket.remaining === 0}
                                                    className="w-8 h-8 flex items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:border-[#1DB954] hover:text-[#1DB954] disabled:opacity-30 transition-colors"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="p-6 bg-slate-50 border-t border-slate-100">
                                    <div className="flex justify-between items-center mb-6">
                                        <span className="text-slate-600 font-medium">Total</span>
                                        <span className="text-2xl font-black text-[#0f172a]">SZL {totalAmount}</span>
                                    </div>

                                    <button
                                        onClick={handleCheckout}
                                        disabled={totalCount === 0 || isCheckingOut}
                                        className="w-full py-4 bg-[#1DB954] hover:bg-[#1ed760] disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg shadow-green-200 hover:shadow-green-300 transition-all flex items-center justify-center gap-2"
                                    >
                                        {isCheckingOut ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                Get Tickets
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </CustomerLayout>
    );
}
