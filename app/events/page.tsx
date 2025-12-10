"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { EventsHeader } from "@/components/events/EventsHeader";
import { EventsFilters } from "@/components/events/EventsFilters";
import { EventsGrid } from "@/components/events/EventsGrid";
import { EventsSidebar } from "@/components/events/EventsSidebar";

export interface Event {
    id: string;
    name: string;
    date: Date;
    status: "Active" | "Upcoming" | "Draft" | "Completed" | "Cancelled";
    ticketsSold: number;
    ticketsTotal: number;
    revenue: number;
    color: string;
}

const mockEvents: Event[] = [
    {
        id: "1",
        name: "Neon Dreams Festival",
        date: new Date("2025-03-15"),
        status: "Active",
        ticketsSold: 842,
        ticketsTotal: 1200,
        revenue: 42100,
        color: "#1DB954"
    },
    {
        id: "2",
        name: "Tech Conference 2025",
        date: new Date("2025-04-20"),
        status: "Upcoming",
        ticketsSold: 145,
        ticketsTotal: 500,
        revenue: 12500,
        color: "#0f172a"
    },
    {
        id: "3",
        name: "Art Exhibition",
        date: new Date("2025-05-10"),
        status: "Draft",
        ticketsSold: 0,
        ticketsTotal: 300,
        revenue: 0,
        color: "#64748b"
    },
];

export default function EventsPage() {
    const [events, setEvents] = useState<Event[]>(mockEvents);
    const [viewMode, setViewMode] = useState<"grid" | "list" | "calendar">("grid");
    const [filterStatus, setFilterStatus] = useState<string>("All Events");
    const [sortBy, setSortBy] = useState<string>("Date");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredEvents = events.filter(event => {
        const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = filterStatus === "All Events" || event.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const handleDeleteEvent = (id: string) => {
        setEvents(events.filter(e => e.id !== id));
    };

    const handleDuplicateEvent = (id: string) => {
        const eventToDuplicate = events.find(e => e.id === id);
        if (eventToDuplicate) {
            const newEvent: Event = {
                ...eventToDuplicate,
                id: Date.now().toString(),
                name: `${eventToDuplicate.name} (Copy)`,
                status: "Draft",
                ticketsSold: 0,
                revenue: 0
            };
            setEvents([newEvent, ...events]);
        }
    };

    return (
        <DashboardLayout>
            <div className="flex gap-6">
                <div className="flex-1 min-w-0">
                    <EventsHeader />

                    <EventsFilters
                        viewMode={viewMode}
                        setViewMode={setViewMode}
                        filterStatus={filterStatus}
                        setFilterStatus={setFilterStatus}
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                    />

                    <EventsGrid
                        events={filteredEvents}
                        viewMode={viewMode}
                        onDelete={handleDeleteEvent}
                        onDuplicate={handleDuplicateEvent}
                    />
                </div>

                <EventsSidebar />
            </div>
        </DashboardLayout>
    );
}
