"use client";

import { Image as ImageIcon, Upload, FileText, Globe } from "lucide-react";
import { EventFormData } from "../CreateEventWizard";

interface StepProps {
    data: EventFormData;
    update: (data: Partial<EventFormData>) => void;
}

export function EventBranding({ data, update }: StepProps) {
    return (
        <div className="space-y-6 max-w-3xl mx-auto">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-[#0f172a]">Content & Branding</h2>
                <p className="text-[#64748b]">Make your event stand out with great visuals.</p>
            </div>

            {/* Banner Image */}
            <div className="space-y-3">
                <label className="text-sm font-medium text-[#0f172a]">Event Banner</label>
                <div className="border-2 border-dashed border-[#e2e8f0] rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer group bg-slate-50/50">
                    <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Upload className="w-6 h-6 text-[#1DB954]" />
                    </div>
                    <div className="text-sm font-medium text-[#0f172a] mb-1">Click to upload or drag and drop</div>
                    <div className="text-xs text-[#64748b]">SVG, PNG, JPG or GIF (max. 800x400px)</div>
                </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
                <label className="text-sm font-medium text-[#0f172a]">Event Description</label>
                <div className="relative">
                    <textarea
                        value={data.description}
                        onChange={(e) => update({ description: e.target.value })}
                        placeholder="Tell people what makes your event special..."
                        rows={6}
                        className="w-full p-4 rounded-xl border border-[#e2e8f0] bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1DB954]/20 focus:border-[#1DB954] transition-all resize-none"
                    />
                </div>
            </div>

            {/* Media Gallery */}
            <div className="space-y-3">
                <label className="text-sm font-medium text-[#0f172a]">Gallery & Media</label>
                <div className="grid grid-cols-4 gap-4">
                    <div className="aspect-square bg-slate-100 rounded-lg flex items-center justify-center border border-[#e2e8f0] cursor-pointer hover:bg-slate-200">
                        <Upload className="w-5 h-5 text-[#94a3b8]" />
                    </div>
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="aspect-square bg-slate-50 rounded-lg border border-[#e2e8f0]"></div>
                    ))}
                </div>
            </div>
        </div>
    );
}
