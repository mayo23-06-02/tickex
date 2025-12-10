"use client";

import { CreditCard, Wallet, Building2, Banknote } from "lucide-react";

export function PaymentMethods() {
    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e2e8f0] h-full">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-[#0f172a]">Payment Methods</h3>
                <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#1DB954] focus:ring-[#1DB954]" />
                    <span className="text-xs text-[#64748b]">Show Fees</span>
                </label>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-lg bg-slate-50 border border-[#e2e8f0]">
                    <div className="flex justify-between items-start mb-2">
                        <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center text-green-600">
                            <CreditCard className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-medium text-[#64748b]">67%</span>
                    </div>
                    <div className="text-sm font-medium text-[#0f172a]">Credit Card</div>
                    <div className="text-lg font-bold text-[#0f172a]">SZL 28,420</div>
                </div>

                <div className="p-4 rounded-lg bg-slate-50 border border-[#e2e8f0]">
                    <div className="flex justify-between items-start mb-2">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                            <Wallet className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-medium text-[#64748b]">20%</span>
                    </div>
                    <div className="text-sm font-medium text-[#0f172a]">PayPal</div>
                    <div className="text-lg font-bold text-[#0f172a]">SZL 8,526</div>
                </div>

                <div className="p-4 rounded-lg bg-slate-50 border border-[#e2e8f0]">
                    <div className="flex justify-between items-start mb-2">
                        <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600">
                            <Building2 className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-medium text-[#64748b]">10%</span>
                    </div>
                    <div className="text-sm font-medium text-[#0f172a]">Bank Transfer</div>
                    <div className="text-lg font-bold text-[#0f172a]">SZL 4,210</div>
                </div>

                <div className="p-4 rounded-lg bg-slate-50 border border-[#e2e8f0]">
                    <div className="flex justify-between items-start mb-2">
                        <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600">
                            <Banknote className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-medium text-[#64748b]">3%</span>
                    </div>
                    <div className="text-sm font-medium text-[#0f172a]">Cash</div>
                    <div className="text-lg font-bold text-[#0f172a]">SZL 944</div>
                </div>
            </div>

            <button className="w-full py-2.5 bg-slate-50 text-[#0f172a] text-sm font-medium rounded-lg hover:bg-slate-100 transition-colors border border-dashed border-[#cbd5e1]">
                Optimize Payment Methods
            </button>
        </div>
    );
}
