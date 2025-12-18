"use client";

import { Check, Circle } from "lucide-react";

interface TimelineItem {
    status: "completed" | "active" | "pending";
    title: string;
    subtitle: string;
}

export function TimelineSection({ items = [] as TimelineItem[] }: { items?: TimelineItem[] }) {
    const empty = !items || items.length === 0;
    return (
        <div className="bg-card rounded-xl p-6 shadow-sm border border-border h-full">
            <h2 className="text-sm font-semibold text-foreground mb-6">Event Timeline</h2>

            {empty ? (
                <div className="flex flex-col items-center justify-center gap-3 text-center py-10">
                    <p className="text-sm text-muted-foreground">No milestones yet</p>
                    <a href="/event-timeline" className="px-4 py-2 rounded-lg bg-primary text-white text-sm hover:bg-primary/90 transition-colors">
                        Start Planning
                    </a>
                </div>
            ) : (
                <div className="relative">
                    <div className="absolute left-[11px] top-2 bottom-2 w-px bg-border"></div>
                    <div className="space-y-8 relative">
                        {items.map((item, i) => (
                            <div key={i} className="flex gap-4 relative">
                                <div className="relative z-10 flex-shrink-0">
                                    {item.status === "completed" && (
                                        <div className="w-6 h-6 rounded-full bg-success flex items-center justify-center text-primary-foreground">
                                            <Check className="w-3.5 h-3.5" />
                                        </div>
                                    )}
                                    {item.status === "active" && (
                                        <div className="w-6 h-6 rounded-full bg-card border-2 border-primary flex items-center justify-center">
                                            <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></div>
                                        </div>
                                    )}
                                    {item.status === "pending" && (
                                        <div className="w-6 h-6 rounded-full bg-muted border border-border flex items-center justify-center text-muted-foreground">
                                            <Circle className="w-3.5 h-3.5 fill-current" />
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <h3 className={`text-sm font-medium ${item.status === "pending" ? "text-muted-foreground" : "text-foreground"}`}>
                                        {item.title}
                                    </h3>
                                    <p className={`text-xs ${item.status === "active" ? "text-primary" : "text-muted-foreground"}`}>
                                        {item.subtitle}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
