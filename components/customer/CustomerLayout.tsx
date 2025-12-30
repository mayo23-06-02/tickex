"use client";

import { CustomerHeader } from "./CustomerHeader";

export function CustomerLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-background">
            <CustomerHeader />
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>

            {/* Footer */}
            <footer className="border-t border-border bg-card mt-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="font-semibold text-foreground mb-4">Tickex</h3>
                            <p className="text-sm text-muted-foreground">
                                Your trusted platform for event tickets and experiences.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li><a href="/events" className="hover:text-foreground transition-colors">Browse Events</a></li>
                                <li><a href="/my-orders" className="hover:text-foreground transition-colors">My Orders</a></li>
                                <li><a href="/help" className="hover:text-foreground transition-colors">Help Center</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-foreground mb-4">Support</h4>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li><a href="/contact" className="hover:text-foreground transition-colors">Contact Us</a></li>
                                <li><a href="/faq" className="hover:text-foreground transition-colors">FAQ</a></li>
                                <li><a href="/refunds" className="hover:text-foreground transition-colors">Refund Policy</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li><a href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
                                <li><a href="/terms" className="hover:text-foreground transition-colors">Terms of Service</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
                        <p>&copy; {new Date().getFullYear()} Tickex. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
