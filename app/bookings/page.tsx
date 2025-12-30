"use client";

import { useState, useMemo, useEffect } from "react";
import DashboardLayout from "@/components/shared/layout/DashboardLayout";
import { BookingsStats } from "@/components/shared/bookings/BookingsStats";
import { BookingsFilters } from "@/components/shared/bookings/BookingsFilters";
import { BookingsTable } from "@/components/shared/bookings/BookingsTable";
import { SalesIntelligenceSidebar } from "@/components/shared/bookings/SalesIntelligenceSidebar";
import {
  BookingDetailsModal,
  Booking,
} from "@/components/shared/bookings/BookingDetailsModal";
import { parse, isWithinInterval, startOfDay, endOfDay } from "date-fns";
import {
  getBookings,
  getBookingsStats,
  getSalesOverTime,
  getConversionFunnel,
  type BookingData,
  type BookingsStats as StatsData,
} from "@/app/actions/bookings";
import { RefreshCw } from "lucide-react";

export default function BookingsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  // Real data state
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [stats, setStats] = useState<StatsData>({
    todaysSales: 0,
    pendingPayments: 0,
    refundRequests: 0,
    avgTicketPrice: 0,
  });
  const [salesData, setSalesData] = useState<any[]>([]);
  const [funnelData, setFunnelData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch data function
  const fetchData = async () => {
    try {
      setRefreshing(true);

      // Fetch all data in parallel
      const [bookingsData, statsData, salesOverTime, funnel] =
        await Promise.all([
          getBookings({
            search: searchQuery,
            status: statusFilter,
            type: typeFilter,
            startDate,
            endDate,
          }),
          getBookingsStats(),
          getSalesOverTime(7),
          getConversionFunnel(),
        ]);

      setBookings(bookingsData);
      setStats(statsData);
      setSalesData(salesOverTime);
      setFunnelData(funnel);
    } catch (error) {
      console.error("Error fetching bookings data:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchData();
  }, []);

  // Refetch when filters change
  useEffect(() => {
    if (!loading) {
      fetchData();
    }
  }, [searchQuery, statusFilter, typeFilter, startDate, endDate]);

  // Auto-refresh every 30 seconds for real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [searchQuery, statusFilter, typeFilter, startDate, endDate]);

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      // Search Filter
      const matchesSearch =
        booking.customer.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        booking.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.customer.email
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      // Status Filter
      const matchesStatus =
        statusFilter === "All" || booking.status === statusFilter;

      // Type Filter
      const matchesType = typeFilter === "All" || booking.type === typeFilter;

      // Date Filter
      let matchesDate = true;
      if (startDate && endDate) {
        // Parse "Feb 19, 2025" to Date object
        const bookingDate = parse(booking.date, "MMM d, yyyy", new Date());
        matchesDate = isWithinInterval(bookingDate, {
          start: startOfDay(startDate),
          end: endOfDay(endDate),
        });
      }

      return matchesSearch && matchesStatus && matchesType && matchesDate;
    });
  }, [bookings, searchQuery, statusFilter, typeFilter, startDate, endDate]);

  return (
    <DashboardLayout>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Bookings</h1>
          <p className="text-muted-foreground">
            Sales intelligence and booking management
          </p>
        </div>
        <button
          onClick={fetchData}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          <RefreshCw
            className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
          />
          {refreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      <div className="flex flex-col xl:flex-row gap-6">
        <div className="flex-1 min-w-0">
          <BookingsStats stats={stats} loading={loading} />
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
            loading={loading}
          />
        </div>

        <div className="w-full xl:w-80 flex-shrink-0">
          <div className="bg-card rounded-xl p-6 shadow-sm border border-border sticky top-24">
            <SalesIntelligenceSidebar
              salesData={salesData}
              funnelData={funnelData}
              loading={loading}
            />
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
