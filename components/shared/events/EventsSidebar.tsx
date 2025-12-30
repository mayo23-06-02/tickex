"use client";

import { Music, Briefcase, Trophy, Theater, Plus, Copy, Download, Clock } from "lucide-react";
import { useRouter } from "next/navigation";

export function EventsSidebar() {
    const router = useRouter();

    const templates = [
        { icon: Music, label: "Music Festival", setup: "2 min setup", color: "text-purple-500" },
        { icon: Briefcase, label: "Conference & Expo", setup: "7 min setup", color: "text-blue-500" },
        { icon: Trophy, label: "Sports Game", setup: "4 min setup", color: "text-orange-500" },
        { icon: Theater, label: "Theater Show", setup: "6 min setup", color: "text-pink-500" },
    ];

    const recentActivity = [
        { event: "Neon Dreams Festival", action: "Event Modified", time: "2 days ago" },
        { event: "Tech Conference", action: "Tickets updated", time: "3 days ago" },
    ];

    return (
        <div className="w-80 flex-shrink-0 space-y-6">
            {/* Templates & Tools */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e2e8f0]">
                <h3 className="text-sm font-bold text-[#0f172a] mb-4">Templates & Tools</h3>

                <div className="space-y-3 mb-6">
                    <h4 className="text-xs font-semibold text-[#64748b] uppercase tracking-wider">Event Templates</h4>
                    {templates.map((template, i) => (
                        <button
                            key={i}
                            onClick={() => router.push("/events/create")}
                            className="w-full flex items-center gap-3 p-3 rounded-lg border border-[#e2e8f0] hover:border-[#1DB954] hover:bg-green-50/50 transition-all group"
                        >
                            <div className={`w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center ${template.color} group-hover:bg-white transition-colors`}>
                                <template.icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1 text-left">
                                <div className="text-sm font-semibold text-[#0f172a]">{template.label}</div>
                                <div className="text-xs text-[#64748b]">{template.setup}</div>
                            </div>
                        </button>
                    ))}
                </div>

                <div className="space-y-2 pt-4 border-t border-[#e2e8f0]">
                    <h4 className="text-xs font-semibold text-[#64748b] uppercase tracking-wider mb-3">Quick Create</h4>
                    <button
                        onClick={() => router.push("/events/create")}
                        className="w-full flex items-center gap-2 px-4 py-2.5 bg-slate-50 hover:bg-slate-100 text-[#0f172a] rounded-lg text-sm font-medium transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        From Scratch
                    </button>
                    <button className="w-full flex items-center gap-2 px-4 py-2.5 bg-slate-50 hover:bg-slate-100 text-[#0f172a] rounded-lg text-sm font-medium transition-colors">
                        <Copy className="w-4 h-4" />
                        Duplicate Last Event
                    </button>
                    <button className="w-full flex items-center gap-2 px-4 py-2.5 bg-slate-50 hover:bg-slate-100 text-[#0f172a] rounded-lg text-sm font-medium transition-colors">
                        <Download className="w-4 h-4" />
                        Import Event
                    </button>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e2e8f0]">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-bold text-[#0f172a]">Recent Activity</h3>
                    <button className="text-xs text-[#1DB954] font-semibold hover:underline">
                        Clear All
                    </button>
                </div>

                <div className="space-y-3">
                    {recentActivity.map((activity, i) => (
                        <div key={i} className="p-3 bg-slate-50 rounded-lg border border-[#e2e8f0]">
                            <div className="flex items-start gap-2 mb-1">
                                <Clock className="w-3.5 h-3.5 text-[#64748b] mt-0.5 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-[#0f172a] truncate">{activity.action}</p>
                                    <p className="text-xs text-[#64748b] truncate">{activity.event}</p>
                                </div>
                            </div>
                            <p className="text-xs text-[#94a3b8] pl-5">{activity.time}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
