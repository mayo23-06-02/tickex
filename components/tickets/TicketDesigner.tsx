"use client";

import { useState } from "react";
import { TicketPreview } from "./TicketPreview";
import { TicketEditor } from "./TicketEditor";
import { Monitor, Smartphone } from "lucide-react";

interface TicketDesignerProps {
    data: any;
    design: any;
    updateData: (updates: any) => void;
    updateDesign: (updates: any) => void;
    onSave: () => void;
}

export function TicketDesigner({ data, design, updateData, updateDesign, onSave }: TicketDesignerProps) {
    const [currentTab, setCurrentTab] = useState("Basic Info");
    const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop");

    return (
        <div className="flex-1 min-w-0 flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-[#0f172a]">Ticket Designer</h2>
                    <p className="text-[#64748b]">Customize {data.name || "ticket"} access</p>
                </div>
            </div>

            {/* Live Preview Section */}
            <div className="bg-slate-50 border border-[#e2e8f0] rounded-2xl p-8 relative">
                <div className="absolute top-4 right-4 flex bg-white rounded-lg border border-[#e2e8f0] p-1">
                    <button
                        onClick={() => setPreviewMode("desktop")}
                        className={`p-1.5 rounded-md transition-all ${previewMode === 'desktop' ? 'bg-slate-100 text-[#0f172a]' : 'text-[#94a3b8] hover:text-[#64748b]'}`}
                    >
                        <Monitor className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setPreviewMode("mobile")}
                        className={`p-1.5 rounded-md transition-all ${previewMode === 'mobile' ? 'bg-slate-100 text-[#0f172a]' : 'text-[#94a3b8] hover:text-[#64748b]'}`}
                    >
                        <Smartphone className="w-4 h-4" />
                    </button>
                </div>

                <h3 className="text-sm font-semibold text-[#0f172a] mb-6">Live Preview</h3>
                <TicketPreview data={data} design={design} />
            </div>

            {/* Editor Section */}
            <TicketEditor
                data={data}
                design={design}
                updateData={updateData}
                updateDesign={updateDesign}
                currentTab={currentTab}
                setCurrentTab={setCurrentTab}
                onSave={onSave}
            />
        </div>
    );
}
