"use client";

import { useState } from "react";
import {
    Ticket, Calendar, MapPin, Download, QrCode, Check, Clock, X,
    Shield, Lock, FileText, HelpCircle, ChevronRight, Filter, Search, Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CustomerLayout } from "@/components/layout/CustomerLayout";
import { toast } from "sonner";
import { pdf } from '@react-pdf/renderer';
// @ts-ignore
import bwipjs from 'bwip-js';
import { TicketDocument } from "@/components/tickets/TicketDocument";

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

    const getStatusColor = (status: Order['status']) => {
        switch (status) {
            case 'confirmed':
                return 'bg-success/10 text-success border-success/20';
            case 'pending':
                return 'bg-warning/10 text-warning border-warning/20';
            case 'cancelled':
                return 'bg-error/10 text-error border-error/20';
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
            {/* Header Section */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground mb-2">My Orders</h1>
                        <p className="text-muted-foreground">View and manage your event tickets</p>
                    </div>

                    {/* Trust Badges */}
                    <div className="hidden lg:flex items-center gap-4">
                        <div className="flex items-center gap-2 px-4 py-2 bg-success/10 border border-success/20 rounded-lg">
                            <Shield className="w-5 h-5 text-success" />
                            <span className="text-sm font-medium text-success">Secure Payments</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-info/10 border border-info/20 rounded-lg">
                            <Lock className="w-5 h-5 text-info" />
                            <span className="text-sm font-medium text-info">Protected Data</span>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-card border border-border rounded-xl p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">Total Orders</p>
                                <p className="text-2xl font-bold text-foreground">{stats.total}</p>
                            </div>
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                <Ticket className="w-6 h-6 text-primary" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-card border border-border rounded-xl p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">Confirmed</p>
                                <p className="text-2xl font-bold text-success">{stats.confirmed}</p>
                            </div>
                            <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                                <Check className="w-6 h-6 text-success" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-card border border-border rounded-xl p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">Pending</p>
                                <p className="text-2xl font-bold text-warning">{stats.pending}</p>
                            </div>
                            <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center">
                                <Clock className="w-6 h-6 text-warning" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-card border border-border rounded-xl p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">Total Spent</p>
                                <p className="text-2xl font-bold text-foreground">SZL {stats.totalSpent}</p>
                            </div>
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                <FileText className="w-6 h-6 text-primary" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search orders by event name or order ID..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20"
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <Filter className="w-5 h-5 text-muted-foreground" />
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value as any)}
                            className="px-4 py-2.5 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20"
                        >
                            <option value="all">All Status</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="pending">Pending</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Orders List */}
            {filteredOrders.length === 0 ? (
                <div className="bg-card border border-border rounded-xl p-12 text-center">
                    <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                        <Ticket className="w-10 h-10 text-muted-foreground" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground mb-2">No Orders Found</h2>
                    <p className="text-muted-foreground mb-6">
                        {searchQuery || filterStatus !== 'all'
                            ? 'Try adjusting your search or filters'
                            : 'Start exploring events and book your tickets!'}
                    </p>
                    <a
                        href="/events"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:opacity-90 text-primary-foreground font-semibold rounded-lg transition-all"
                    >
                        Browse Events
                        <ChevronRight className="w-4 h-4" />
                    </a>
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredOrders.map((order, index) => (
                        <motion.div
                            key={order.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                        >
                            <div className="grid md:grid-cols-12 gap-6 p-6">
                                {/* Event Image */}
                                <div className="md:col-span-3">
                                    <div className="aspect-video md:aspect-square rounded-lg overflow-hidden bg-muted">
                                        {order.eventImage ? (
                                            <img
                                                src={order.eventImage}
                                                alt={order.eventTitle}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                                                <Ticket className="w-12 h-12 text-primary-foreground/30" />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Order Details */}
                                <div className="md:col-span-6 space-y-4">
                                    <div>
                                        <div className="flex items-start gap-3 mb-3">
                                            <div className="flex-1">
                                                <h3 className="text-xl font-bold text-foreground mb-1">{order.eventTitle}</h3>
                                                <p className="text-sm text-muted-foreground font-mono">Order #{order.id}</p>
                                            </div>
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.status)}`}>
                                                {getStatusIcon(order.status)}
                                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                            </span>
                                        </div>

                                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar className="w-4 h-4" />
                                                <span>{formatDate(order.eventDate)}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <MapPin className="w-4 h-4" />
                                                <span>{order.eventLocation}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        {order.tickets.map((ticket) => (
                                            <div key={ticket.id} className="flex justify-between items-center text-sm py-2 border-b border-border last:border-0">
                                                <span className="text-muted-foreground">
                                                    {ticket.type} × {ticket.quantity}
                                                </span>
                                                <span className="font-semibold text-foreground">
                                                    SZL {(ticket.price * ticket.quantity).toLocaleString()}
                                                </span>
                                            </div>
                                        ))}
                                        <div className="flex justify-between items-center pt-2">
                                            <span className="font-bold text-foreground">Total</span>
                                            <span className="text-xl font-bold text-primary">
                                                SZL {order.totalAmount.toLocaleString()}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="text-xs text-muted-foreground">
                                        Purchased on {formatDate(order.purchaseDate)} at {formatTime(order.purchaseDate)}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="md:col-span-3 flex flex-col gap-3">
                                    {order.status === 'confirmed' && (
                                        <>
                                            <button
                                                onClick={() => setSelectedOrder(order)}
                                                className="w-full py-3 px-4 bg-primary hover:opacity-90 text-primary-foreground font-semibold rounded-lg transition-all flex items-center justify-center gap-2"
                                            >
                                                <QrCode className="w-4 h-4" />
                                                View Tickets
                                            </button>
                                            <button
                                                onClick={() => handleDownloadPDF(order)}
                                                disabled={downloadingOrderId === order.id}
                                                className="w-full py-3 px-4 border border-border hover:bg-muted text-foreground font-semibold rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {downloadingOrderId === order.id ? (
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                ) : (
                                                    <Download className="w-4 h-4" />
                                                )}
                                                {downloadingOrderId === order.id ? 'Generating...' : 'Download Tickets'}
                                            </button>
                                        </>
                                    )}
                                    {order.status === 'pending' && (
                                        <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg text-center">
                                            <Clock className="w-6 h-6 text-warning mx-auto mb-2" />
                                            <p className="text-xs text-warning font-medium">
                                                Payment pending. Complete payment to receive tickets.
                                            </p>
                                            <button className="mt-3 w-full py-2 bg-warning text-white font-semibold rounded-lg hover:opacity-90 transition-all">
                                                Complete Payment
                                            </button>
                                        </div>
                                    )}
                                    <button className="w-full py-2 px-4 text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-2">
                                        <HelpCircle className="w-4 h-4" />
                                        Need Help?
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

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
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-card rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-border"
                        >
                            <div className="p-6 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
                                <h2 className="text-2xl font-bold mb-1">{selectedOrder.eventTitle}</h2>
                                <p className="text-primary-foreground/90 text-sm">{formatDate(selectedOrder.eventDate)}</p>
                            </div>

                            <div className="p-6 space-y-6">
                                {/* QR Code */}
                                <div className="bg-white border-2 border-border rounded-xl p-6">
                                    <div className="w-48 h-48 mx-auto bg-muted rounded-lg flex items-center justify-center relative">
                                        <QrCode className="w-32 h-32 text-muted-foreground" />
                                        <div className="absolute text-xs text-muted-foreground">Scan at venue</div>
                                    </div>
                                </div>

                                {/* Ticket Details */}
                                <div className="space-y-3">
                                    {selectedOrder.tickets.map((ticket) => (
                                        <div key={ticket.id} className="p-3 bg-muted rounded-lg">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <div className="font-bold text-foreground">{ticket.type}</div>
                                                    <div className="text-sm text-muted-foreground">Quantity: {ticket.quantity}</div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="font-bold text-primary">SZL {ticket.price}</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="text-center text-xs text-muted-foreground">
                                    Order ID: {selectedOrder.id}
                                </div>

                                <button
                                    onClick={() => setSelectedOrder(null)}
                                    className="w-full py-3 bg-muted hover:bg-muted/80 text-foreground font-semibold rounded-xl transition-all"
                                >
                                    Close
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </CustomerLayout>
    );
}
