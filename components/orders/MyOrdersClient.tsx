"use client";

import { useState } from "react";
import {
    Ticket, Calendar, MapPin, Download, QrCode, Check, Clock, X,
    Shield, Lock, FileText, HelpCircle, ChevronRight, Filter, Search, Loader2, ArrowUpRight, Menu
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { pdf } from '@react-pdf/renderer';
// @ts-ignore
import bwipjs from 'bwip-js';
import { TicketDocument } from "@/components/tickets/TicketDocument";
import Link from "next/link";
import { CustomerLayout } from "../layout/CustomerLayout";

interface Order {
    id: string;
    eventTitle: string;
    eventDate: string;
    eventLocation: string;
    eventImage?: string;
    tickets: {
        id: string;
        type: string;
        quantity: number;
        price: number;
    }[];
    totalAmount: number;
    status: 'confirmed' | 'pending' | 'cancelled';
    purchaseDate: string;
    qrCode?: string;
    individualTickets?: {
        id: string;
        code: string;
        type: string;
        status: string;
    }[];
}

interface MyOrdersClientProps {
    initialOrders?: Order[];
    userName?: string;
}

export default function MyOrdersClient({ initialOrders = [], userName }: MyOrdersClientProps) {
    const [orders] = useState<Order[]>(initialOrders);
    const [downloadingOrderId, setDownloadingOrderId] = useState<string | null>(null);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [filterStatus, setFilterStatus] = useState<'all' | 'confirmed' | 'pending' | 'cancelled'>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const getStatusColor = (status: Order['status']) => {
        switch (status) {
            case 'confirmed':
                return 'bg-green-100 text-green-700 border-green-200';
            case 'pending':
                return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'cancelled':
                return 'bg-red-100 text-red-700 border-red-200';
        }
    };

    const getStatusIcon = (status: Order['status']) => {
        switch (status) {
            case 'confirmed':
                return <Check className="w-4 h-4" />;
            case 'pending':
                return <Clock className="w-4 h-4" />;
            case 'cancelled':
                return <X className="w-4 h-4" />;
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const filteredOrders = orders.filter(order => {
        const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
        const matchesSearch = order.eventTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.id.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const stats = {
        total: orders.length,
        confirmed: orders.filter(o => o.status === 'confirmed').length,
        pending: orders.filter(o => o.status === 'pending').length,
        totalSpent: orders.reduce((sum, o) => sum + o.totalAmount, 0)
    };

    const handleDownloadPDF = async (order: Order) => {
        // ... (existing logic same as before, simplified for brevity as logic doesn't change with theme)
        try {
            setDownloadingOrderId(order.id);
            toast.loading("Generating tickets...");

            // Generate Barcodes
            const barcodes: Record<string, string> = {};

            // If individualTickets missing (mock data), generate dummy ones based on aggregated count
            let ticketsToProcess = order.individualTickets || [];

            if (ticketsToProcess.length === 0) {
                // Fallback for mock/legacy data: simulate individual tickets
                let counter = 1;
                order.tickets.forEach(t => {
                    for (let i = 0; i < t.quantity; i++) {
                        ticketsToProcess.push({
                            id: `${order.id}-${counter}`,
                            code: `${order.id}-TICK-${counter}`,
                            type: t.type,
                            status: 'valid'
                        });
                        counter++;
                    }
                });
                // Update the order object copy to pass to document
                order = { ...order, individualTickets: ticketsToProcess };
            }

            // Generate images
            for (const ticket of ticketsToProcess) {
                if (!ticket.code) continue;

                const canvas = document.createElement('canvas');
                try {
                    bwipjs.toCanvas(canvas, {
                        bcid: 'code128',       // Barcode type
                        text: ticket.code,     // Text to encode
                        scale: 3,              // 3x scaling factor
                        height: 10,            // Bar height, in millimeters
                        includetext: true,     // Show human-readable text
                        textxalign: 'center',  // Always good to set this
                    });
                    barcodes[ticket.code] = canvas.toDataURL('image/png');
                } catch (e) {
                    console.error("Barcode generation error for", ticket.code, e);
                }
            }

            // Generate PDF Blob
            const blob = await pdf(
                <TicketDocument
                    order={order}
                    barcodes={barcodes}
                    userName={userName}
                />
            ).toBlob();

            // Trigger Download
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `Tickets-${order.id}.pdf`;
            document.body.appendChild(link); // Required for Firefox
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            toast.dismiss();
            toast.success("Tickets downloaded successfully");
        } catch (error) {
            console.error("Download failed:", error);
            toast.dismiss();
            toast.error("Failed to generate tickets");
        } finally {
            setDownloadingOrderId(null);
        }
    };

    return (

        <CustomerLayout>
            <div className="max-w-7xl mx-auto px-6 lg:px-12 py-32">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <h1 className="text-4xl font-bold mb-2 text-slate-900">My <span className="text-primary">Orders</span></h1>
                        <p className="text-slate-500">Manage your tickets and upcoming events</p>
                    </div>

                    {/* Stats Row */}
                    <div className="flex gap-4 overflow-x-auto pb-2">
                        <div className="bg-white border border-slate-200 p-4 rounded-xl min-w-[140px] shadow-sm">
                            <div className="text-slate-500 text-xs uppercase font-bold mb-1">Total Orders</div>
                            <div className="text-2xl font-bold text-slate-900">{stats.total}</div>
                        </div>
                        <div className="bg-white border border-slate-200 p-4 rounded-xl min-w-[140px] shadow-sm">
                            <div className="text-slate-500 text-xs uppercase font-bold mb-1">Spent</div>
                            <div className="text-2xl font-bold text-slate-900">SZL {stats.totalSpent}</div>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white p-4 rounded-2xl mb-8 flex flex-col md:flex-row gap-4 border border-slate-200 shadow-sm">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search by event or order ID..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-primary font-medium"
                        />
                    </div>
                    <div className="relative">
                        <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value as any)}
                            className="h-full pl-12 pr-8 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 appearance-none cursor-pointer focus:outline-none focus:border-primary font-medium"
                        >
                            <option value="all">All Status</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="pending">Pending</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                        <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 rotate-90 pointer-events-none" />
                    </div>
                </div>

                {/* Orders List */}
                <div className="space-y-6">
                    {filteredOrders.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm">
                            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Ticket className="w-10 h-10 text-slate-400" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">No orders found</h3>
                            <p className="text-slate-500 mb-6">Looks like you haven't booked any events yet.</p>
                            <Link href="/events" className="px-8 py-3 bg-primary hover:bg-[#d90d6b] text-white font-bold rounded-full inline-flex items-center gap-2">
                                Browse Events <ArrowUpRight className="w-4 h-4" />
                            </Link>
                        </div>
                    ) : (
                        filteredOrders.map((order, index) => (
                            <motion.div
                                key={order.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white border border-slate-200 rounded-3xl p-6 hover:border-primary/30 transition-all group shadow-sm hover:shadow-md"
                            >
                                <div className="grid md:grid-cols-12 gap-8">
                                    {/* Image */}
                                    <div className="md:col-span-3">
                                        <div className="aspect-video md:aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 relative">
                                            {order.eventImage ? (
                                                <img src={order.eventImage} alt={order.eventTitle} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-slate-50 text-slate-300">
                                                    <Ticket className="w-12 h-12" />
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Info */}
                                    <div className="md:col-span-6 flex flex-col justify-center">
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 ${getStatusColor(order.status)}`}>
                                                {getStatusIcon(order.status)}
                                                {order.status.toUpperCase()}
                                            </span>
                                            <span className="text-slate-400 text-sm font-mono">#{order.id.slice(0, 8)}</span>
                                        </div>

                                        <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">{order.eventTitle}</h3>

                                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-slate-500 text-sm mb-4">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-primary" />
                                                {formatDate(order.eventDate)}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MapPin className="w-4 h-4 text-primary" />
                                                {order.eventLocation}
                                            </div>
                                        </div>

                                        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                                            {order.tickets.map(t => (
                                                <div key={t.id} className="flex justify-between items-center text-sm py-1">
                                                    <span className="text-slate-600">{t.quantity}x {t.type}</span>
                                                    <span className="font-bold text-slate-900">SZL {t.price * t.quantity}</span>
                                                </div>
                                            ))}
                                            <div className="border-t border-slate-200 mt-2 pt-2 flex justify-between items-center">
                                                <span className="text-slate-500 font-bold">Total</span>
                                                <span className="text-primary font-bold text-lg">SZL {order.totalAmount}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="md:col-span-3 flex flex-col justify-center gap-3">
                                        {order.status === 'confirmed' && (
                                            <>
                                                <button
                                                    onClick={() => setSelectedOrder(order)}
                                                    className="w-full py-4 bg-primary hover:bg-[#d90d6b] text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                                                >
                                                    <QrCode className="w-5 h-5" /> View Ticket
                                                </button>
                                                <button
                                                    onClick={() => handleDownloadPDF(order)}
                                                    disabled={downloadingOrderId === order.id}
                                                    className="w-full py-4 bg-white border border-slate-300 hover:border-primary text-slate-700 hover:text-primary font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                                                >
                                                    {downloadingOrderId === order.id ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
                                                    {downloadingOrderId === order.id ? 'Generating...' : 'Download PDF'}
                                                </button>
                                            </>
                                        )}
                                        {order.status === 'pending' && (
                                            <button className="w-full py-4 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-xl transition-all">
                                                Complete Payment
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>

            {/* Ticket Modal */}
            <AnimatePresence>
                {selectedOrder && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedOrder(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white w-full max-w-md rounded-[2rem] overflow-hidden border border-slate-200 shadow-2xl"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="bg-gradient-to-r from-primary to-[#9926f0] p-8 text-center relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                                <h3 className="text-2xl font-bold text-white mb-1 relative z-10">{selectedOrder.eventTitle}</h3>
                                <p className="text-white/80 relative z-10">{formatDate(selectedOrder.eventDate)} | {selectedOrder.eventLocation}</p>
                            </div>

                            <div className="p-8">
                                <div className="bg-slate-50 rounded-2xl p-6 mb-8 text-center shadow-inner border border-slate-100">
                                    <QrCode className="w-40 h-40 mx-auto text-slate-900 mb-4" />
                                    <p className="text-slate-500 text-xs font-mono uppercase tracking-widest">Scan this code at entrance</p>
                                </div>

                                <div className="space-y-4 mb-8">
                                    {selectedOrder.tickets.map(t => (
                                        <div key={t.id} className="flex justify-between items-center text-sm border-b border-slate-100 pb-2">
                                            <span className="text-slate-500 text-lg">{t.quantity}x {t.type}</span>
                                            <span className="text-slate-900 font-bold text-lg">SZL {t.price * t.quantity}</span>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={() => setSelectedOrder(null)}
                                    className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-all"
                                >
                                    Close Ticket
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </CustomerLayout>
    );
}
