"use client";

import { X, Printer, Mail, Ban, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface Booking {
    id: string;
    customer: {
        name: string;
        email: string;
        phone: string;
        initials: string;
        bgColor: string;
    };
    type: "VIP" | "General";
    qty: number;
    date: string;
    time: string;
    amount: number;
    payment: string;
    status: "Confirmed" | "Pending" | "Cancelled";
    checkedIn?: boolean;
}

interface BookingDetailsModalProps {
    booking: Booking | null;
    onClose: () => void;
}

export function BookingDetailsModal({ booking, onClose }: BookingDetailsModalProps) {
    if (!booking) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden"
                >
                    {/* Header */}
                    <div className="px-6 py-4 border-b border-[#e2e8f0] flex items-center justify-between bg-slate-50">
                        <div>
                            <h2 className="text-lg font-bold text-[#0f172a]">Booking Details</h2>
                            <p className="text-sm text-[#64748b] font-mono">{booking.id}</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-slate-200 rounded-full text-[#64748b] transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-6">
                        {/* Status Checker */}
                        <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-[#e2e8f0]">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${booking.status === "Confirmed" ? "bg-green-100 text-green-600" :
                                    booking.status === "Pending" ? "bg-orange-100 text-orange-600" :
                                        "bg-red-100 text-red-600"
                                }`}>
                                {booking.status === "Confirmed" && <CheckCircle className="w-6 h-6" />}
                                {booking.status === "Pending" && <Clock className="w-6 h-6" />}
                                {booking.status === "Cancelled" && <AlertCircle className="w-6 h-6" />}
                            </div>
                            <div>
                                <div className="font-semibold text-[#0f172a]">{booking.status}</div>
                                <div className="text-sm text-[#64748b]">
                                    {booking.status === "Confirmed" ? "Payment received • Ticket issued" :
                                        booking.status === "Pending" ? "Awaiting payment confirmation" :
                                            "Booking cancelled • Refund processed"}
                                </div>
                            </div>
                        </div>

                        {/* Customer Info */}
                        <div>
                            <h3 className="text-xs font-semibold text-[#64748b] uppercase tracking-wider mb-3">Customer Information</h3>
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-full ${booking.customer.bgColor} flex items-center justify-center text-white font-bold text-lg`}>
                                    {booking.customer.initials}
                                </div>
                                <div>
                                    <div className="font-medium text-[#0f172a]">{booking.customer.name}</div>
                                    <div className="text-sm text-[#64748b]">{booking.customer.email}</div>
                                    <div className="text-sm text-[#64748b]">{booking.customer.phone}</div>
                                </div>
                            </div>
                        </div>

                        {/* Order Details */}
                        <div>
                            <h3 className="text-xs font-semibold text-[#64748b] uppercase tracking-wider mb-3">Order Summary</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center py-2 border-b border-[#e2e8f0]">
                                    <div className="text-sm">
                                        <span className="font-medium text-[#0f172a]">{booking.type} Ticket</span>
                                        <span className="text-[#64748b]"> x {booking.qty}</span>
                                    </div>
                                    <div className="font-medium text-[#0f172a]">SZL {booking.amount}</div>
                                </div>
                                <div className="flex justify-between items-center pt-2">
                                    <div className="font-bold text-[#0f172a]">Total Paid</div>
                                    <div className="font-bold text-xl text-[#1DB954]">SZL {booking.amount}</div>
                                </div>
                                <div className="text-xs text-[#64748b] text-right">
                                    Paid via {booking.payment} on {booking.date} at {booking.time}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="p-4 bg-slate-50 border-t border-[#e2e8f0] flex gap-3">
                        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-[#e2e8f0] rounded-lg text-sm font-medium text-[#0f172a] hover:bg-slate-100 transition-colors">
                            <Printer className="w-4 h-4" />
                            Print Ticket
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-[#e2e8f0] rounded-lg text-sm font-medium text-[#0f172a] hover:bg-slate-100 transition-colors">
                            <Mail className="w-4 h-4" />
                            Resend Email
                        </button>
                        {booking.status !== "Cancelled" && (
                            <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50 border border-red-100 rounded-lg text-sm font-medium text-red-600 hover:bg-red-100 transition-colors">
                                <Ban className="w-4 h-4" />
                                Refund
                            </button>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
