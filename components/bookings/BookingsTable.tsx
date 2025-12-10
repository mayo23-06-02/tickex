"use client";

import { Eye, Mail, RotateCcw, MoreVertical, ArrowUpDown } from "lucide-react";
import { Booking } from "./BookingDetailsModal";

interface BookingsTableProps {
    bookings: Booking[];
    onSelectBooking: (booking: Booking) => void;
}

export function BookingsTable({ bookings, onSelectBooking }: BookingsTableProps) {
    if (bookings.length === 0) {
        return (
            <div className="bg-white rounded-xl border border-[#e2e8f0] p-12 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                    <Search className="w-8 h-8 text-[#94a3b8]" />
                </div>
                <h3 className="text-lg font-medium text-[#0f172a] mb-1">No bookings found</h3>
                <p className="text-[#64748b]">Try adjusting your search or filters to find what you&apos;re looking for.</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl border border-[#e2e8f0] overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 text-[#64748b] font-medium border-b border-[#e2e8f0]">
                        <tr>
                            <th className="py-3 px-4 w-10">
                                <input type="checkbox" className="rounded border-gray-300 text-[#1DB954] focus:ring-[#1DB954]" />
                            </th>
                            <th className="py-3 px-4">
                                <div className="flex items-center gap-1 cursor-pointer hover:text-[#0f172a]">
                                    BOOKING ID
                                    <ArrowUpDown className="w-3 h-3" />
                                </div>
                            </th>
                            <th className="py-3 px-4">
                                <div className="flex items-center gap-1 cursor-pointer hover:text-[#0f172a]">
                                    CUSTOMER
                                    <ArrowUpDown className="w-3 h-3" />
                                </div>
                            </th>
                            <th className="py-3 px-4">TICKET TYPE</th>
                            <th className="py-3 px-4">QTY</th>
                            <th className="py-3 px-4">
                                <div className="flex items-center gap-1 cursor-pointer hover:text-[#0f172a]">
                                    DATE & TIME
                                    <ArrowUpDown className="w-3 h-3" />
                                </div>
                            </th>
                            <th className="py-3 px-4">
                                <div className="flex items-center gap-1 cursor-pointer hover:text-[#0f172a]">
                                    AMOUNT
                                    <ArrowUpDown className="w-3 h-3" />
                                </div>
                            </th>
                            <th className="py-3 px-4">PAYMENT</th>
                            <th className="py-3 px-4">STATUS</th>
                            <th className="py-3 px-4">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e2e8f0]">
                        {bookings.map((booking) => (
                            <tr
                                key={booking.id}
                                onClick={() => onSelectBooking(booking)}
                                className="hover:bg-slate-50 transition-colors group cursor-pointer"
                            >
                                <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                                    <input type="checkbox" className="rounded border-gray-300 text-[#1DB954] focus:ring-[#1DB954]" />
                                </td>
                                <td className="py-3 px-4 font-medium text-[#1DB954] font-mono">
                                    {booking.id}
                                </td>
                                <td className="py-3 px-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-full ${booking.customer.bgColor} flex items-center justify-center text-white text-xs font-bold`}>
                                            {booking.customer.initials}
                                        </div>
                                        <span className="font-medium text-[#0f172a]">{booking.customer.name}</span>
                                    </div>
                                </td>
                                <td className="py-3 px-4 text-[#0f172a]">{booking.type}</td>
                                <td className="py-3 px-4 text-[#0f172a]">{booking.qty}</td>
                                <td className="py-3 px-4">
                                    <div className="text-[#0f172a]">{booking.date}</div>
                                    <div className="text-xs text-[#64748b]">{booking.time}</div>
                                </td>
                                <td className="py-3 px-4 font-medium text-[#0f172a]">SZL {booking.amount}</td>
                                <td className="py-3 px-4 text-[#64748b]">{booking.payment}</td>
                                <td className="py-3 px-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${booking.status === "Confirmed" ? "bg-green-100 text-green-800" :
                                        booking.status === "Pending" ? "bg-orange-100 text-orange-800" :
                                            "bg-red-100 text-red-800"
                                        }`}>
                                        {booking.status}
                                    </span>
                                </td>
                                <td className="py-3 px-4">
                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); onSelectBooking(booking); }}
                                            className="p-1 hover:bg-slate-200 rounded text-[#64748b] hover:text-[#0f172a] title='View'"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={(e) => e.stopPropagation()}
                                            className="p-1 hover:bg-slate-200 rounded text-[#64748b] hover:text-[#0f172a]"
                                            title="Email Customer"
                                        >
                                            <Mail className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={(e) => e.stopPropagation()}
                                            className="p-1 hover:bg-slate-200 rounded text-[#64748b] hover:text-[#0f172a]"
                                            title="Refund"
                                        >
                                            <RotateCcw className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={(e) => e.stopPropagation()}
                                            className="p-1 hover:bg-slate-200 rounded text-[#64748b] hover:text-[#0f172a]"
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
            <div className="p-4 border-t border-[#e2e8f0] flex items-center justify-between text-sm text-[#64748b]">
                <span>Showing {bookings.length} result{bookings.length !== 1 ? 's' : ''}</span>
                <div className="flex gap-1">
                    <button className="px-3 py-1 border border-[#e2e8f0] rounded hover:bg-slate-50 disabled:opacity-50" disabled>Prev</button>
                    <button className="px-3 py-1 bg-[#1DB954] text-white rounded">1</button>
                    <button className="px-3 py-1 border border-[#e2e8f0] rounded hover:bg-slate-50">Next</button>
                </div>
            </div>
        </div>
    );
}

import { Search } from "lucide-react";
