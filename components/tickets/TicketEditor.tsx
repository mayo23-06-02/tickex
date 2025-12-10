"use client";

import { useState } from "react";
import { Plus, Trash2, Calendar, ChevronDown, CheckCircle, Loader2 } from "lucide-react";

interface TicketEditorProps {
    data: any;
    design: any;
    updateData: (updates: any) => void;
    updateDesign: (updates: any) => void;
    currentTab: string;
    setCurrentTab: (tab: string) => void;
    onSave: () => void;
}

export function TicketEditor({
    data,
    design,
    updateData,
    updateDesign,
    currentTab,
    setCurrentTab,
    onSave
}: TicketEditorProps) {

    const [isSaving, setIsSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState<Date | null>(null);

    const tabs = ["Basic Info", "Perks & Benefits", "Access Rules", "Design"];

    const addPerk = () => {
        const perks = data.perks || [];
        updateData({ perks: [...perks, ""] });
    };

    const updatePerk = (index: number, value: string) => {
        const perks = [...(data.perks || [])];
        perks[index] = value;
        updateData({ perks });
    };

    const removePerk = (index: number) => {
        const perks = [...(data.perks || [])];
        perks.splice(index, 1);
        updateData({ perks });
    };

    const handleSave = async () => {
        setIsSaving(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));
        onSave();
        setLastSaved(new Date());
        setIsSaving(false);
    };

    return (
        <div className="flex-1 bg-white border border-[#e2e8f0] rounded-2xl flex flex-col min-h-[500px]">
            {/* Tabs */}
            <div className="flex border-b border-[#e2e8f0]">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setCurrentTab(tab)}
                        className={`flex-1 py-4 text-sm font-medium transition-colors relative ${currentTab === tab
                            ? "text-[#1DB954]"
                            : "text-[#64748b] hover:text-[#0f172a]"
                            }`}
                    >
                        {tab}
                        {currentTab === tab && (
                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#1DB954]" />
                        )}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="p-8 flex-1 overflow-y-auto">
                {currentTab === "Basic Info" && (
                    <div className="space-y-6">
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-[#0f172a]">Ticket Name</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => updateData({ name: e.target.value })}
                                className="w-full px-4 py-2.5 rounded-lg border border-[#e2e8f0] bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1DB954]/20 focus:border-[#1DB954] transition-all"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-[#0f172a]">Price (SZL)</label>
                                <input
                                    type="number"
                                    value={data.price}
                                    onChange={(e) => updateData({ price: parseInt(e.target.value) || 0 })}
                                    className="w-full px-4 py-2.5 rounded-lg border border-[#e2e8f0] bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1DB954]/20 focus:border-[#1DB954] transition-all"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-[#0f172a]">Quantity</label>
                                <input
                                    type="number"
                                    value={data.total}
                                    onChange={(e) => updateData({ total: parseInt(e.target.value) || 0 })}
                                    className="w-full px-4 py-2.5 rounded-lg border border-[#e2e8f0] bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1DB954]/20 focus:border-[#1DB954] transition-all"
                                />
                            </div>
                        </div>

                        <div className="flex gap-8">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="rounded text-[#1DB954] focus:ring-[#1DB954]" />
                                <span className="text-sm text-[#64748b]">Enable dynamic pricing</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="rounded text-[#1DB954] focus:ring-[#1DB954]" />
                                <span className="text-sm text-[#64748b]">Enable waitlist</span>
                            </label>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-[#0f172a]">Description</label>
                            <textarea
                                rows={3}
                                className="w-full px-4 py-2.5 rounded-lg border border-[#e2e8f0] bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1DB954]/20 focus:border-[#1DB954] transition-all resize-none"
                                placeholder="Describe what's included..."
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-[#0f172a]">Sales Start</label>
                                <div className="relative">
                                    <input
                                        type="datetime-local"
                                        className="w-full px-4 py-2.5 rounded-lg border border-[#e2e8f0] bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1DB954]/20 focus:border-[#1DB954] transition-all"
                                    />
                                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8] pointer-events-none" />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-[#0f172a]">Sales End</label>
                                <div className="relative">
                                    <input
                                        type="datetime-local"
                                        className="w-full px-4 py-2.5 rounded-lg border border-[#e2e8f0] bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1DB954]/20 focus:border-[#1DB954] transition-all"
                                    />
                                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8] pointer-events-none" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {currentTab === "Perks & Benefits" && (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h3 className="font-medium text-[#0f172a]">Perks & Benefits</h3>
                            <button onClick={addPerk} className="text-sm text-[#1DB954] font-medium flex items-center gap-1 hover:underline">
                                <Plus className="w-4 h-4" /> Add Perk
                            </button>
                        </div>

                        <div className="space-y-3">
                            {(data.perks || []).map((perk: string, i: number) => (
                                <div key={i} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={perk}
                                        onChange={(e) => updatePerk(i, e.target.value)}
                                        placeholder="e.g. Backstage access"
                                        className="flex-1 px-4 py-2.5 rounded-lg border border-[#e2e8f0] bg-slate-50 focus:bg-white focus:outline-none focus:border-[#1DB954]"
                                    />
                                    <button
                                        onClick={() => removePerk(i)}
                                        className="p-2.5 text-red-400 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                            {(!data.perks || data.perks.length === 0) && (
                                <div className="text-sm text-[#94a3b8] italic text-center py-4 bg-slate-50 rounded-lg border border-dashed border-[#e2e8f0]">
                                    No perks added yet
                                </div>
                            )}
                        </div>

                        <div>
                            <h3 className="font-medium text-[#0f172a] mb-3">VIP Package Builder</h3>
                            <div className="grid grid-cols-2 gap-3">
                                {["Fast Lane Access", "Free Drink", "Meet & Greet", "Merch Bundle", "Photo Booth", "Lounge Access"].map((item) => (
                                    <label key={item} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-[#e2e8f0] cursor-pointer hover:border-[#1DB954] transition-colors">
                                        <input type="checkbox" className="rounded text-[#1DB954] focus:ring-[#1DB954]" />
                                        <span className="text-sm text-[#0f172a]">{item}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {currentTab === "Design" && (
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-[#0f172a]">Background Color</label>
                            <div className="flex gap-3">
                                <div
                                    className="w-12 h-12 rounded-lg border shadow-sm"
                                    style={{ background: design.bgColor }}
                                />
                                <input
                                    type="text"
                                    value={design.bgColor}
                                    onChange={(e) => updateDesign({ bgColor: e.target.value })}
                                    className="flex-1 px-4 py-2 rounded-lg border border-[#e2e8f0] bg-slate-50 font-mono text-sm"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-[#0f172a]">Presets</label>
                            <div className="flex gap-3">
                                {["#1DB954", "#0f172a", "#64748b", "#94a3b8", "#f59e0b", "#ef4444"].map(color => (
                                    <button
                                        key={color}
                                        onClick={() => updateDesign({ bgColor: color })}
                                        className="w-10 h-10 rounded-lg border border-black/10 hover:scale-110 transition-transform shadow-sm"
                                        style={{ background: color }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {currentTab === "Access Rules" && (
                    <div className="space-y-6">
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-[#0f172a]">Valid Entry Gates</label>
                            <div className="relative">
                                <select className="w-full px-4 py-2.5 rounded-lg border border-[#e2e8f0] bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1DB954]/20 focus:border-[#1DB954] transition-all appearance-none cursor-pointer">
                                    <option>All Gates</option>
                                    <option>Gate A (Main Entrance)</option>
                                    <option>Gate B (VIP Only)</option>
                                    <option>Gate C</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8] pointer-events-none" />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-[#0f172a]">Valid Entry Times</label>
                            <div className="flex items-center gap-4">
                                <div className="relative flex-1">
                                    <input
                                        type="time"
                                        defaultValue="18:00"
                                        className="w-full px-4 py-2.5 rounded-lg border border-[#e2e8f0] bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1DB954]/20 focus:border-[#1DB954] transition-all"
                                    />
                                </div>
                                <span className="text-[#64748b]">-</span>
                                <div className="relative flex-1">
                                    <input
                                        type="time"
                                        defaultValue="23:00"
                                        className="w-full px-4 py-2.5 rounded-lg border border-[#e2e8f0] bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1DB954]/20 focus:border-[#1DB954] transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 pt-2">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input type="checkbox" className="rounded text-[#1DB954] focus:ring-[#1DB954] w-4 h-4 border-gray-300" />
                                <span className="text-sm text-[#0f172a] group-hover:text-[#1DB954] transition-colors">Age verification required</span>
                            </label>

                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input type="checkbox" defaultChecked className="rounded text-[#1DB954] focus:ring-[#1DB954] w-4 h-4 border-gray-300" />
                                <span className="text-sm text-[#0f172a] group-hover:text-[#1DB954] transition-colors">ID verification required</span>
                            </label>

                            <div>
                                <label className="flex items-center gap-3 cursor-pointer mb-2 group">
                                    <input type="checkbox" defaultChecked className="rounded text-[#1DB954] focus:ring-[#1DB954] w-4 h-4 border-gray-300" />
                                    <span className="text-sm text-[#0f172a] group-hover:text-[#1DB954] transition-colors">Ticket is transferable</span>
                                </label>
                                <div className="pl-7">
                                    <input
                                        type="number"
                                        defaultValue={3}
                                        className="w-full px-4 py-2.5 rounded-lg border border-[#e2e8f0] bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1DB954]/20 focus:border-[#1DB954] transition-all"
                                        placeholder="Max transfers allowed"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer Buttons */}
            <div className="p-6 border-t border-[#e2e8f0] flex justify-between bg-slate-50/50 rounded-b-2xl">
                <div className="flex items-center gap-4">
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="px-6 py-2.5 bg-[#1DB954] hover:bg-[#1ed760] disabled:opacity-70 text-white font-medium rounded-lg shadow-sm shadow-green-200 transition-colors flex items-center gap-2"
                    >
                        {isSaving ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" /> Saving...
                            </>
                        ) : (
                            <>
                                Save & Publish
                            </>
                        )}
                    </button>
                    {lastSaved && (
                        <span className="text-xs text-[#64748b] flex items-center gap-1.5 animate-in fade-in slide-in-from-left-2">
                            <CheckCircle className="w-3.5 h-3.5 text-[#1DB954]" />
                            Saved {lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                    )}
                </div>
                <div className="flex gap-3">
                    <button className="px-6 py-2.5 bg-white border border-[#e2e8f0] hover:bg-slate-50 text-[#0f172a] font-medium rounded-lg transition-colors">
                        Save Draft
                    </button>
                    <button className="px-6 py-2.5 bg-white border border-[#e2e8f0] hover:bg-red-50 hover:text-red-600 hover:border-red-200 text-[#64748b] font-medium rounded-lg transition-colors">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
