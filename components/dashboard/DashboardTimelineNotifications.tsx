"use client";

import { useState } from "react";
import { TimelineGantt } from "@/components/timeline/TimelineGantt";
import {
  Bell,
  MessageSquare,
  Mail,
  Send,
  Clock,
  CheckCircle2,
  AlertCircle,
  MoreHorizontal,
} from "lucide-react";
import { motion } from "framer-motion";

interface Notification {
  id: string;
  type: "email" | "whatsapp" | "sms" | "system";
  title: string;
  message: string;
  time: string;
  status: "unread" | "read";
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "email",
    title: "Campaign Sent",
    message: "Your 'Early Bird' email campaign was sent to 1,240 attendees.",
    time: "2 mins ago",
    status: "unread",
  },
  {
    id: "2",
    type: "whatsapp",
    title: "New Broadcast",
    message: "WhatsApp reminder scheduled for VIP ticket holders.",
    time: "1 hour ago",
    status: "read",
  },
  {
    id: "3",
    type: "system",
    title: "Milestone Reached",
    message: "Venue contract signed and uploaded to timeline.",
    time: "3 hours ago",
    status: "read",
  },
  {
    id: "4",
    type: "sms",
    title: "SMS Alert",
    message: "Payout confirmation sent to vendor #042.",
    time: "5 hours ago",
    status: "read",
  },
];

export function DashboardTimelineNotifications({
  eventId,
}: {
  eventId?: string;
}) {
  const [view, setView] = useState<"gantt" | "notifications">("gantt");

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden flex flex-col h-[600px]">
      {/* Header / Tabs */}
      <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-slate-50/50">
        <div className="flex items-center gap-1 p-1 bg-muted rounded-lg">
          <button
            onClick={() => setView("gantt")}
            className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all ${
              view === "gantt"
                ? "bg-white text-primary shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Timeline (Gantt)
          </button>
          <button
            onClick={() => setView("notifications")}
            className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all flex items-center gap-2 ${
              view === "notifications"
                ? "bg-white text-primary shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Notifications
            <span className="w-4 h-4 bg-primary text-white text-[10px] rounded-full flex items-center justify-center">
              1
            </span>
          </button>
        </div>
        <button className="p-2 hover:bg-muted rounded-full transition-colors">
          <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto p-0">
        {view === "gantt" ? (
          <div className="h-full">
            <TimelineGantt eventId={eventId} />
          </div>
        ) : (
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-foreground">
                Recent Activity
              </h3>
              <button className="text-xs text-primary font-bold hover:underline">
                Mark all read
              </button>
            </div>
            <div className="space-y-3">
              {mockNotifications.map((n, i) => (
                <motion.div
                  key={n.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`p-4 rounded-xl border transition-all ${
                    n.status === "unread"
                      ? "bg-primary/3 border-primary/20"
                      : "bg-white border-border"
                  }`}
                >
                  <div className="flex gap-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        n.type === "email"
                          ? "bg-blue-100 text-blue-600"
                          : n.type === "whatsapp"
                          ? "bg-green-100 text-green-600"
                          : n.type === "sms"
                          ? "bg-orange-100 text-orange-600"
                          : "bg-purple-100 text-purple-600"
                      }`}
                    >
                      {n.type === "email" && <Mail className="w-5 h-5" />}
                      {n.type === "whatsapp" && (
                        <MessageSquare className="w-5 h-5" />
                      )}
                      {n.type === "sms" && <Send className="w-5 h-5" />}
                      {n.type === "system" && <Bell className="w-5 h-5" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-sm text-foreground truncate">
                          {n.title}
                        </h4>
                        <span className="text-[10px] font-medium text-muted-foreground flex items-center gap-1 whitespace-nowrap">
                          <Clock className="w-3 h-3" />
                          {n.time}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-snug">
                        {n.message}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <button className="w-full py-3 text-sm font-bold text-muted-foreground hover:text-primary transition-colors hover:bg-muted rounded-xl border border-dashed border-border mt-4">
              View All Notifications
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
