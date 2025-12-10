"use client";

import { Type, Image, Users, Ticket, Grid, HelpCircle, Layout } from "lucide-react";

interface ComponentLibraryProps {
    onAddComponent: (type: "hero" | "about" | "lineup" | "tickets" | "gallery" | "faq" | "footer") => void;
}

export function ComponentLibrary({ onAddComponent }: ComponentLibraryProps) {
    const components = [
        { type: "hero" as const, icon: Layout, label: "Hero Section" },
        { type: "about" as const, icon: Type, label: "About" },
        { type: "lineup" as const, icon: Users, label: "Lineup" },
        { type: "tickets" as const, icon: Ticket, label: "Tickets" },
        { type: "gallery" as const, icon: Image, label: "Gallery" },
        { type: "faq" as const, icon: HelpCircle, label: "FAQ" },
        { type: "footer" as const, icon: Grid, label: "Footer" },
    ];

    return (
        <div className="bg-white rounded-xl p-4 border border-[#e2e8f0] h-full overflow-y-auto">
            <h3 className="text-sm font-bold text-[#0f172a] mb-4">Components</h3>
            <div className="space-y-2">
                {components.map((comp) => (
                    <button
                        key={comp.type}
                        onClick={() => onAddComponent(comp.type)}
                        className="w-full flex items-center gap-3 p-3 rounded-lg border border-[#e2e8f0] hover:border-[#1DB954] hover:bg-green-50/50 transition-all text-left"
                    >
                        <comp.icon className="w-5 h-5 text-[#64748b]" />
                        <span className="text-sm font-medium text-[#0f172a]">{comp.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
