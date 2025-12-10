"use client";

import { Calendar, MapPin, Tag, User } from "lucide-react";
import { EventFormData } from "../CreateEventWizard";

interface StepProps {
    data: EventFormData;
    update: (data: Partial<EventFormData>) => void;
}

export function EventBasics({ data, update }: StepProps) {
    return (
        <div className="space-y-6 max-w-3xl mx-auto">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-[#0f172a]">Event Details</h2>
                <p className="text-[#64748b]">Let's start with the basics of your event.</p>
            </div>

            <div className="space-y-4">
                {/* Event Name */}
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-[#0f172a]">Event Name</label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => update({ name: e.target.value })}
                        placeholder="e.g. Neon Dreams Festival 2025"
                        className="w-full px-4 py-3 rounded-xl border border-[#e2e8f0] bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1DB954]/20 focus:border-[#1DB954] transition-all"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Organizer */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-[#0f172a]">Organizer</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" />
                            <input
                                type="text"
                                value={data.organizer}
                                onChange={(e) => update({ organizer: e.target.value })}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#e2e8f0] bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1DB954]/20 focus:border-[#1DB954] transition-all"
                            />
                        </div>
                    </div>

                    {/* Category */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-[#0f172a]">Category</label>
                        <div className="relative">
                            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" />
                            <select
                                value={data.category}
                                onChange={(e) => update({ category: e.target.value })}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#e2e8f0] bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1DB954]/20 focus:border-[#1DB954] transition-all appearance-none"
                            >
                                <option value="">Select a category</option>
                                <option value="music">Music Festival</option>
                                <option value="conference">Conference</option>
                                <option value="workshop">Workshop</option>
                                <option value="sports">Sports</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Start Date */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-[#0f172a]">Start Date & Time</label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" />
                            <input
                                type="datetime-local"
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#e2e8f0] bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1DB954]/20 focus:border-[#1DB954] transition-all"
                            />
                        </div>
                    </div>

                    {/* End Date */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-[#0f172a]">End Date & Time</label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" />
                            <input
                                type="datetime-local"
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#e2e8f0] bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1DB954]/20 focus:border-[#1DB954] transition-all"
                            />
                        </div>
                    </div>
                </div>

                {/* Venue */}
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-[#0f172a]">Venue</label>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" />
                        <input
                            type="text"
                            value={data.location}
                            onChange={(e) => update({ location: e.target.value })}
                            placeholder="Search for a venue or address"
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#e2e8f0] bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1DB954]/20 focus:border-[#1DB954] transition-all"
                        />
                    </div>
                    {/* Mock Map Placeholder */}
                    <div className="aspect-video w-full bg-slate-100 rounded-xl border border-[#e2e8f0] flex items-center justify-center text-[#94a3b8] text-sm mt-3">
                        <div className="flex flex-col items-center gap-2">
                            <MapPin className="w-8 h-8 opacity-50" />
                            <span>Map Preview</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
