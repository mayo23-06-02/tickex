"use client";

import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { SessionProvider } from "next-auth/react";

export default function DashboardLayout({
    children,
    userName,
    userEmail,
}: {
    children: React.ReactNode;
    userName?: string;
    userEmail?: string;
}) {
    return (
        <SessionProvider>
            <div className="min-h-screen bg-background">
                <Sidebar />
                <div className="ml-64">
                    <Header />
                    <main className="p-8">
                        {children}
                    </main>
                </div>
            </div>
        </SessionProvider>
    );
}
