"use client";

import { Search, Moon, Bell, MessageSquare, Plus, LogOut } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/Button";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

export function Header() {
    const pathname = usePathname();
    const { data: session } = useSession();
    const [stats, setStats] = useState<any>(null);

    // Get page title from pathname
    const getPageTitle = () => {
        const segments = pathname.split('/').filter(Boolean);
        if (segments.length === 0) return "Dashboard";
        return segments[segments.length - 1]
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    const handleSignOut = async () => {
        await signOut({ callbackUrl: '/' });
    };

    // Fetch header stats client-side (optional - can be removed if not needed)
    useEffect(() => {
        // You can fetch stats here if needed
        // For now, we'll skip it to avoid server-side dependencies
    }, [session]);

    return (
        <header className="h-[72px] bg-card border-b border-border px-8 flex items-center justify-between sticky top-0 z-40">
            {/* Left: Breadcrumbs/Context */}
            <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Link href="/dashboard" className="hover:text-foreground transition-colors">
                        Dashboard
                    </Link>
                    {pathname !== '/dashboard' && (
                        <>
                            <span>›</span>
                            <span className="font-medium text-foreground">{getPageTitle()}</span>
                        </>
                    )}
                </div>
            </div>

            {/* Center: Quick Stats (Optional - hidden for now) */}
            {stats && (
                <div className="hidden lg:flex items-center gap-8">
                    {stats.ticketsSold !== undefined && stats.totalTickets !== undefined && (
                        <div className="text-right">
                            <p className="text-xs text-muted-foreground mb-0.5">Tickets Sold</p>
                            <p className="text-sm font-bold text-foreground">
                                {stats.ticketsSold}/{stats.totalTickets}
                            </p>
                        </div>
                    )}
                    {stats.revenue !== undefined && (
                        <div className="text-right">
                            <p className="text-xs text-muted-foreground mb-0.5">Revenue</p>
                            <p className="text-sm font-bold text-success">
                                SZL {stats.revenue.toLocaleString()}
                            </p>
                        </div>
                    )}
                    {stats.daysToEvent !== undefined && (
                        <div className="text-right">
                            <p className="text-xs text-muted-foreground mb-0.5">Next Event</p>
                            <p className="text-sm font-bold text-foreground">
                                {stats.daysToEvent}d
                            </p>
                        </div>
                    )}
                </div>
            )}

            {/* Right: Actions */}
            <div className="flex items-center gap-4">
                {/* Search */}
                <div className="relative hidden md:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="pl-10 pr-4 py-2 w-64 bg-muted border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring transition-all"
                    />
                </div>

                {/* Quick Actions */}
                <div className="flex items-center gap-2">
                    <Button href="/events/create" variant="primary" size="sm">
                        <Plus className="w-4 h-4" />
                        Create
                    </Button>
                    <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors">
                        <Moon className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors relative">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full"></span>
                    </button>
                    <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors">
                        <MessageSquare className="w-5 h-5" />
                    </button>

                    {/* User Menu */}
                    <div className="relative group">
                        <button className="flex items-center gap-2">
                            <div className="w-9 h-9 bg-primary/20 rounded-full flex items-center justify-center text-primary text-sm font-medium ring-2 ring-primary/10">
                                {session?.user?.name ? session.user.name.substring(0, 2).toUpperCase() : 'U'}
                            </div>
                        </button>

                        {/* Dropdown Menu */}
                        <div className="absolute right-0 top-full mt-2 w-64 bg-card border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                            <div className="p-4 border-b border-border">
                                <p className="text-sm font-medium text-foreground">{session?.user?.name || 'User'}</p>
                                <p className="text-xs text-muted-foreground truncate">{session?.user?.email || 'user@example.com'}</p>
                            </div>
                            <div className="p-2">
                                <Link
                                    href="/dashboard"
                                    className="block px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-colors"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href="/my-orders"
                                    className="block px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-colors"
                                >
                                    My Orders
                                </Link>
                                <Link
                                    href="/settings"
                                    className="block px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-colors"
                                >
                                    Settings
                                </Link>
                                <button
                                    onClick={handleSignOut}
                                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-error hover:bg-muted rounded-md transition-colors"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
