"use client";

import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { SessionProvider } from "next-auth/react";
import { checkOrganizerHasEvents } from "@/app/actions/organizer";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
  userName,
  userEmail,
}: {
  children: React.ReactNode;
  userName?: string;
  userEmail?: string;
}) {
  const [hasEvents, setHasEvents] = useState<boolean | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    async function check() {
      const has = await checkOrganizerHasEvents();
      setHasEvents(has);
    }
    check();
  }, []);

  useEffect(() => {
    if (hasEvents === false) {
      // List of allowed paths when no events exist
      const allowedPaths = [
        "/dashboard",
        "/events/create",
        "/dashboard/events/create",
      ];

      // Check if current path is allowed
      // We use startsWith for sub-routes of allowed paths if needed,
      // but for now exact match or specific sub-check
      const isAllowed = allowedPaths.some(
        (path) => pathname === path || pathname?.startsWith(path)
      );

      if (!isAllowed) {
        router.push("/dashboard");
      }
    }
  }, [hasEvents, pathname, router]);

  return (
    <SessionProvider>
      <div className="min-h-screen bg-background">
        <Sidebar hasEvents={hasEvents} />
        <div className="ml-64">
          <Header />
          <main className="p-8">{children}</main>
        </div>
      </div>
    </SessionProvider>
  );
}
