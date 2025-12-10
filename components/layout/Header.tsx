"use client";

import { Search, Moon, Bell, MessageSquare, ChevronDown, Plus } from "lucide-react";
import Link from "next/link";


export function Header() {
    return (
        <header className="h-[72px] bg-white border-b border-[#e2e8f0] px-8 flex items-center justify-between sticky top-0 z-40">
            {/* Left: Breadcrumbs/Context */}
            <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-[#e2e8f0] rounded-md text-sm font-medium text-[#0f172a] hover:bg-slate-100 transition-colors">
                    Neon Dreams Festival
                    <ChevronDown className="w-4 h-4 text-[#64748b]" />
                </button>
                <div className="flex items-center gap-2 text-sm text-[#64748b]">
                    <span>Dashboard</span>
                    <span>›</span>
                    <span className="font-medium text-[#0f172a]">Neon Dreams Festival</span>
                </div>
            </div>

            {/* Center: Quick Stats */}
            <div className="hidden lg:flex items-center gap-8">
                <div className="text-right">
                    <p className="text-xs text-[#64748b] mb-0.5">Tickets Sold</p>
                    <p className="text-sm font-bold text-[#0f172a]">842/1,200</p>
                </div>
                <div className="text-right">
                    <p className="text-xs text-[#64748b] mb-0.5">Revenue</p>
                    <p className="text-sm font-bold text-[#1DB954]">SZL 42,100</p>
                </div>
                <div className="text-right">
                    <p className="text-xs text-[#64748b] mb-0.5">Time to Event</p>
                    <p className="text-sm font-bold text-[#0f172a]">14d 6h 23m</p>
                </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-4">
                <button className="p-2 text-[#64748b] hover:text-[#0f172a] hover:bg-slate-50 rounded-full transition-colors">
                    <Search className="w-5 h-5" />
                </button>
                <button className="p-2 text-[#64748b] hover:text-[#0f172a] hover:bg-slate-50 rounded-full transition-colors">
                    <Moon className="w-5 h-5" />
                </button>

                <Link href="/events/create" className="flex items-center gap-2 bg-[#1DB954] hover:bg-[#1ed760] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm shadow-green-200">
                    <Plus className="w-4 h-4" />
                    Create
                </Link>

                <div className="flex items-center gap-2 pl-2 border-l border-[#e2e8f0]">
                    <button className="p-2 text-[#64748b] hover:text-[#0f172a] hover:bg-slate-50 rounded-full transition-colors relative">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                    </button>
                    <button className="p-2 text-[#64748b] hover:text-[#0f172a] hover:bg-slate-50 rounded-full transition-colors">
                        <MessageSquare className="w-5 h-5" />
                    </button>
                    <div className="w-9 h-9 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                        OL
                    </div>
                </div>
            </div>
        </header>
    );
}
