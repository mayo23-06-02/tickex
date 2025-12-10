"use client";

import { Mail, MessageSquare, Send, Bell, Share2, Plus } from "lucide-react";
import { motion } from "framer-motion";

interface Channel {
    id: string;
    name: string;
    icon: any;
    status: "Connected" | "Not Connected";
    description: string;
    stats?: {
        label: string;
        value: string | number;
    };
}

interface ChannelListProps {
    onCreateCampaign: (channelId: string) => void;
}

export function ChannelList({ onCreateCampaign }: ChannelListProps) {
    const channels: Channel[] = [
        {
            id: "email",
            name: "Email Campaigns",
            icon: Mail,
            status: "Connected",
            description: "Last campaign: 81.6% open rate",
            stats: { label: "Last campaign", value: "81.6% open rate" }
        },
        {
            id: "whatsapp",
            name: "WhatsApp API",
            icon: MessageSquare,
            status: "Connected",
            description: "Active templates: 5",
            stats: { label: "Active templates", value: 5 }
        },
        {
            id: "sms",
            name: "SMS",
            icon: Send,
            status: "Not Connected",
            description: "",
        },
        {
            id: "push",
            name: "Push Notifications",
            icon: Bell,
            status: "Connected",
            description: "Subscribers: 487",
            stats: { label: "Subscribers", value: 487 }
        },
        {
            id: "social",
            name: "Social Media",
            icon: Share2,
            status: "Not Connected",
            description: "",
        }
    ];

    const getStatusColor = (status: string) => {
        return status === "Connected" ? "text-green-600" : "text-slate-400";
    };

    return (
        <div className="w-[340px] bg-white border-r border-[#e2e8f0] p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-[#0f172a]">Channels</h2>
                <button className="w-8 h-8 bg-[#1DB954] rounded-lg flex items-center justify-center text-white hover:bg-[#169c46] transition-colors">
                    <Plus className="w-5 h-5" />
                </button>
            </div>

            <div className="space-y-3">
                {channels.map((channel, index) => (
                    <motion.div
                        key={channel.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => channel.status === "Connected" && onCreateCampaign(channel.id)}
                        className={`p-4 rounded-xl border transition-all ${channel.status === "Connected"
                                ? "border-[#1DB954] bg-green-50/30 hover:bg-green-50 cursor-pointer"
                                : "border-[#e2e8f0] bg-white opacity-60"
                            }`}
                    >
                        <div className="flex items-start gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${channel.status === "Connected" ? "bg-[#1DB954]/10" : "bg-slate-100"
                                }`}>
                                <channel.icon className={`w-5 h-5 ${channel.status === "Connected" ? "text-[#1DB954]" : "text-slate-400"
                                    }`} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-[#0f172a] text-sm mb-1">{channel.name}</h3>
                                <div className={`text-xs font-medium mb-1 ${getStatusColor(channel.status)}`}>
                                    ● {channel.status}
                                </div>
                                {channel.description && (
                                    <p className="text-xs text-[#64748b]">{channel.description}</p>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-[#e2e8f0]">
                <h3 className="text-sm font-bold text-[#0f172a] mb-3">Email Stats</h3>
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-xs text-[#64748b]">Avg Open Rate</span>
                        <span className="text-sm font-bold text-green-600">42.3%</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-xs text-[#64748b]">Avg Click Rate</span>
                        <span className="text-sm font-bold text-green-600">12.8%</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-xs text-[#64748b]">Total Sent</span>
                        <span className="text-sm font-bold text-[#0f172a]">8,420</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
