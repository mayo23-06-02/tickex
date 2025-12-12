"use client";

import { Sparkles } from "lucide-react";

export function PredictiveForecast() {
    return (
        <div className="bg-card rounded-xl p-6 shadow-sm border border-border h-full flex flex-col">
            <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-4 h-4 text-primary" />
                <h2 className="text-sm font-semibold text-foreground">Predictive Forecast</h2>
            </div>

            <div className="space-y-6 flex-1">
                {/* Sellout Probability */}
                <div className="bg-muted/50 rounded-lg p-4 border border-border">
                    <div className="flex justify-between items-end mb-2">
                        <span className="text-sm font-medium text-foreground">Sellout Probability</span>
                        <span className="text-lg font-bold text-success">94%</span>
                    </div>
                    <div className="h-2 bg-input rounded-full overflow-hidden">
                        <div className="h-full bg-success rounded-full" style={{ width: '94%' }}></div>
                    </div>
                </div>

                {/* Revenue Forecast */}
                <div className="bg-muted/50 rounded-lg p-4 border border-border">
                    <div className="mb-1 text-sm font-medium text-foreground">Revenue Forecast</div>
                    <div className="text-2xl font-bold text-foreground mb-1">SZL 58,400</div>
                    <div className="text-xs text-muted-foreground">Expected total revenue</div>
                </div>

                {/* Peak Sales Times */}
                <div>
                    <div className="text-sm font-medium text-foreground mb-3">Peak Sales Times</div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-3 text-xs">
                            <span className="w-24 text-muted-foreground">Friday 6-8 PM</span>
                            <div className="flex-1 h-2 bg-input rounded-full overflow-hidden">
                                <div className="h-full bg-primary rounded-full" style={{ width: '85%' }}></div>
                            </div>
                            <span className="text-foreground font-medium w-8 text-right">High</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs">
                            <span className="w-24 text-muted-foreground">Saturday 2-4 PM</span>
                            <div className="flex-1 h-2 bg-input rounded-full overflow-hidden">
                                <div className="h-full bg-primary rounded-full" style={{ width: '60%' }}></div>
                            </div>
                            <span className="text-foreground font-medium w-8 text-right">Med</span>
                        </div>
                    </div>
                </div>

                {/* Recommended Actions */}
                <div>
                    <div className="text-sm font-medium text-foreground mb-3">Recommended Actions</div>
                    <div className="space-y-2">
                        <div className="flex items-start gap-2 bg-muted/50 p-2.5 rounded-lg border border-border">
                            <div className="w-1 h-1 rounded-full bg-foreground mt-1.5 flex-shrink-0"></div>
                            <span className="text-xs text-muted-foreground">Send email blast on Friday at 5 PM</span>
                        </div>
                        <div className="flex items-start gap-2 bg-muted/50 p-2.5 rounded-lg border border-border">
                            <div className="w-1 h-1 rounded-full bg-foreground mt-1.5 flex-shrink-0"></div>
                            <span className="text-xs text-muted-foreground">Create urgency: Only 358 tickets left</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
