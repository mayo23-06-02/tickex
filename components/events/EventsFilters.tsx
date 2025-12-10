"use client";

import { Grid3x3, List, Calendar as CalendarIcon, Search, ChevronDown } from "lucide-react";

interface EventsFiltersProps {
    viewMode: "grid" | "list" | "calendar";
    setViewMode: (mode: "grid" | "list" | "calendar") => void;
    filterStatus: string;
    setFilterStatus: (status: string) => void;
    sortBy: string;
    setSortBy: (sort: string) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

export function EventsFilters({
    viewMode,
    setViewMode,
    filterStatus,
    setFilterStatus,
    sortBy,
    setSortBy,
    searchQuery,
    setSearchQuery
}: EventsFiltersProps) {
    const statusOptions = ["All Events", "Active", "Upcoming", "Draft", "Completed", "Cancelled"];
    const sortOptions = ["Date", "Name", "Revenue", "Tickets Sold"];

    return (
        <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
            <div className="flex gap-3 items-center flex-1">
                {/* View Mode Toggle */}
                <div className="flex bg-white rounded-lg p-1 border border-[#e2e8f0]">
                    <button
                        onClick={() => setViewMode("grid")}
                        className={`p-2 rounded-md transition-colors ${viewMode === "grid"
                                ? "bg-[#1DB954] text-white shadow-sm"
                                : "text-[#94a3b8] hover:text-[#64748b]"
                            }`}
                    >
                        <Grid3x3 className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setViewMode("list")}
                        className={`p-2 rounded-md transition-colors ${viewMode === "list"
                                ? "bg-[#1DB954] text-white shadow-sm"
                                : "text-[#94a3b8] hover:text-[#64748b]"
                            }`}
                    >
                        <List className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setViewMode("calendar")}
                        className={`p-2 rounded-md transition-colors ${viewMode === "calendar"
                                ? "bg-[#1DB954] text-white shadow-sm"
                                : "text-[#94a3b8] hover:text-[#64748b]"
                            }`}
                    >
                        <CalendarIcon className="w-4 h-4" />
                    </button>
                </div>

                {/* Status Filter */}
                <div className="relative">
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="appearance-none pl-4 pr-10 py-2.5 bg-white border border-[#e2e8f0] rounded-lg text-sm font-medium text-[#0f172a] focus:outline-none focus:border-[#1DB954] cursor-pointer"
                    >
                        {statusOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8] pointer-events-none" />
                </div>

                {/* Sort By */}
                <div className="relative">
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="appearance-none pl-4 pr-10 py-2.5 bg-white border border-[#e2e8f0] rounded-lg text-sm font-medium text-[#0f172a] focus:outline-none focus:border-[#1DB954] cursor-pointer"
                    >
                        {sortOptions.map(option => (
                            <option key={option} value={option}>Sort: {option}</option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8] pointer-events-none" />
                </div>
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-auto sm:min-w-[300px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" />
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search events..."
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#e2e8f0] rounded-lg text-sm focus:outline-none focus:border-[#1DB954] transition-all"
                />
            </div>
        </div>
    );
}
