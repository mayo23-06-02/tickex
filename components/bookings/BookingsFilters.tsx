"use client";

import { Search, Download } from "lucide-react";
import { DateRangePicker } from "@/components/ui/DateRangePicker";

interface BookingsFiltersProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    statusFilter: string;
    setStatusFilter: (status: string) => void;
    typeFilter: string;
    setTypeFilter: (type: string) => void;
    startDate: Date | null;
    endDate: Date | null;
    setDateRange: (start: Date | null, end: Date | null) => void;
}

export function BookingsFilters({
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    typeFilter,
    setTypeFilter,
    startDate,
    endDate,
    setDateRange
}: BookingsFiltersProps) {
    return (
        <div className="space-y-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
                {/* Date Picker */}
                <DateRangePicker
                    startDate={startDate}
                    endDate={endDate}
                    onChange={setDateRange}
                />

                {/* Search Bar */}
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by name, email, or booking ID..."
                        className="w-full pl-10 pr-4 py-2.5 bg-muted/50 border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring transition-all"
                    />
                </div>

                {/* Export Button */}
                <button className="flex items-center gap-2 px-4 py-2.5 bg-card border border-border rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors">
                    <Download className="w-4 h-4" />
                    Export
                </button>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2 bg-muted p-1 rounded-lg">
                    {["All Status", "Confirmed", "Pending", "Cancelled"].map((status) => (
                        <button
                            key={status}
                            onClick={() => setStatusFilter(status === "All Status" ? "All" : status)}
                            className={`px-3 py-1 rounded-md font-medium transition-all ${(status === "All Status" && statusFilter === "All") || status === statusFilter
                                ? "bg-primary text-primary-foreground shadow-sm"
                                : "text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>

                <div className="w-px h-6 bg-border"></div>

                <div className="flex items-center gap-2 bg-muted p-1 rounded-lg">
                    {["All Types", "VIP", "General"].map((type) => (
                        <button
                            key={type}
                            onClick={() => setTypeFilter(type === "All Types" ? "All" : type)}
                            className={`px-3 py-1 rounded-md font-medium transition-all ${(type === "All Types" && typeFilter === "All") || type === typeFilter
                                ? "bg-primary text-primary-foreground shadow-sm"
                                : "text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
