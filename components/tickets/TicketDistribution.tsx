"use client";

import { useState } from "react";
import { Upload, ChevronDown, Check, Plus, HelpCircle, Loader2 } from "lucide-react";

export function TicketDistribution() {
    const [assignmentEmail, setAssignmentEmail] = useState("");
    const [isAssigning, setIsAssigning] = useState(false);
    const [assignmentParams, setAssignmentParams] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const handleAssign = () => {
        if (!assignmentEmail) return;
        setIsAssigning(true);
        setTimeout(() => {
            setIsAssigning(false);
            setAssignmentParams({ message: `Ticket assigned to ${assignmentEmail}`, type: 'success' });
            setAssignmentEmail("");
            setTimeout(() => setAssignmentParams(null), 3000);
        }, 1000);
    };

    const handleAction = (action: string) => {
        alert(`${action} initiated!`);
    };

    return (
        <div className="w-80 flex-shrink-0 flex flex-col gap-6">

            {/* Assignment */}
            <div>
                <h3 className="font-semibold text-[#0f172a] mb-4">Assignment & Distribution</h3>
                <div className="space-y-4">
                    <div>
                        <label className="text-xs font-semibold text-[#64748b] uppercase mb-1.5 block">Assign to Customer</label>
                        <input
                            type="text"
                            value={assignmentEmail}
                            onChange={(e) => setAssignmentEmail(e.target.value)}
                            placeholder="Search customer by email..."
                            className="w-full px-4 py-2.5 rounded-lg border border-[#e2e8f0] bg-white text-sm focus:outline-none focus:border-[#1DB954]"
                        />
                    </div>
                    <button
                        onClick={handleAssign}
                        disabled={isAssigning || !assignmentEmail}
                        className="w-full bg-[#1DB954] hover:bg-[#1ed760] disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-lg transition-colors shadow-sm shadow-green-200 flex justify-center items-center gap-2"
                    >
                        {isAssigning ? <Loader2 className="w-4 h-4 animate-spin" /> : "Assign Ticket"}
                    </button>
                    {assignmentParams && (
                        <div className="text-xs text-[#1DB954] text-center font-medium animate-in fade-in slide-in-from-top-2">
                            {assignmentParams.message}
                        </div>
                    )}
                </div>
            </div>

            {/* Bulk CSV */}
            <div
                onClick={() => handleAction("CSV Template Download")}
                className="p-6 border-2 border-dashed border-[#e2e8f0] rounded-xl text-center bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer group"
            >
                <Upload className="w-8 h-8 text-[#94a3b8] group-hover:text-[#1DB954] mx-auto mb-2 transition-colors" />
                <div className="text-sm font-medium text-[#0f172a]">Bulk Assignment via CSV</div>
                <div className="text-xs text-[#64748b] mt-1">Upload CSV file (max 1000 records)</div>
                <button className="text-xs text-[#1DB954] font-medium mt-3 hover:underline">Download CSV Template</button>
            </div>

            {/* Discount Codes */}
            <div>
                <div className="flex justify-between items-center mb-3">
                    <h3 className="font-semibold text-[#0f172a] text-sm">Discount Codes</h3>
                    <button
                        onClick={() => handleAction("Create Discount Code")}
                        className="text-xs text-[#1DB954] font-medium flex items-center gap-1 hover:underline"
                    >
                        <Plus className="w-3 h-3" /> Create
                    </button>
                </div>
                <div className="bg-slate-50 border border-[#e2e8f0] rounded-lg p-3">
                    <div className="flex justify-between items-start mb-1">
                        <div className="font-mono text-sm font-medium text-[#0f172a]">EARLYBIRD</div>
                        <span className="text-xs font-bold text-[#1DB954]">20% OFF</span>
                    </div>
                    <div className="text-[10px] text-[#64748b]">Used 45 times • Expires Mar 1</div>
                </div>
            </div>

            {/* Transfer Settings */}
            <div>
                <h3 className="font-semibold text-[#0f172a] text-sm mb-3">Transfer Settings</h3>
                <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                        <div className="w-4 h-4 bg-[#1DB954] rounded flex items-center justify-center text-white">
                            <Check className="w-3 h-3" />
                        </div>
                        <span className="text-sm text-[#0f172a]">Allow ticket transfers</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer opacity-70">
                        <div className="w-4 h-4 border border-[#cbd5e1] rounded bg-white"></div>
                        <span className="text-sm text-[#0f172a]">Require approval for transfers</span>
                    </label>
                    <div className="pl-7">
                        <input
                            type="number"
                            defaultValue={5}
                            className="w-full px-3 py-1.5 rounded border border-[#e2e8f0] text-sm bg-white"
                        />
                        <div className="text-[10px] text-[#64748b] mt-1">Transfer fee (SZL)</div>
                    </div>
                </div>
            </div>

            {/* Batch Actions */}
            <div>
                <h3 className="font-semibold text-[#0f172a] text-sm mb-3">Batch Actions</h3>
                <div className="space-y-2">
                    {["Generate All Tickets (PDF)", "Send to Print Partner", "Sync with Mobile App", "Set Up Auto-Refunds"].map((action) => (
                        <button
                            key={action}
                            onClick={() => handleAction(action)}
                            className="w-full text-left px-3 py-2 text-sm text-[#64748b] hover:text-[#0f172a] hover:bg-slate-50 rounded-lg transition-colors flex items-center justify-between group"
                        >
                            {action}
                        </button>
                    ))}
                </div>
            </div>

            <button className="mt-auto self-end p-2 bg-[#0f172a] text-white rounded-full shadow-lg hover:bg-slate-800 transition-colors">
                <HelpCircle className="w-5 h-5" />
            </button>
        </div>
    );
}
