"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface EventSelectorProps {
    events: Array<{ id: string; title: string }>;
    currentEventId?: string;
}

export function EventSelector({ events, currentEventId = "all" }: EventSelectorProps) {
    const router = useRouter();
    const search = useSearchParams();

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        const params = new URLSearchParams(search.toString());
        if (value === "all") {
            params.delete("eventId");
        } else {
            params.set("eventId", value);
        }
        router.push(`/dashboard?${params.toString()}`);
    };

    return (
        <div className="flex items-center gap-2">
            <label className="text-sm text-muted-foreground">Event</label>
            <select
                value={currentEventId}
                onChange={handleChange}
                className="px-3 py-2 rounded-lg border border-input bg-muted text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring"
            >
                <option value="all">All Events</option>
                {events.map(ev => (
                    <option key={ev.id} value={ev.id}>
                        {ev.title}
                    </option>
                ))}
            </select>
        </div>
    );
}
