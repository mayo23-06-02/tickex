"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { Search, User, LogOut, Home, Ticket, Settings } from "lucide-react";

export function CustomerHeader() {
    const { data: session } = useSession();

    const handleSignOut = async () => {
        await signOut({ callbackUrl: '/' });
    };

    return (
        <header className="sticky top-0 z-40 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <Image
                            src="/logo.svg"
                            alt="Tickex"
                            width={100}
                            height={30}
                            className="h-8 w-auto"
                            priority
                        />
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        <Link
                            href="/events"
                            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Browse Events
                        </Link>
                        <Link
                            href="/my-orders"
                            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                        >
                            My Orders
                        </Link>
                    </nav>

                    {/* Right Side */}
                    <div className="flex items-center gap-4">
                        {/* Search */}
                        <div className="hidden lg:block relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search events..."
                                className="pl-10 pr-4 py-2 w-64 bg-muted border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20"
                            />
                        </div>

                        {/* User Menu */}
                        {session?.user ? (
                            <div className="relative group">
                                <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors">
                                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary text-sm font-medium ring-2 ring-primary/10">
                                        {session.user.name ? session.user.name.substring(0, 2).toUpperCase() : 'U'}
                                    </div>
                                    <span className="hidden sm:block text-sm font-medium text-foreground">
                                        {session.user.name}
                                    </span>
                                </button>

                                {/* Dropdown */}
                                <div className="absolute right-0 top-full mt-2 w-56 bg-card border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                                    <div className="p-3 border-b border-border">
                                        <p className="text-sm font-medium text-foreground">{session.user.name || 'User'}</p>
                                        <p className="text-xs text-muted-foreground truncate">{session.user.email}</p>
                                    </div>
                                    <div className="p-2">
                                        <Link
                                            href="/events"
                                            className="flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-colors"
                                        >
                                            <Home className="w-4 h-4" />
                                            Browse Events
                                        </Link>
                                        <Link
                                            href="/my-orders"
                                            className="flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-colors"
                                        >
                                            <Ticket className="w-4 h-4" />
                                            My Orders
                                        </Link>
                                        <Link
                                            href="/settings"
                                            className="flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-colors"
                                        >
                                            <Settings className="w-4 h-4" />
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
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link
                                    href="/auth/login"
                                    className="px-4 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    href="/auth/register"
                                    className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 rounded-lg transition-all"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
