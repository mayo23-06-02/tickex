"use client";

import { useState } from "react";
import { Mail, MessageSquare, Phone, Plus, Receipt, Download, ChevronRight, HelpCircle } from "lucide-react";
import { Customer } from "./CustomerList";
import { motion } from "framer-motion";

interface CustomerDetailsProps {
    customer: Customer;
}

export function CustomerDetails({ customer }: CustomerDetailsProps) {
    const [activeTab, setActiveTab] = useState("Purchase History");

    const tabs = [
        { id: "Purchase History", icon: Receipt },
        { id: "Engagement", icon: MessageSquare },
        { id: "Preferences", icon: HelpCircle },
    ];

    return (
        <div className="flex-1 min-w-0 bg-slate-50/50 p-8 overflow-y-auto">
            {/* Header Profile Section */}
            <div className="bg-white rounded-2xl p-8 border border-[#e2e8f0] shadow-sm mb-6 relative overflow-hidden">
                <div className="flex justify-between items-start relative z-10">
                    <div className="flex gap-6">
                        <div className={`w-24 h-24 rounded-2xl ${customer.avatarColor} flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-green-200`}>
                            {customer.initials}
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-[#0f172a] mb-1">{customer.name}</h1>
                            <p className="text-[#64748b] mb-4">{customer.email}</p>

                            <div className="flex gap-2">
                                <button className="flex items-center gap-2 px-4 py-2 bg-[#1DB954] text-white rounded-lg text-sm font-medium hover:bg-[#1ed760] transition-colors shadow-sm shadow-green-200">
                                    <Mail className="w-4 h-4" />
                                    Email
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#e2e8f0] text-[#0f172a] rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
                                    <MessageSquare className="w-4 h-4 text-[#64748b]" />
                                    Message
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#e2e8f0] text-[#0f172a] rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
                                    <Phone className="w-4 h-4 text-[#64748b]" />
                                    Call
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#e2e8f0] text-[#0f172a] rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
                                    <Plus className="w-4 h-4 text-[#64748b]" />
                                    Add Note
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Engagement Score */}
                    <div className="flex flex-col items-center">
                        <div className="relative w-16 h-16 flex items-center justify-center">
                            <svg className="transform -rotate-90 w-16 h-16 absolute inset-0">
                                <circle cx="32" cy="32" r="28" fill="none" stroke="#e2e8f0" strokeWidth="4" />
                                <circle
                                    cx="32"
                                    cy="32"
                                    r="28"
                                    fill="none"
                                    stroke="#1DB954"
                                    strokeWidth="4"
                                    strokeDasharray="176"
                                    strokeDashoffset={176 - (176 * customer.stats.engagementScore) / 100}
                                    strokeLinecap="round"
                                    className="transition-all duration-1000 ease-out"
                                />
                            </svg>
                            <span className="text-lg font-bold text-[#0f172a]">{customer.stats.engagementScore}</span>
                        </div>
                        <span className="text-xs font-medium text-[#64748b] mt-1">Score</span>
                    </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-4 gap-8 mt-8 py-6 border-t border-[#e2e8f0]">
                    <div>
                        <p className="text-xs text-[#64748b] mb-1">Lifetime Value</p>
                        <p className="text-xl font-bold text-[#0f172a]">SZL {customer.stats.lifetimeValue.toLocaleString()}</p>
                    </div>
                    <div>
                        <p className="text-xs text-[#64748b] mb-1">Total Purchases</p>
                        <p className="text-xl font-bold text-[#0f172a]">{customer.stats.totalPurchases}</p>
                    </div>
                    <div>
                        <p className="text-xs text-[#64748b] mb-1">Last Activity</p>
                        <p className="text-xl font-bold text-[#0f172a]">{customer.stats.lastActivity}</p>
                    </div>
                    <div>
                        <p className="text-xs text-[#64748b] mb-1">Customer Since</p>
                        <p className="text-xl font-bold text-[#0f172a]">{customer.stats.customerSince}</p>
                    </div>
                </div>
            </div>

            {/* Content Tabs */}
            <div className="flex items-center gap-8 border-b border-[#e2e8f0] mb-6">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 pb-3 text-sm font-medium transition-colors relative ${activeTab === tab.id ? "text-[#1DB954]" : "text-[#64748b] hover:text-[#0f172a]"
                            }`}
                    >
                        {activeTab === tab.id && (
                            <motion.div
                                layoutId="activeCustomerTab"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1DB954]"
                            />
                        )}
                        <tab.icon className="w-4 h-4" />
                        {tab.id}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-[#0f172a]">Purchase History</h3>
                    <button className="text-sm font-medium text-[#1DB954] hover:text-[#1ed760] transition-colors">
                        View All Transactions
                    </button>
                </div>

                {/* Purchase List */}
                <div className="space-y-4">
                    {[
                        { event: "Neon Dreams Festival", date: "Feb 19, 2025", id: "TIX-8421", amount: 750, tickets: 2 },
                        { event: "Tech Conference 2024", date: "Jan 15, 2025", id: "TIX-7892", amount: 180, tickets: 1 },
                        { event: "Art Exhibition", date: "Dec 10, 2024", id: "TIX-7234", amount: 450, tickets: 3 },
                    ].map((purchase, i) => (
                        <div key={i} className="bg-white border border-[#e2e8f0] rounded-xl p-6 hover:shadow-sm transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h4 className="font-bold text-[#0f172a] text-lg">{purchase.event}</h4>
                                    <p className="text-sm text-[#64748b] mt-1">
                                        {purchase.id} • {purchase.date}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-[#0f172a] text-lg">SZL {purchase.amount}</p>
                                    <p className="text-xs text-[#64748b] mt-1">{purchase.tickets} tickets</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 pt-4 border-t border-[#f1f5f9]">
                                <button className="flex-1 py-1.5 text-xs font-semibold text-[#0f172a] bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors text-center">
                                    View Details
                                </button>
                                <button className="flex-1 py-1.5 text-xs font-semibold text-[#64748b] hover:text-[#0f172a] hover:bg-slate-50 rounded-lg transition-colors text-center">
                                    Download Invoice
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-[#e2e8f0] mt-8">
                    <span className="font-medium text-[#0f172a]">Total Lifetime Value</span>
                    <span className="text-xl font-bold text-[#1DB954]">SZL {customer.stats.lifetimeValue.toLocaleString()}</span>
                </div>
            </div>
        </div>
    );
}
