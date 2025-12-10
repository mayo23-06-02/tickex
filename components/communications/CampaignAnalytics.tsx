"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Eye, MousePointer, Users, DollarSign } from "lucide-react";

interface AnalyticsData {
    predictedPerformance: {
        openRate: number;
        clickRate: number;
        expectedReach: number;
    };
    similarCampaigns: Array<{
        name: string;
        date: string;
        openRate: string;
        clickRate: string;
    }>;
    roi: {
        cost: number;
        salesGenerated: number;
        roi: string;
    };
    compliance: Array<{
        label: string;
        status: boolean;
    }>;
    costEstimate: Array<{
        channel: string;
        recipients: number;
        cost: number;
    }>;
}

export function CampaignAnalytics() {
    const analytics: AnalyticsData = {
        predictedPerformance: {
            openRate: 42,
            clickRate: 12,
            expectedReach: 842
        },
        similarCampaigns: [
            { name: "Event Reminder (Feb)", date: "Feb", openRate: "81.6%", clickRate: "29.1%" },
            { name: "Last Chance (Jan)", date: "Jan", openRate: "76.3%", clickRate: "34.2%" }
        ],
        roi: {
            cost: 12.63,
            salesGenerated: 1240,
            roi: "9,715%"
        },
        compliance: [
            { label: "No spam triggers detected", status: true },
            { label: "GDPR compliant", status: true },
            { label: "Unsubscribe link included", status: true }
        ],
        costEstimate: [
            { channel: "Email", recipients: 0, cost: 0.00 },
            { channel: "SMS", recipients: 842, cost: 8.42 },
            { channel: "WhatsApp", recipients: 842, cost: 4.21 }
        ]
    };

    return (
        <div className="w-[320px] bg-white border-l border-[#e2e8f0] p-6 overflow-y-auto">
            <h2 className="text-lg font-bold text-[#0f172a] mb-6">Analytics & Optimization</h2>

            {/* Predicted Performance */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-[#1DB954] to-[#169c46] rounded-xl p-5 mb-6 text-white"
            >
                <h3 className="text-sm font-semibold mb-4 opacity-90">Predicted Performance</h3>
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-xs opacity-90">Open Rate</span>
                        <span className="text-2xl font-bold">{analytics.predictedPerformance.openRate}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-xs opacity-90">Click Rate</span>
                        <span className="text-2xl font-bold">{analytics.predictedPerformance.clickRate}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-xs opacity-90">Expected Reach</span>
                        <span className="text-2xl font-bold">{analytics.predictedPerformance.expectedReach}</span>
                    </div>
                </div>
            </motion.div>

            {/* Similar Past Campaigns */}
            <div className="mb-6">
                <h3 className="text-sm font-bold text-[#0f172a] mb-3">Similar Past Campaigns</h3>
                <div className="space-y-2">
                    {analytics.similarCampaigns.map((campaign, i) => (
                        <div key={i} className="p-3 bg-slate-50 rounded-lg border border-[#e2e8f0]">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-xs font-semibold text-[#0f172a]">{campaign.name}</span>
                                <span className="text-[10px] text-[#64748b]">{campaign.date}</span>
                            </div>
                            <div className="flex gap-4 text-xs">
                                <span className="text-[#64748b]">{campaign.openRate} open</span>
                                <span className="text-[#64748b]">{campaign.clickRate} click</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Apply Best Practices */}
            <button className="w-full py-2.5 bg-white border border-[#e2e8f0] rounded-lg text-sm font-semibold text-[#0f172a] hover:bg-slate-50 transition-colors mb-6">
                Apply Best Practices
            </button>

            {/* Latest Campaign ROI */}
            <div className="mb-6 p-4 bg-slate-50 rounded-xl border border-[#e2e8f0]">
                <h3 className="text-sm font-bold text-[#0f172a] mb-3">Latest Campaign ROI</h3>
                <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                        <span className="text-[#64748b]">Cost</span>
                        <span className="font-semibold text-[#0f172a]">SZL {analytics.roi.cost}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                        <span className="text-[#64748b]">Sales Generated</span>
                        <span className="font-semibold text-[#0f172a]">SZL {analytics.roi.salesGenerated.toLocaleString()}</span>
                    </div>
                    <div className="pt-2 border-t border-[#e2e8f0]">
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-semibold text-[#64748b]">ROI</span>
                            <span className="text-xl font-bold text-green-600">{analytics.roi.roi}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Compliance Check */}
            <div className="mb-6">
                <h3 className="text-sm font-bold text-[#0f172a] mb-3">Compliance Check</h3>
                <div className="space-y-2">
                    {analytics.compliance.map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs">
                            <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center">
                                <div className="w-2 h-2 rounded-full bg-green-600" />
                            </div>
                            <span className="text-[#0f172a]">{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Cost Estimate */}
            <div className="p-4 bg-slate-50 rounded-xl border border-[#e2e8f0]">
                <h3 className="text-sm font-bold text-[#0f172a] mb-3">Cost Estimate</h3>
                <div className="space-y-2 mb-3">
                    {analytics.costEstimate.map((item, i) => (
                        <div key={i} className="flex justify-between items-center text-xs">
                            <span className="text-[#64748b]">
                                {item.channel} {item.recipients > 0 && `(${item.recipients} × E${(item.cost / item.recipients).toFixed(2)})`}
                            </span>
                            <span className="font-semibold text-green-600">SZL {item.cost.toFixed(2)}</span>
                        </div>
                    ))}
                </div>
                <div className="pt-3 border-t border-[#e2e8f0]">
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-bold text-[#0f172a]">Total Cost</span>
                        <span className="text-lg font-bold text-green-600">
                            SZL {analytics.costEstimate.reduce((sum, item) => sum + item.cost, 0).toFixed(2)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
