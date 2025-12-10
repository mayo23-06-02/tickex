"use client";

import { useState } from "react";
import { X, Calendar, Send, Save, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Campaign {
    recipients: string;
    subject: string;
    message: string;
    sendOption: "immediate" | "scheduled" | "trigger";
    scheduleDate?: string;
    scheduleTime?: string;
    trigger?: string;
    testEmail?: string;
}

interface CreateCampaignModalProps {
    isOpen: boolean;
    onClose: () => void;
    channelType: string;
}

export function CreateCampaignModal({ isOpen, onClose, channelType }: CreateCampaignModalProps) {
    const [activeTab, setActiveTab] = useState<"compose" | "schedule" | "preview">("compose");
    const [campaign, setCampaign] = useState<Campaign>({
        recipients: "All Attendees (842)",
        subject: "",
        message: "",
        sendOption: "immediate"
    });

    const [previewDevice, setPreviewDevice] = useState<"desktop" | "mobile" | "tablet">("desktop");

    const handleSendCampaign = () => {
        console.log("Sending campaign:", campaign);
        onClose();
    };

    const handleSaveDraft = () => {
        console.log("Saving draft:", campaign);
        onClose();
    };

    const insertToken = (token: string) => {
        setCampaign({
            ...campaign,
            message: campaign.message + `{{${token}}}`
        });
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
                >
                    {/* Header */}
                    <div className="p-6 border-b border-[#e2e8f0] flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-bold text-[#0f172a]">Create Campaign</h2>
                            <p className="text-sm text-[#64748b] mt-1">Compose and schedule your message</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-[#64748b] transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Tabs */}
                    <div className="flex border-b border-[#e2e8f0] px-6">
                        {[
                            { id: "compose", label: "Compose" },
                            { id: "schedule", label: "Schedule & Send" },
                            { id: "preview", label: "Preview" }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`px-4 py-3 text-sm font-medium transition-colors relative ${activeTab === tab.id
                                        ? "text-[#1DB954]"
                                        : "text-[#64748b] hover:text-[#0f172a]"
                                    }`}
                            >
                                {tab.label}
                                {activeTab === tab.id && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1DB954]"
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-6">
                        {activeTab === "compose" && (
                            <div className="space-y-4">
                                {/* Recipients */}
                                <div>
                                    <label className="text-sm font-semibold text-[#0f172a] mb-2 block">
                                        Recipients
                                    </label>
                                    <div className="mb-2">
                                        <select
                                            value={campaign.recipients}
                                            onChange={(e) => setCampaign({ ...campaign, recipients: e.target.value })}
                                            className="w-full px-4 py-3 rounded-lg border border-[#e2e8f0] text-sm focus:outline-none focus:border-[#1DB954] focus:ring-2 focus:ring-[#1DB954]/20"
                                        >
                                            <option>All Attendees (842)</option>
                                            <option>VIP Ticket Holders (120)</option>
                                            <option>General Admission (722)</option>
                                        </select>
                                    </div>
                                    <p className="text-xs text-[#1DB954] flex items-center gap-1">
                                        <span className="w-1 h-1 bg-[#1DB954] rounded-full" />
                                        Preview: 842 recipients will receive this message
                                    </p>
                                </div>

                                {/* Subject */}
                                <div>
                                    <label className="text-sm font-semibold text-[#0f172a] mb-2 block">
                                        Subject Line
                                    </label>
                                    <input
                                        type="text"
                                        value={campaign.subject}
                                        onChange={(e) => setCampaign({ ...campaign, subject: e.target.value })}
                                        placeholder="Your event is coming up soon!"
                                        className="w-full px-4 py-3 rounded-lg border border-[#e2e8f0] text-sm focus:outline-none focus:border-[#1DB954] focus:ring-2 focus:ring-[#1DB954]/20"
                                    />
                                </div>

                                {/* Message Body */}
                                <div>
                                    <label className="text-sm font-semibold text-[#0f172a] mb-2 block">
                                        Message Body
                                    </label>
                                    <textarea
                                        value={campaign.message}
                                        onChange={(e) => setCampaign({ ...campaign, message: e.target.value })}
                                        placeholder="Hi {{name}},&#10;&#10;Don't miss out on {{event}} happening on {{date}}! We've saved your spot.&#10;&#10;See you there!"
                                        rows={8}
                                        className="w-full px-4 py-3 rounded-lg border border-[#e2e8f0] text-sm focus:outline-none focus:border-[#1DB954] focus:ring-2 focus:ring-[#1DB954]/20 resize-none"
                                    />
                                </div>

                                {/* Insert Tokens */}
                                <div>
                                    <label className="text-sm font-semibold text-[#0f172a] mb-2 block">
                                        Insert Token
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {["name", "event", "date", "ticket_type", "venue"].map((token) => (
                                            <button
                                                key={token}
                                                onClick={() => insertToken(token)}
                                                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-mono text-[#0f172a] transition-colors"
                                            >
                                                {`{{${token}}}`}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "schedule" && (
                            <div className="space-y-4">
                                <h3 className="text-lg font-bold text-[#0f172a] mb-4">When to Send</h3>

                                {/* Send Immediately */}
                                <label className="flex items-start gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all hover:border-[#1DB954]/30 has-[:checked]:border-[#1DB954] has-[:checked]:bg-green-50/30">
                                    <input
                                        type="radio"
                                        name="sendOption"
                                        value="immediate"
                                        checked={campaign.sendOption === "immediate"}
                                        onChange={(e) => setCampaign({ ...campaign, sendOption: "immediate" })}
                                        className="mt-1"
                                    />
                                    <div>
                                        <div className="font-semibold text-[#0f172a]">Send Immediately</div>
                                        <div className="text-xs text-[#64748b] mt-1">
                                            Campaign will be sent as soon as you click Send
                                        </div>
                                    </div>
                                </label>

                                {/* Schedule for Later */}
                                <label className="flex items-start gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all hover:border-[#1DB954]/30 has-[:checked]:border-[#1DB954] has-[:checked]:bg-green-50/30">
                                    <input
                                        type="radio"
                                        name="sendOption"
                                        value="scheduled"
                                        checked={campaign.sendOption === "scheduled"}
                                        onChange={(e) => setCampaign({ ...campaign, sendOption: "scheduled" })}
                                        className="mt-1"
                                    />
                                    <div className="flex-1">
                                        <div className="font-semibold text-[#0f172a]">Schedule for Later</div>
                                        {campaign.sendOption === "scheduled" && (
                                            <div className="mt-3 grid grid-cols-2 gap-3">
                                                <input
                                                    type="date"
                                                    value={campaign.scheduleDate || ""}
                                                    onChange={(e) => setCampaign({ ...campaign, scheduleDate: e.target.value })}
                                                    className="px-3 py-2 rounded-lg border border-[#e2e8f0] text-sm"
                                                />
                                                <input
                                                    type="time"
                                                    value={campaign.scheduleTime || ""}
                                                    onChange={(e) => setCampaign({ ...campaign, scheduleTime: e.target.value })}
                                                    className="px-3 py-2 rounded-lg border border-[#e2e8f0] text-sm"
                                                />
                                            </div>
                                        )}
                                        {campaign.sendOption === "scheduled" && campaign.scheduleDate && (
                                            <p className="text-xs text-green-600 mt-2">
                                                ⏰ Best time to send: Tomorrow at 2:00 PM (based on past open rates)
                                            </p>
                                        )}
                                    </div>
                                </label>

                                {/* Send Based on Trigger */}
                                <label className="flex items-start gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all hover:border-[#1DB954]/30 has-[:checked]:border-[#1DB954] has-[:checked]:bg-green-50/30">
                                    <input
                                        type="radio"
                                        name="sendOption"
                                        value="trigger"
                                        checked={campaign.sendOption === "trigger"}
                                        onChange={(e) => setCampaign({ ...campaign, sendOption: "trigger" })}
                                        className="mt-1"
                                    />
                                    <div className="flex-1">
                                        <div className="font-semibold text-[#0f172a]">Send Based on Trigger</div>
                                        {campaign.sendOption === "trigger" && (
                                            <select
                                                value={campaign.trigger || ""}
                                                onChange={(e) => setCampaign({ ...campaign, trigger: e.target.value })}
                                                className="mt-3 w-full px-3 py-2 rounded-lg border border-[#e2e8f0] text-sm"
                                            >
                                                <option value="">Select trigger...</option>
                                                <option value="24h-before">24 hours before event</option>
                                                <option value="48h-before">48 hours before event</option>
                                                <option value="1week-before">1 week before event</option>
                                            </select>
                                        )}
                                    </div>
                                </label>

                                {/* A/B Testing */}
                                <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-[#e2e8f0]">
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="rounded" />
                                        <span className="text-sm font-semibold text-[#0f172a]">Enable A/B Testing</span>
                                    </label>
                                    <p className="text-xs text-[#64748b] mt-1 ml-6">
                                        Test different subject lines or content to see what performs better
                                    </p>
                                </div>
                            </div>
                        )}

                        {activeTab === "preview" && (
                            <div className="space-y-4">
                                {/* Device Selector */}
                                <div className="flex justify-center gap-2 mb-6">
                                    {["Desktop", "Mobile", "Tablet"].map((device) => (
                                        <button
                                            key={device}
                                            onClick={() => setPreviewDevice(device.toLowerCase() as any)}
                                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${previewDevice === device.toLowerCase()
                                                    ? "bg-[#1DB954] text-white"
                                                    : "bg-slate-100 text-[#64748b] hover:bg-slate-200"
                                                }`}
                                        >
                                            {device}
                                        </button>
                                    ))}
                                </div>

                                {/* Email Preview */}
                                <div className="bg-slate-50 rounded-xl p-6 border border-[#e2e8f0]">
                                    <div className="bg-white rounded-lg shadow-sm p-6 max-w-2xl mx-auto">
                                        <div className="mb-4 pb-4 border-b border-[#e2e8f0]">
                                            <div className="text-xs text-[#64748b] mb-1">From: noreply@tickex.sz</div>
                                            <div className="text-xs text-[#64748b] mb-1">To: customer@example.com</div>
                                            <div className="font-bold text-[#0f172a] mt-2">
                                                Subject: {campaign.subject || "Your event is coming up soon!"}
                                            </div>
                                        </div>
                                        <div className="prose prose-sm max-w-none">
                                            <p className="whitespace-pre-wrap">
                                                {campaign.message || "Hi {{name}},\n\nDon't miss out on {{event}} happening on {{date}}! We've saved your spot.\n\nSee you there!"}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Send Test Message */}
                                <div className="p-4 bg-white border border-[#e2e8f0] rounded-xl">
                                    <h4 className="text-sm font-semibold text-[#0f172a] mb-3">Send Test Message</h4>
                                    <div className="flex gap-2">
                                        <input
                                            type="email"
                                            value={campaign.testEmail || ""}
                                            onChange={(e) => setCampaign({ ...campaign, testEmail: e.target.value })}
                                            placeholder="your@email.com"
                                            className="flex-1 px-3 py-2 rounded-lg border border-[#e2e8f0] text-sm"
                                        />
                                        <button className="px-4 py-2 bg-[#1DB954] text-white rounded-lg text-sm font-semibold hover:bg-[#169c46] transition-colors">
                                            Send Test
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="p-6 bg-slate-50 border-t border-[#e2e8f0] flex justify-between items-center">
                        <button
                            onClick={onClose}
                            className="px-6 py-3 rounded-lg border border-[#e2e8f0] text-[#64748b] font-semibold hover:bg-white transition-colors"
                        >
                            Cancel
                        </button>
                        <div className="flex gap-3">
                            <button
                                onClick={handleSaveDraft}
                                className="px-6 py-3 rounded-lg border border-[#e2e8f0] text-[#0f172a] font-semibold hover:bg-white transition-colors flex items-center gap-2"
                            >
                                <Save className="w-4 h-4" />
                                Save Draft
                            </button>
                            <button
                                onClick={handleSendCampaign}
                                className="px-6 py-3 rounded-lg bg-[#1DB954] text-white font-bold hover:bg-[#169c46] transition-colors shadow-lg shadow-green-200 flex items-center gap-2"
                            >
                                <Send className="w-4 h-4" />
                                Send Campaign
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
