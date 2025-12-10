"use client";

import { QrCode } from "lucide-react";

interface TicketPreviewProps {
    data: any;
    design: any;
}

export function TicketPreview({ data, design }: TicketPreviewProps) {
    const bgColor = design?.bgColor || "#1DB954";

    return (
        <div className="w-full max-w-md mx-auto transform hover:scale-[1.02] transition-transform duration-300">
            <div
                className="relative rounded-3xl overflow-hidden shadow-2xl text-white aspect-[1.8/1] flex flex-col"
                style={{ background: bgColor }}
            >
                {/* Content */}
                <div className="flex-1 p-8 relative z-10 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <div>
                            <div className="text-xs font-medium opacity-80 mb-1">Neon Dreams Festival</div>
                            <h2 className="text-3xl font-bold tracking-tight">{data.name || "Ticket Name"}</h2>
                        </div>
                        <div className="bg-white p-1.5 rounded-lg shadow-sm">
                            <QrCode className="w-12 h-12 text-black" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <div className="text-[10px] uppercase font-bold opacity-60 mb-1">Date</div>
                            <div className="font-semibold">{data.eventDate || "March 15, 2025"}</div>
                        </div>
                        <div>
                            <div className="text-[10px] uppercase font-bold opacity-60 mb-1">Time</div>
                            <div className="font-semibold">{data.eventTime || "7:00 PM"}</div>
                        </div>
                        <div>
                            <div className="text-[10px] uppercase font-bold opacity-60 mb-1">Venue</div>
                            <div className="font-semibold truncate">{data.venue || "Central Stadium"}</div>
                        </div>
                        <div>
                            <div className="text-[10px] uppercase font-bold opacity-60 mb-1">Price</div>
                            <div className="font-semibold">SZL {data.price || 0}</div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-white/20 mt-2">
                        <div className="text-[10px] uppercase font-bold opacity-60 mb-1">Ticket ID</div>
                        <div className="font-mono text-sm tracking-wider opacity-90">TKX-2025-1234</div>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
                <div className="absolute -top-12 -left-12 w-32 h-32 bg-black/5 rounded-full blur-xl" />
            </div>

            <button className="w-full mt-6 py-2.5 text-sm font-medium text-[#64748b] bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors">
                Download Mockup
            </button>
        </div>
    );
}
