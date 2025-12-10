"use client";

import { Plus, HelpCircle } from "lucide-react";

export function InvoicesSidebar() {
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e2e8f0]">
                <h3 className="text-sm font-bold text-[#0f172a] mb-4">Quick Invoices</h3>

                <div className="space-y-3 mb-6">
                    <div className="p-3 rounded-lg border border-[#e2e8f0] hover:border-[#1DB954] transition-colors cursor-pointer group bg-slate-50/50">
                        <div className="flex justify-between items-start mb-1">
                            <span className="text-xs font-semibold text-[#64748b] group-hover:text-[#1DB954]">INV-2024-001</span>
                            <span className="bg-green-100 text-green-700 text-[10px] px-1.5 py-0.5 rounded font-medium">Paid</span>
                        </div>
                        <div className="text-sm font-medium text-[#0f172a] mb-1">VIP Package Group</div>
                        <div className="flex justify-between items-center">
                            <span className="text-xs text-[#94a3b8]">Feb 18, 2025</span>
                            <span className="text-sm font-bold text-[#0f172a]">SZL 2,500</span>
                        </div>
                    </div>

                    <div className="p-3 rounded-lg border border-[#e2e8f0] hover:border-[#orange-400] transition-colors cursor-pointer group bg-slate-50/50">
                        <div className="flex justify-between items-start mb-1">
                            <span className="text-xs font-semibold text-[#64748b]">INV-2024-002</span>
                            <span className="bg-orange-100 text-orange-700 text-[10px] px-1.5 py-0.5 rounded font-medium">Pending</span>
                        </div>
                        <div className="text-sm font-medium text-[#0f172a] mb-1">Corporate Booking</div>
                        <div className="flex justify-between items-center">
                            <span className="text-xs text-[#94a3b8]">Feb 17, 2025</span>
                            <span className="text-sm font-bold text-[#0f172a]">SZL 5,000</span>
                        </div>
                    </div>

                    <div className="p-3 rounded-lg border border-[#e2e8f0] hover:border-red-400 transition-colors cursor-pointer group bg-slate-50/50">
                        <div className="flex justify-between items-start mb-1">
                            <span className="text-xs font-semibold text-[#64748b]">INV-2024-003</span>
                            <span className="bg-red-100 text-red-700 text-[10px] px-1.5 py-0.5 rounded font-medium">Overdue</span>
                        </div>
                        <div className="text-sm font-medium text-[#0f172a] mb-1">Event Partner</div>
                        <div className="flex justify-between items-center">
                            <span className="text-xs text-[#94a3b8]">Feb 10, 2025</span>
                            <span className="text-sm font-bold text-[#0f172a]">SZL 1,200</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    <button className="w-full py-2.5 bg-[#1DB954] text-white text-sm font-bold rounded-lg hover:bg-[#169c46] transition-colors flex items-center justify-center gap-2 shadow-sm shadow-green-200">
                        <Plus className="w-4 h-4" />
                        Create Invoice
                    </button>
                    <button className="w-full py-2.5 bg-white border border-[#e2e8f0] text-[#0f172a] text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors">
                        Send Reminders
                    </button>
                    <button className="w-full py-2.5 bg-white border border-[#e2e8f0] text-[#0f172a] text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors">
                        Bulk Generate
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e2e8f0] relative overflow-hidden">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#64748b]">Invoice Summary</h3>
                </div>

                <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                        <span className="text-[#64748b]">Total Invoiced</span>
                        <span className="font-bold text-[#0f172a]">SZL 8,700</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-[#64748b]">Paid</span>
                        <span className="font-bold text-green-600">SZL 2,500</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-[#64748b]">Pending</span>
                        <span className="font-bold text-orange-500">SZL 5,000</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-[#64748b]">Overdue</span>
                        <span className="font-bold text-red-500">SZL 1,200</span>
                    </div>
                </div>

                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center opacity-50 pointer-events-none">
                    <div className="w-16 h-16 rounded-full bg-slate-100" />
                </div>

                <button className="absolute bottom-2 right-2 p-1 text-[#cbd5e1] hover:text-[#94a3b8]">
                    <HelpCircle className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
