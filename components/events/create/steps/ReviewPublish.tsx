"use client";

import { Calendar, MapPin, Tag, Ticket, Shield } from "lucide-react";
import { EventFormData } from "../CreateEventWizard";
import { createEvent } from "@/app/actions/events";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface StepProps {
    data: EventFormData;
}

export function ReviewPublish({ data }: StepProps) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handlePublish = async () => {
        setIsLoading(true);
        const formData = new FormData();
        formData.append("title", data.name);
        formData.append("description", data.description);
        formData.append("locationName", data.location.split(',')[0] || data.location); // Simple parse
        formData.append("locationAddress", data.location);
        formData.append("startDate", data.startDate?.toISOString() || "");
        formData.append("endDate", data.endDate?.toISOString() || "");
        formData.append("category", data.category);

        if (data.imageFile) {
            formData.append("image", data.imageFile);
        }

        // Add tickets
        const tickets = data.tickets.map(t => ({
            name: t.name,
            price: t.price,
            quantity: t.quantity,
            description: t.description || ''
        }));
        formData.append("tickets", JSON.stringify(tickets));

        // Add ticket design files
        data.tickets.forEach((ticket, index) => {
            if (ticket.designFile) {
                formData.append(`ticketDesign_${index}`, ticket.designFile);
            }
        });

        const result = await createEvent(formData);

        if (result?.error) {
            toast.error(result.error);
        } else {
            toast.success("Event Published Successfully!");
            router.push("/dashboard");
        }
        setIsLoading(false);
    };

    return (
        <div className="space-y-6 max-w-3xl mx-auto">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-[#0f172a]">Ready to Publish?</h2>
                <p className="text-[#64748b]">Review your event details before going live.</p>
            </div>

            <div className="bg-white border border-[#e2e8f0] rounded-2xl overflow-hidden shadow-sm">
                {/* Event Banner Preview */}
                <div className="h-48 bg-slate-100 relative overflow-hidden">
                    {data.imageFile ? (
                        <img
                            src={URL.createObjectURL(data.imageFile)}
                            alt="Banner Preview"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-[#94a3b8]">
                            <span className="text-sm">No Banner Image Selected</span>
                        </div>
                    )}
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
                                <div className="text-sm font-medium text-[#0f172a]">
                                    {data.startDate ? data.startDate.toLocaleDateString() : "TBA"}
                                </div>
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
                        <div className="space-y-3">
                            {data.tickets && data.tickets.length > 0 ? (
                                data.tickets.map((ticket) => (
                                    <div key={ticket.id} className="p-4 bg-slate-50 rounded-xl border border-[#e2e8f0]">
                                        <div className="flex justify-between items-start gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <Ticket className="w-4 h-4 text-[#1DB954]" />
                                                    <span className="text-sm font-semibold text-[#0f172a]">{ticket.name}</span>
                                                </div>
                                                {ticket.description && (
                                                    <p className="text-xs text-[#64748b] mb-2">{ticket.description}</p>
                                                )}
                                                <div className="flex items-center gap-4 text-xs text-[#64748b]">
                                                    <span>Qty: {ticket.quantity}</span>
                                                    <span className="font-bold text-[#0f172a]">SZL {ticket.price}</span>
                                                </div>
                                            </div>
                                            {ticket.designPreview && (
                                                <div className="relative w-32 h-20 rounded-lg overflow-hidden border border-[#e2e8f0] flex-shrink-0">
                                                    <img
                                                        src={ticket.designPreview}
                                                        alt={`${ticket.name} design`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                    <div className="absolute bottom-0 right-0 bg-black/60 text-white text-[8px] px-1 py-0.5">
                                                        Custom Design
                                                    </div>
                                                </div>
                                            )}
                                        </div>
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

            <div className="flex justify-end">
                <button
                    onClick={handlePublish}
                    disabled={isLoading}
                    className="w-full bg-[#1DB954] hover:bg-[#1ed760] text-white py-3 rounded-xl font-bold text-lg shadow-lg shadow-green-200 transition-all hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? "Publishing..." : "Confirm & Publish Event"}
                </button>
            </div>
        </div>
    );
}
