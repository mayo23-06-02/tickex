"use client";

import { CheckCircle2, FileText, ChevronDown } from "lucide-react";

export function TaxCompliance() {
    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e2e8f0] h-full flex flex-col">
            <h3 className="text-lg font-bold text-[#0f172a] mb-6">Tax & Compliance</h3>

            <div className="bg-green-50 rounded-lg p-4 flex justify-between items-center mb-6 border border-green-100">
                <div>
                    <div className="text-sm font-medium text-[#0f172a] mb-1">Tax Collected</div>
                    <div className="text-xs text-green-700">15% VAT on ticket sales</div>
                </div>
                <div className="text-xl font-bold text-green-700">SZL 4,210</div>
            </div>

            <div className="space-y-4 mb-6 flex-1">
                <div>
                    <label className="text-xs font-medium text-[#64748b] mb-1.5 block">Tax Jurisdiction</label>
                    <div className="relative">
                        <select className="w-full appearance-none bg-white border border-[#e2e8f0] rounded-lg px-3 py-2 text-sm text-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#1DB954] focus:border-transparent">
                            <option>Eswatini - Standard VAT (15%)</option>
                            <option>South Africa - VAT (15%)</option>
                            <option>International - Zero Rated</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-[#94a3b8] pointer-events-none" />
                    </div>
                </div>

                <div>
                    <div className="text-xs font-medium text-[#64748b] mb-2">Compliance Checklist</div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[#1DB954]" />
                            <span className="text-sm text-[#0f172a]">Tax Registration</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[#1DB954]" />
                            <span className="text-sm text-[#0f172a]">Financial Records</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded border border-[#cbd5e1]" />
                            <span className="text-sm text-[#64748b]">Q1 Tax Filing</span>
                        </div>
                    </div>
                </div>
            </div>

            <button className="w-full py-2.5 bg-[#1DB954] text-white text-sm font-medium rounded-lg hover:bg-[#169c46] transition-colors flex items-center justify-center gap-2 shadow-sm shadow-green-200">
                <FileText className="w-4 h-4" />
                Generate Tax Forms
            </button>
        </div>
    );
}
