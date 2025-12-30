"use client";

import Link from "next/link";
import Image from "next/image";
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
  HelpCircle,
  Palette,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";

const menuItems = [
  { icon: LayoutGrid, label: "Dashboard", href: "/dashboard" },
  { icon: CalendarDays, label: "Events", href: "/dashboard/events" },
  { icon: Calendar, label: "Bookings", href: "/bookings" },
  {
    icon: Ticket,
    label: "Ticket Designer",
    href: "/tickets",
    description: "Design & manage tickets",
  },
  { icon: DollarSign, label: "Financials", href: "/financials" },
  { icon: Users, label: "Customers", href: "/customers" },
  { icon: TrendingUp, label: "Promotions", href: "/promotions" },
  { icon: Clock, label: "Event Timeline", href: "/event-timeline" },
  { icon: Palette, label: "Branding & Design", href: "/branding" },
  { icon: MessageSquare, label: "Communications", href: "/communications" },
  { icon: ImageIcon, label: "Gallery", href: "/gallery" },
];

interface SidebarProps {
  hasEvents?: boolean | null;
}

export function Sidebar({ hasEvents }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-card border-r border-border flex flex-col z-50">
      <div className="p-6">
        <Image
          src="/logo.svg"
          alt="tickex"
          width={120}
          height={36}
          className="h-9 w-auto"
          priority
        />
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          // Disable all tabs except Dashboard if hasEvents is false.
          // If hasEvents is null (loading), we don't disable yet or maybe we do?
          // Let's only disable if strictly false.
          const isDisabled = hasEvents === false && item.href !== "/dashboard";

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-disabled={isDisabled}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors relative group 
                                ${
                                  isDisabled
                                    ? "opacity-40 pointer-events-none grayscale"
                                    : ""
                                }
                                ${
                                  isActive
                                    ? "text-primary-foreground"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-primary rounded-lg shadow-sm"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <item.icon
                className={`w-5 h-5 relative z-10 ${
                  isActive
                    ? "text-primary-foreground"
                    : "text-muted-foreground group-hover:text-foreground"
                }`}
              />
              <span className="relative z-10">{item.label}</span>
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-border space-y-1">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
          <HelpCircle className="w-5 h-5" />
          <span>Help</span>
        </button>
      </div>

      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
            <Users className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              Organizer
            </p>
            <p className="text-xs text-muted-foreground truncate">
              View Account
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
