"use client";

import { useState, useMemo } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { BookingsStats } from "@/components/bookings/BookingsStats";
import { BookingsFilters } from "@/components/bookings/BookingsFilters";
import { BookingsTable } from "@/components/bookings/BookingsTable";
import { SalesIntelligenceSidebar } from "@/components/bookings/SalesIntelligenceSidebar";
import { BookingDetailsModal, Booking } from "@/components/bookings/BookingDetailsModal";
import { parse, isWithinInterval, startOfDay, endOfDay } from "date-fns";

const mockBookings: Booking[] = [
    {
        id: "TIX-8421",
        customer: { name: "John Smith", email: "john.smith@example.com", phone: "+268 7600 1234", initials: "JS", bgColor: "bg-green-600" },
        type: "VIP",
        qty: 2,
        date: "Feb 19, 2025",
        time: "14:32",
        amount: 750,
        payment: "Card",
        status: "Confirmed"
    },
    {
        id: "TIX-8422",
        customer: { name: "Sarah Johnson", email: "sarah.j@example.com", phone: "+268 7600 5678", initials: "SJ", bgColor: "bg-blue-600" },
        type: "General",
        qty: 4,
        date: "Feb 18, 2025",
        time: "09:15",
        amount: 240,
        payment: "PayPal",
        status: "Confirmed"
    },
    {
        id: "TIX-8423",
        customer: { name: "Mike Wilson", email: "mike.w@example.com", phone: "+268 7600 9012", initials: "MW", bgColor: "bg-purple-600" },
        type: "VIP",
        qty: 1,
        date: "Feb 17, 2025",
        time: "16:48",
        amount: 180,
        payment: "Card",
        status: "Pending"
    },
    {
        id: "TIX-8424",
        customer: { name: "Emma Davis", email: "emma.d@example.com", phone: "+268 7600 3456", initials: "ED", bgColor: "bg-orange-600" },
        type: "General",
        qty: 2,
        date: "Feb 16, 2025",
        time: "11:22",
        amount: 50,
        payment: "Cash",
        status: "Confirmed"
    },
    {
        id: "TIX-8425",
        customer: { name: "Tom Brown", email: "tom.b@example.com", phone: "+268 7600 7890", initials: "TB", bgColor: "bg-indigo-600" },
        type: "VIP",
        qty: 3,
        date: "Feb 15, 2025",
        time: "13:05",
        amount: 420,
        payment: "Card",
        status: "Confirmed"
    },
    {
        id: "TIX-8426",
        customer: { name: "Lisa Chen", email: "lisa.c@example.com", phone: "+268 7600 2345", initials: "LC", bgColor: "bg-pink-600" },
        type: "General",
        qty: 2,
        date: "Feb 14, 2025",
        time: "10:30",
        amount: 120,
        payment: "PayPal",
        status: "Cancelled"
    }
];

export default function BookingsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [typeFilter, setTypeFilter] = useState("All");
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

    const filteredBookings = useMemo(() => {
        return mockBookings.filter(booking => {
            // Search Filter
            const matchesSearch =
                booking.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                booking.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                booking.customer.email.toLowerCase().includes(searchQuery.toLowerCase());

            // Status Filter
            const matchesStatus = statusFilter === "All" || booking.status === statusFilter;

            // Type Filter
            const matchesType = typeFilter === "All" || booking.type === typeFilter;

            // Date Filter
            let matchesDate = true;
            if (startDate && endDate) {
                // Parse "Feb 19, 2025" to Date object
                const bookingDate = parse(booking.date, "MMM d, yyyy", new Date());
                matchesDate = isWithinInterval(bookingDate, {
                    start: startOfDay(startDate),
                    end: endOfDay(endDate)
                });
            }

            return matchesSearch && matchesStatus && matchesType && matchesDate;
        });
    }, [searchQuery, statusFilter, typeFilter, startDate, endDate]);

    return (
        <DashboardLayout>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-[#0f172a]">Bookings</h1>
                <p className="text-[#64748b]">Sales intelligence and booking management</p>
            </div>

            <div className="flex flex-col xl:flex-row gap-6">
                <div className="flex-1 min-w-0">
                    <BookingsStats />
                    <BookingsFilters
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        statusFilter={statusFilter}
                        setStatusFilter={setStatusFilter}
                        typeFilter={typeFilter}
                        setTypeFilter={setTypeFilter}
                        startDate={startDate}
                        endDate={endDate}
                        setDateRange={(start, end) => {
                            setStartDate(start);
                            setEndDate(end);
                        }}
                    />
                    <BookingsTable
                        bookings={filteredBookings}
                        onSelectBooking={setSelectedBooking}
                    />
                </div>

                <div className="w-full xl:w-80 flex-shrink-0">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e2e8f0] sticky top-24">
                        <SalesIntelligenceSidebar />
                    </div>
                </div>
            </div>

            <BookingDetailsModal
                booking={selectedBooking}
                onClose={() => setSelectedBooking(null)}
            />
        </DashboardLayout>
    );
}
