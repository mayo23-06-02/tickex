"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export function EventsHeader() {
    const router = useRouter();

    return (
        <div className="mb-6 flex justify-between items-start">
            <div>
                <h1 className="text-2xl font-bold text-[#0f172a]">Events</h1>
                <p className="text-sm text-[#64748b]">Manage your event portfolio</p>
            </div>
            <button
                onClick={() => router.push("/events/create")}
                className="flex items-center gap-2 px-4 py-2.5 bg-[#0f172a] hover:bg-slate-800 text-white rounded-lg font-medium transition-all shadow-sm"
            >
                <Plus className="w-4 h-4" />
                Create Event
            </button>
        </div>
    );
}
