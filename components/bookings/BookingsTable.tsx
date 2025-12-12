"use client";

import { Eye, Mail, RotateCcw, MoreVertical, ArrowUpDown } from "lucide-react";
import { Booking } from "./BookingDetailsModal";

interface BookingsTableProps {
    bookings: Booking[];
    onSelectBooking: (booking: Booking) => void;
    loading?: boolean;
}

export function BookingsTable({ bookings, onSelectBooking, loading = false }: BookingsTableProps) {
    if (loading) {
        return (
            <div className="bg-card rounded-xl border border-border overflow-hidden">
                <div className="p-12 flex flex-col items-center justify-center">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-muted-foreground">Loading bookings...</p>
                </div>
            </div>
        );
    }

    if (bookings.length === 0) {
        return (
            <div className="bg-card rounded-xl border border-border p-12 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                    <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-1">No bookings found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filters to find what you&apos;re looking for.</p>
            </div>
        );
    }

    return (
        <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-muted/50 text-muted-foreground font-medium border-b border-border">
                        <tr>
                            <th className="py-3 px-4 w-10">
                                <input type="checkbox" className="rounded border-input text-primary focus:ring-ring" />
                            </th>
                            <th className="py-3 px-4">
                                <div className="flex items-center gap-1 cursor-pointer hover:text-foreground">
                                    BOOKING ID
                                    <ArrowUpDown className="w-3 h-3" />
                                </div>
                            </th>
                            <th className="py-3 px-4">
                                <div className="flex items-center gap-1 cursor-pointer hover:text-foreground">
                                    CUSTOMER
                                    <ArrowUpDown className="w-3 h-3" />
                                </div>
                            </th>
                            <th className="py-3 px-4">TICKET TYPE</th>
                            <th className="py-3 px-4">QTY</th>
                            <th className="py-3 px-4">
                                <div className="flex items-center gap-1 cursor-pointer hover:text-foreground">
                                    DATE & TIME
                                    <ArrowUpDown className="w-3 h-3" />
                                </div>
                            </th>
                            <th className="py-3 px-4">
                                <div className="flex items-center gap-1 cursor-pointer hover:text-foreground">
                                    AMOUNT
                                    <ArrowUpDown className="w-3 h-3" />
                                </div>
                            </th>
                            <th className="py-3 px-4">PAYMENT</th>
                            <th className="py-3 px-4">STATUS</th>
                            <th className="py-3 px-4">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {bookings.map((booking) => (
                            <tr
                                key={booking.id}
                                onClick={() => onSelectBooking(booking)}
                                className="hover:bg-muted/50 transition-colors group cursor-pointer"
                            >
                                <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                                    <input type="checkbox" className="rounded border-input text-primary focus:ring-ring" />
                                </td>
                                <td className="py-3 px-4 font-medium text-primary font-mono">
                                    {booking.id}
                                </td>
                                <td className="py-3 px-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-full ${booking.customer.bgColor} flex items-center justify-center text-white text-xs font-bold`}>
                                            {booking.customer.initials}
                                        </div>
                                        <span className="font-medium text-foreground">{booking.customer.name}</span>
                                    </div>
                                </td>
                                <td className="py-3 px-4 text-foreground">{booking.type}</td>
                                <td className="py-3 px-4 text-foreground">{booking.qty}</td>
                                <td className="py-3 px-4">
                                    <div className="text-foreground">{booking.date}</div>
                                    <div className="text-xs text-muted-foreground">{booking.time}</div>
                                </td>
                                <td className="py-3 px-4 font-medium text-foreground">SZL {booking.amount.toLocaleString()}</td>
                                <td className="py-3 px-4 text-muted-foreground">{booking.payment}</td>
                                <td className="py-3 px-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${booking.status === "Confirmed" ? "bg-success/10 text-success" :
                                        booking.status === "Pending" ? "bg-warning/10 text-warning" :
                                            "bg-error/10 text-error"
                                        }`}>
                                        {booking.status}
                                    </span>
                                </td>
                                <td className="py-3 px-4">
                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); onSelectBooking(booking); }}
                                            className="p-1 hover:bg-muted rounded text-muted-foreground hover:text-foreground title='View'"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={(e) => e.stopPropagation()}
                                            className="p-1 hover:bg-muted rounded text-muted-foreground hover:text-foreground"
                                            title="Email Customer"
                                        >
                                            <Mail className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={(e) => e.stopPropagation()}
                                            className="p-1 hover:bg-muted rounded text-muted-foreground hover:text-foreground"
                                            title="Refund"
                                        >
                                            <RotateCcw className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={(e) => e.stopPropagation()}
                                            className="p-1 hover:bg-muted rounded text-muted-foreground hover:text-foreground"
                                        >
                                            <MoreVertical className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination placeholder */}
            <div className="p-4 border-t border-border flex items-center justify-between text-sm text-muted-foreground">
                <span>Showing {bookings.length} result{bookings.length !== 1 ? 's' : ''}</span>
                <div className="flex gap-1">
                    <button className="px-3 py-1 border border-border rounded hover:bg-muted disabled:opacity-50" disabled>Prev</button>
                    <button className="px-3 py-1 bg-primary text-primary-foreground rounded">1</button>
                    <button className="px-3 py-1 border border-border rounded hover:bg-muted">Next</button>
                </div>
            </div>
        </div>
    );
}

import { Search } from "lucide-react";
