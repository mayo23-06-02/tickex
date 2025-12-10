"use client";

import { Calendar, MapPin, Tag, Ticket, Shield } from "lucide-react";
import { EventFormData } from "../CreateEventWizard";

interface StepProps {
    data: EventFormData;
}

export function ReviewPublish({ data }: StepProps) {
    return (
        <div className="space-y-6 max-w-3xl mx-auto">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-[#0f172a]">Ready to Publish?</h2>
                <p className="text-[#64748b]">Review your event details before going live.</p>
            </div>

            <div className="bg-white border border-[#e2e8f0] rounded-2xl overflow-hidden shadow-sm">
                {/* Event Banner Preview */}
                <div className="h-48 bg-slate-100 relative">
                    <div className="absolute inset-0 flex items-center justify-center text-[#94a3b8]">
                        <span className="text-sm">Banner Image Preview</span>
                    </div>
                </div>

                <div className="p-6 space-y-6">
                    <div>
                        <div className="flex justify-between items-start mb-2">
                            <h1 className="text-2xl font-bold text-[#0f172a]">{data.name || "Untitled Event"}</h1>
                            <span className="px-3 py-1 bg-[#1DB954]/10 text-[#1DB954] rounded-full text-xs font-semibold uppercase">
                                {data.category || "Uncategorized"}
                            </span>
                        </div>
                        <p className="text-[#64748b] text-sm leading-relaxed">{data.description || "No description provided."}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 border-y border-[#e2e8f0]">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center border border-[#e2e8f0]">
                                <Calendar className="w-5 h-5 text-[#64748b]" />
                            </div>
                            <div>
                                <div className="text-xs text-[#64748b] font-semibold uppercase">Date & Time</div>
                                <div className="text-sm font-medium text-[#0f172a]">To Be Announced</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center border border-[#e2e8f0]">
                                <MapPin className="w-5 h-5 text-[#64748b]" />
                            </div>
                            <div>
                                <div className="text-xs text-[#64748b] font-semibold uppercase">Location</div>
                                <div className="text-sm font-medium text-[#0f172a]">{data.location || "TBA"}</div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold text-[#0f172a] mb-3">Ticket Types</h3>
                        <div className="space-y-2">
                            {data.tickets && data.tickets.length > 0 ? (
                                data.tickets.map((ticket) => (
                                    <div key={ticket.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-[#e2e8f0]">
                                        <div className="flex items-center gap-3">
                                            <Ticket className="w-4 h-4 text-[#1DB954]" />
                                            <span className="text-sm font-medium text-[#0f172a]">{ticket.name}</span>
                                        </div>
                                        <div className="text-sm font-bold text-[#0f172a]">SZL {ticket.price}</div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-sm text-[#64748b] italic">No tickets configured</div>
                            )}
                        </div>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-xl flex gap-3">
                        <Shield className="w-5 h-5 text-[#64748b]" />
                        <div className="text-xs text-[#64748b]">
                            <div><span className="font-semibold">Refund Policy:</span> {data.refundPolicy}</div>
                            <div><span className="font-semibold">Age Restriction:</span> {data.ageRestriction}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
