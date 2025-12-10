"use client";

import { useState } from "react";
import { Plus, Eye, Copy, Edit, Calendar, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

interface Campaign {
    id: string;
    name: string;
    type: string;
    date: string;
    status: "Sent" | "Scheduled" | "Draft";
    stats: {
        sent: number;
        opens: number;
        clicks: number;
        openRate: string;
        clickRate: string;
    };
}

interface CampaignHubProps {
    onCreateCampaign: () => void;
}

export function CampaignHub({ onCreateCampaign }: CampaignHubProps) {
    const [filter, setFilter] = useState("All Campaigns");

    const campaigns: Campaign[] = [
        {
            id: "1",
            name: "Event Reminder",
            type: "Email",
            date: "Feb 18, 2025",
            status: "Sent",
            stats: {
                sent: 842,
                opens: 687,
                clicks: 245,
                openRate: "81.6%",
                clickRate: "29.1%"
            }
        },
        {
            id: "2",
            name: "Last Chance Tickets",
            type: "WhatsApp",
            date: "Feb 25, 2025",
            status: "Scheduled",
            stats: {
                sent: 0,
                opens: 0,
                clicks: 0,
                openRate: "0%",
                clickRate: "0%"
            }
        },
        {
            id: "3",
            name: "VIP Exclusive Offer",
            type: "SMS",
            date: "",
            status: "Draft",
            stats: {
                sent: 0,
                opens: 0,
                clicks: 0,
                openRate: "0%",
                clickRate: "0%"
            }
        }
    ];

    const scheduledCampaigns = campaigns.filter(c => c.status === "Scheduled");

    return (
        <div className="flex-1 min-w-0 bg-slate-50/50 p-8 overflow-y-auto">
            {/* Header */}
            <div className="mb-8">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h1 className="text-2xl font-bold text-[#0f172a]">Communications Hub</h1>
                        <p className="text-[#64748b] mt-1">Unified communication across all channels</p>
                    </div>
                    <button
                        onClick={onCreateCampaign}
                        className="flex items-center gap-2 px-4 py-2.5 bg-[#1DB954] text-white rounded-lg font-semibold hover:bg-[#169c46] transition-colors shadow-lg shadow-green-200"
                    >
                        <Plus className="w-5 h-5" />
                        Create Campaign
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="flex gap-2 mb-6">
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="px-4 py-2 bg-white border border-[#e2e8f0] rounded-lg text-sm font-medium focus:outline-none focus:border-[#1DB954]"
                >
                    <option>All Campaigns</option>
                    <option>Email</option>
                    <option>WhatsApp</option>
                    <option>SMS</option>
                </select>
            </div>

            {/* All Campaigns */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-[#0f172a]">All Campaigns</h2>
                    <button className="text-sm text-[#1DB954] font-medium hover:text-[#169c46]">
                        View All
                    </button>
                </div>

                <div className="space-y-3">
                    {campaigns.map((campaign, i) => (
                        <motion.div
                            key={campaign.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="bg-white rounded-xl p-6 border border-[#e2e8f0] hover:shadow-sm transition-shadow"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-bold text-[#0f172a] text-lg mb-1">{campaign.name}</h3>
                                    <div className="flex items-center gap-3 text-sm text-[#64748b]">
                                        <span>{campaign.type}</span>
                                        {campaign.date && (
                                            <>
                                                <span>•</span>
                                                <span>{campaign.date}</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${campaign.status === "Sent" ? "bg-green-100 text-green-700" :
                                        campaign.status === "Scheduled" ? "bg-blue-100 text-blue-700" :
                                            "bg-slate-100 text-slate-600"
                                    }`}>
                                    {campaign.status}
                                </span>
                            </div>

                            {campaign.status === "Sent" && (
                                <div className="grid grid-cols-4 gap-4 mb-4 pb-4 border-b border-[#e2e8f0]">
                                    <div>
                                        <div className="text-xs text-[#64748b] mb-1">Sent</div>
                                        <div className="text-lg font-bold text-[#0f172a]">{campaign.stats.sent}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-[#64748b] mb-1">Opens</div>
                                        <div className="text-lg font-bold text-green-600">{campaign.stats.opens} ({campaign.stats.openRate})</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-[#64748b] mb-1">Clicks</div>
                                        <div className="text-lg font-bold text-green-600">{campaign.stats.clicks} ({campaign.stats.clickRate})</div>
                                    </div>
                                    <div className="flex items-end">
                                        <button className="text-xs font-semibold text-[#1DB954] hover:text-[#169c46] flex items-center gap-1">
                                            <BarChart3 className="w-3.5 h-3.5" />
                                            View Report
                                        </button>
                                    </div>
                                </div>
                            )}

                            <div className="flex gap-2">
                                {campaign.status === "Sent" && (
                                    <button className="flex-1 py-2 bg-slate-50 hover:bg-slate-100 rounded-lg text-xs font-semibold text-[#0f172a] transition-colors flex items-center justify-center gap-1">
                                        <Eye className="w-3.5 h-3.5" />
                                        View Report
                                    </button>
                                )}
                                {campaign.status === "Draft" && (
                                    <button className="flex-1 py-2 bg-slate-50 hover:bg-slate-100 rounded-lg text-xs font-semibold text-[#0f172a] transition-colors flex items-center justify-center gap-1">
                                        <Edit className="w-3.5 h-3.5" />
                                        Edit
                                    </button>
                                )}
                                <button className="flex-1 py-2 bg-slate-50 hover:bg-slate-100 rounded-lg text-xs font-semibold text-[#0f172a] transition-colors flex items-center justify-center gap-1">
                                    <Copy className="w-3.5 h-3.5" />
                                    Duplicate
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Scheduled Campaigns */}
            {scheduledCampaigns.length > 0 && (
                <div>
                    <h2 className="text-lg font-bold text-[#0f172a] mb-4">Scheduled Campaigns</h2>
                    <div className="space-y-3">
                        {scheduledCampaigns.map((campaign) => (
                            <div
                                key={campaign.id}
                                className="bg-white rounded-xl p-4 border border-[#e2e8f0] flex justify-between items-center"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <Calendar className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-[#0f172a]">{campaign.name}</h4>
                                        <p className="text-xs text-[#64748b]">{campaign.date} at 2:00 PM</p>
                                    </div>
                                </div>
                                <button className="p-2 hover:bg-slate-50 rounded-lg transition-colors">
                                    <Calendar className="w-5 h-5 text-[#64748b]" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
