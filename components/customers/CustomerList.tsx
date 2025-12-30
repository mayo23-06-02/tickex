"use client";

import { useEffect, useState } from "react";
import { Search, Filter, Save } from "lucide-react";
import { motion } from "framer-motion";

export type Customer = {
  id: string;
  name: string;
  email: string;
  initials: string;
  tier: "Gold" | "Silver" | "Bronze" | "VIP";
  totalSpent: number;
  lastPurchaseDate: string;
  tags: string[];
  avatarColor: string;
  stats: {
    lifetimeValue: number;
    totalPurchases: number;
    lastActivity: string;
    customerSince: string;
    engagementScore: number;
  };
  history?: {
    event: string;
    date: string;
    id: string;
    amount: number;
    tickets: number;
    items?: {
      type: string;
      quantity: number;
      price: number;
    }[];
  }[];
};

// Mock Data
export const mockCustomers: Customer[] = [
  {
    id: "1",
    name: "Mike Wilson",
    email: "mike@example.com",
    initials: "MW",
    tier: "Gold",
    totalSpent: 1680,
    lastPurchaseDate: "3 days ago",
    tags: ["VIP", "Corporate"],
    avatarColor: "bg-green-500",
    stats: {
      lifetimeValue: 1680,
      totalPurchases: 3,
      lastActivity: "3 days ago",
      customerSince: "Dec 2024",
      engagementScore: 87,
    },
  },
  {
    id: "2",
    name: "John Smith",
    email: "john@example.com",
    initials: "JS",
    tier: "Gold",
    totalSpent: 2450,
    lastPurchaseDate: "2 days ago",
    tags: ["VIP", "Repeat"],
    avatarColor: "bg-green-600",
    stats: {
      lifetimeValue: 2450,
      totalPurchases: 5,
      lastActivity: "2 days ago",
      customerSince: "Nov 2024",
      engagementScore: 92,
    },
  },
  {
    id: "3",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    initials: "SJ",
    tier: "Silver",
    totalSpent: 890,
    lastPurchaseDate: "1 week ago",
    tags: ["First-time"],
    avatarColor: "bg-green-500",
    stats: {
      lifetimeValue: 890,
      totalPurchases: 1,
      lastActivity: "1 week ago",
      customerSince: "Jan 2025",
      engagementScore: 45,
    },
  },
  {
    id: "4",
    name: "Emma Davis",
    email: "emma@example.com",
    initials: "ED",
    tier: "Bronze",
    totalSpent: 320,
    lastPurchaseDate: "2 weeks ago",
    tags: ["Student"],
    avatarColor: "bg-green-500",
    stats: {
      lifetimeValue: 320,
      totalPurchases: 1,
      lastActivity: "2 weeks ago",
      customerSince: "Feb 2025",
      engagementScore: 30,
    },
  },
  {
    id: "5",
    name: "James Wilson",
    email: "james@example.com",
    initials: "JW",
    tier: "Silver",
    totalSpent: 1200,
    lastPurchaseDate: "1 month ago",
    tags: ["Repeat"],
    avatarColor: "bg-green-700",
    stats: {
      lifetimeValue: 1200,
      totalPurchases: 2,
      lastActivity: "1 month ago",
      customerSince: "Oct 2024",
      engagementScore: 65,
    },
  },
];

interface CustomerListProps {
  customers: Customer[];
  selectedId: string;
  onSelect: (customer: Customer) => void;
}

export function CustomerList({
  customers,
  selectedId,
  onSelect,
}: CustomerListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("All Tiers");

  const filteredCustomers = customers.filter(
    (c) =>
      (activeTab === "All Tiers" || c.tier === activeTab) &&
      (c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="w-[380px] bg-white border-r border-[#e2e8f0] flex flex-col h-full">
      <div className="p-6 border-b border-[#e2e8f0]">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-[#0f172a]">Customers</h2>
          <p className="text-sm text-[#64748b]">
            {customers.length} total customers
          </p>
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" />
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-[#e2e8f0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1DB954]/20 focus:border-[#1DB954]"
          />
        </div>

        <div className="flex gap-2 mb-4">
          <button className="flex-1 flex items-center justify-center gap-2 px-3 py-1.5 border border-[#e2e8f0] rounded-lg text-sm font-medium text-[#64748b] hover:bg-slate-50">
            <Filter className="w-4 h-4" />
            Filters
          </button>
          <button className="flex-1 px-3 py-1.5 border border-[#e2e8f0] rounded-lg text-sm font-medium text-[#64748b] hover:bg-slate-50">
            Save Filter
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {["All Tiers", "Gold", "Silver", "Bronze", "VIP"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                activeTab === tab
                  ? "bg-[#1DB954] text-white"
                  : "bg-slate-100 text-[#64748b] hover:bg-slate-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredCustomers.map((customer) => (
          <div
            key={customer.id}
            onClick={() => onSelect(customer)}
            className={`p-4 rounded-xl border transition-all cursor-pointer relative group ${
              selectedId === customer.id
                ? "bg-white border-[#1DB954] ring-1 ring-[#1DB954] shadow-sm"
                : "bg-white border-[#e2e8f0] hover:border-[#cbd5e1] hover:shadow-sm"
            }`}
          >
            <input
              type="checkbox"
              className="absolute top-4 right-4 rounded border-gray-300 text-[#1DB954] focus:ring-[#1DB954]"
              onClick={(e) => e.stopPropagation()}
            />

            <div className="flex items-start gap-3 mb-3">
              <div
                className={`w-10 h-10 rounded-full ${customer.avatarColor} flex items-center justify-center text-white font-bold text-sm`}
              >
                {customer.initials}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-[#0f172a]">
                    {customer.name}
                  </h3>
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                      customer.tier === "Gold"
                        ? "bg-yellow-100 text-yellow-700"
                        : customer.tier === "Silver"
                        ? "bg-slate-100 text-slate-600"
                        : customer.tier === "Bronze"
                        ? "bg-orange-50 text-orange-700"
                        : "bg-purple-100 text-purple-700"
                    }`}
                  >
                    {customer.tier}
                  </span>
                </div>
                <p className="text-xs text-[#64748b]">{customer.email}</p>
              </div>
            </div>

            <div className="flex justify-between items-end">
              <div>
                <p className="text-[10px] text-[#64748b] mb-1">Total Spent</p>
                <p className="text-sm font-bold text-[#0f172a]">
                  SZL {customer.totalSpent.toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-[#64748b] mb-1">
                  Last purchase: {customer.lastPurchaseDate}
                </p>
                <div className="flex gap-1 justify-end">
                  {customer.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-1.5 py-0.5 bg-slate-100 rounded text-[10px] font-medium text-[#64748b]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
