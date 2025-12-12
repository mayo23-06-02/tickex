"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { EventsHeader } from "@/components/events/EventsHeader";
import { EventsFilters } from "@/components/events/EventsFilters";
import { EventsGrid } from "@/components/events/EventsGrid";
import { EventsSidebar } from "@/components/events/EventsSidebar";
import { Event } from "@/app/dashboard/events/page"; // We'll keep the type definition here or move it slightly later

interface EventsClientProps {
    initialEvents: Event[];
}

export default function EventsClient({ initialEvents }: EventsClientProps) {
    const [events, setEvents] = useState<Event[]>(initialEvents);
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
        // TODO: Call server action to delete
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
            // TODO: Call server action to duplicate
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
