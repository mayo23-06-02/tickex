"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutGrid,
    Calendar,
    Ticket,
    DollarSign,
    Users,
    TrendingUp,
    CalendarDays,
    MessageSquare,
    Image as ImageIcon,
    Settings,
    HelpCircle
} from "lucide-react";
import { motion } from "framer-motion";

const menuItems = [
    { icon: LayoutGrid, label: "Dashboard", href: "/" },
    { icon: Calendar, label: "Bookings", href: "/bookings" },
    { icon: Ticket, label: "Tickets", href: "/tickets" },
    { icon: DollarSign, label: "Financials", href: "/financials" },
    { icon: Users, label: "Customers", href: "/customers" },
    { icon: TrendingUp, label: "Promotions", href: "/promotions" },
    { icon: CalendarDays, label: "Events", href: "/events" },
    { icon: MessageSquare, label: "Communications", href: "/communications" },
    { icon: ImageIcon, label: "Gallery", href: "/gallery" },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-[#e2e8f0] flex flex-col z-50">
            <div className="p-6 flex items-center gap-2">
                <div className="w-8 h-8 bg-[#8B5CF6] rounded-lg flex items-center justify-center text-white font-bold text-xl">
                    t
                </div>
                <span className="text-2xl font-bold text-[#8B5CF6]">tickex</span>
            </div>

            <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors relative group ${isActive
                                ? "text-white"
                                : "text-[#64748b] hover:bg-slate-50 hover:text-[#0f172a]"
                                }`}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-[#a855f7] rounded-lg shadow-sm"
                                    initial={false}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            <item.icon className={`w-5 h-5 relative z-10 ${isActive ? "text-white" : ""}`} />
                            <span className="relative z-10">{item.label}</span>
                        </Link>
                    );
                })}
            </div>

            <div className="p-4 border-t border-[#e2e8f0] space-y-1">
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#64748b] hover:bg-slate-50 hover:text-[#0f172a] transition-colors">
                    <Settings className="w-5 h-5" />
                    <span>Settings</span>
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#64748b] hover:bg-slate-50 hover:text-[#0f172a] transition-colors">
                    <HelpCircle className="w-5 h-5" />
                    <span>Help</span>
                </button>
            </div>

            <div className="p-4 border-t border-[#e2e8f0]">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#a855f7] flex items-center justify-center text-white font-medium">
                        <Users className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#0f172a] truncate">Organizer</p>
                        <p className="text-xs text-[#64748b] truncate">View Account</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
