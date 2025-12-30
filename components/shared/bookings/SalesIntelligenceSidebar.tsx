"use client";

import { Lightbulb, HelpCircle } from "lucide-react";

interface SalesIntelligenceSidebarProps {
    salesData?: Array<{ date: string; amount: number }>;
    funnelData?: {
        websiteVisitors: number;
        ticketPage: number;
        checkout: number;
        purchase: number;
        conversionRate: number;
    };
    loading?: boolean;
}

export function SalesIntelligenceSidebar({ salesData = [], funnelData, loading = false }: SalesIntelligenceSidebarProps) {
    // Calculate max for chart scaling
    const maxAmount = salesData.length > 0 ? Math.max(...salesData.map(d => d.amount)) : 1;

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="animate-pulse">
                    <div className="h-6 bg-muted rounded w-32 mb-4"></div>
                    <div className="h-40 bg-muted rounded"></div>
                </div>
                <div className="animate-pulse">
                    <div className="h-6 bg-muted rounded w-32 mb-4"></div>
                    <div className="space-y-3">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-12 bg-muted rounded"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Sales Over Time */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-foreground">Sales Over Time</h3>
                    <div className="flex bg-muted rounded-lg p-0.5">
                        <button className="px-2 py-0.5 text-xs font-medium text-muted-foreground">Day</button>
                        <button className="px-2 py-0.5 text-xs font-medium bg-card rounded shadow-sm text-foreground">Week</button>
                        <button className="px-2 py-0.5 text-xs font-medium text-muted-foreground">Month</button>
                    </div>
                </div>

                {/* Bar Chart */}
                <div className="h-40 flex items-end gap-2">
                    {salesData.length > 0 ? (
                        salesData.map((data, i) => {
                            const height = maxAmount > 0 ? (data.amount / maxAmount) * 100 : 0;
                            return (
                                <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                                    <div
                                        className="w-full bg-primary rounded-t-sm opacity-20 group-hover:opacity-100 transition-opacity relative"
                                        style={{ height: `${height}%`, minHeight: data.amount > 0 ? '4px' : '0' }}
                                    >
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-sm">
                                            SZL {data.amount.toLocaleString()}
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
                            No sales data
                        </div>
                    )}
                </div>
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                    {salesData.map((data, i) => (
                        <span key={i}>{data.date.split(' ')[1] || data.date.substring(0, 3)}</span>
                    ))}
                </div>
            </div>

            {/* Conversion Funnel */}
            {funnelData && (
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-foreground">Conversion Funnel</h3>
                        <button className="text-xs text-primary font-medium hover:underline">Optimize →</button>
                    </div>

                    <div className="space-y-4">
                        {/* Website Visitors */}
                        <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                                <span className="text-muted-foreground">Website Visitors</span>
                                <span className="font-medium text-foreground">{funnelData.websiteVisitors.toLocaleString()}</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                                <div className="h-full bg-primary rounded-full w-full"></div>
                            </div>
                        </div>

                        {/* Ticket Page */}
                        <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                                <span className="text-muted-foreground">Ticket Page</span>
                                <span className="font-medium text-foreground">{funnelData.ticketPage.toLocaleString()}</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-primary rounded-full"
                                    style={{ width: `${(funnelData.ticketPage / funnelData.websiteVisitors) * 100}%` }}
                                ></div>
                            </div>
                            <div className="text-[10px] text-error font-medium">
                                -{Math.round((1 - funnelData.ticketPage / funnelData.websiteVisitors) * 100)}% drop-off
                            </div>
                        </div>

                        {/* Checkout */}
                        <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                                <span className="text-muted-foreground">Checkout</span>
                                <span className="font-medium text-foreground">{funnelData.checkout.toLocaleString()}</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-primary rounded-full"
                                    style={{ width: `${(funnelData.checkout / funnelData.websiteVisitors) * 100}%` }}
                                ></div>
                            </div>
                            <div className="text-[10px] text-error font-medium">
                                -{Math.round((1 - funnelData.checkout / funnelData.websiteVisitors) * 100)}% drop-off
                            </div>
                        </div>

                        {/* Purchase */}
                        <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                                <span className="text-muted-foreground">Purchase</span>
                                <span className="font-medium text-foreground">{funnelData.purchase.toLocaleString()}</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-primary rounded-full"
                                    style={{ width: `${(funnelData.purchase / funnelData.websiteVisitors) * 100}%` }}
                                ></div>
                            </div>
                            <div className="text-[10px] text-success font-medium">
                                {funnelData.conversionRate}% conversion rate
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Optimization Tip */}
            <div className="bg-info/10 border border-info/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-info flex-shrink-0 mt-0.5" />
                    <div>
                        <h4 className="text-sm font-semibold text-foreground mb-1">Optimization Tip</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            {funnelData && funnelData.conversionRate < 20
                                ? "Your conversion rate is below average. Consider simplifying the checkout process and adding trust signals."
                                : "Great conversion rate! Keep monitoring and testing to maintain performance."}
                        </p>
                    </div>
                </div>
            </div>

            {/* Top Performers */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-foreground">Real-Time Updates</h3>
                    <HelpCircle className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="text-xs text-muted-foreground">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                        <span>Auto-refreshing every 30 seconds</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
