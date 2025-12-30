import Link from "next/link";
import { Plus, Calendar, Music, Mic2 } from "lucide-react";
import { Button } from "@/components/shared/ui/Button";

export function EmptyStateDashboard() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8 p-8 animate-in fade-in zoom-in duration-500">
      {/* Visual Decoration */}
      <div className="relative">
        <div className="absolute -inset-4 bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 rounded-full blur-xl animate-pulse" />
        <div className="relative bg-card p-6 rounded-3xl shadow-2xl border border-border/50">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-violet-100 dark:bg-violet-900/30 rounded-2xl">
              <Calendar className="w-8 h-8 text-violet-600 dark:text-violet-400" />
            </div>
            <div className="p-3 bg-fuchsia-100 dark:bg-fuchsia-900/30 rounded-2xl">
              <Music className="w-8 h-8 text-fuchsia-600 dark:text-fuchsia-400" />
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl">
              <Mic2 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center">
              <Plus className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md space-y-2">
        <h2 className="text-3xl font-black tracking-tight bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">
          No Events Yet
        </h2>
        <p className="text-muted-foreground text-lg">
          Ready to launch your first experience? create an event and start
          selling tickets in minutes.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          href="/events/create"
          size="lg"
          className="rounded-full px-8 h-14 text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
        >
          <Plus className="mr-2 w-5 h-5" />
          Create Your First Event
        </Button>
      </div>

      {/* Quick Tips or Steps could go here */}
      <div className="grid grid-cols-3 gap-8 mt-12 text-sm text-muted-foreground/80">
        <div className="flex flex-col items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-muted flex items-center justify-center font-bold">
            1
          </span>
          <span>Set Details</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-muted flex items-center justify-center font-bold">
            2
          </span>
          <span>Add Tickets</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-muted flex items-center justify-center font-bold">
            3
          </span>
          <span>Publish</span>
        </div>
      </div>
    </div>
  );
}
