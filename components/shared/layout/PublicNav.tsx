"use client";

import Link from "next/link";
import { Ticket, ShoppingBag, User } from "lucide-react";

export function PublicNav() {
    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#1DB954] to-[#1ed760] rounded-xl flex items-center justify-center shadow-lg shadow-green-200">
                            <Ticket className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-black text-[#0f172a]">TickEx</span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="flex items-center gap-6">
                        <Link
                            href="/"
                            className="text-sm font-medium text-slate-600 hover:text-[#0f172a] transition-colors"
                        >
                            Browse Events
                        </Link>

                        <Link
                            href="/my-orders"
                            className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-[#0f172a] transition-colors"
                        >
                            <ShoppingBag className="w-4 h-4" />
                            My Orders
                        </Link>

                        <div className="h-6 w-px bg-slate-200" />

                        <Link
                            href="/auth/customer/login"
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                            <User className="w-4 h-4" />
                            Sign In
                        </Link>

                        <Link
                            href="/auth/organizer/login"
                            className="px-4 py-2 bg-[#1DB954] hover:bg-[#1ed760] text-white text-sm font-bold rounded-lg shadow-md shadow-green-200 transition-all"
                        >
                            For Organizers
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
