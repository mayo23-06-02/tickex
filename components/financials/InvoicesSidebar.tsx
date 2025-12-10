"use client";

import { useState } from "react";
import { Plus, HelpCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Invoice {
    id: string;
    invoiceNumber: string;
    recipient: string;
    amount: number;
    date: string;
    status: "Paid" | "Pending" | "Overdue";
}

export function InvoicesSidebar() {
    const [invoices, setInvoices] = useState<Invoice[]>([
        { id: "1", invoiceNumber: "INV-2024-001", recipient: "VIP Package Group", amount: 2500, date: "Feb 18, 2025", status: "Paid" },
        { id: "2", invoiceNumber: "INV-2024-002", recipient: "Corporate Booking", amount: 5000, date: "Feb 17, 2025", status: "Pending" },
        { id: "3", invoiceNumber: "INV-2024-003", recipient: "Event Partner", amount: 1200, date: "Feb 10, 2025", status: "Overdue" },
    ]);

    const [isCreating, setIsCreating] = useState(false);

    const summary = invoices.reduce((acc, inv) => ({
        total: acc.total + inv.amount,
        paid: acc.paid + (inv.status === "Paid" ? inv.amount : 0),
        pending: acc.pending + (inv.status === "Pending" ? inv.amount : 0),
        overdue: acc.overdue + (inv.status === "Overdue" ? inv.amount : 0),
    }), { total: 0, paid: 0, pending: 0, overdue: 0 });

    const handleCreateInvoice = async () => {
        setIsCreating(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));

        const newInvoice: Invoice = {
            id: Date.now().toString(),
            invoiceNumber: `INV-2024-00${invoices.length + 1}`,
            recipient: "New Client",
            amount: 0,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            status: "Pending"
        };

        setInvoices([newInvoice, ...invoices]);
        setIsCreating(false);
    };

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e2e8f0]">
                <h3 className="text-sm font-bold text-[#0f172a] mb-4">Quick Invoices</h3>

                <div className="space-y-3 mb-6 max-h-[300px] overflow-y-auto pr-1">
                    <AnimatePresence initial={false}>
                        {invoices.map((inv) => (
                            <motion.div
                                key={inv.id}
                                layout
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                className={`p-3 rounded-lg border transition-colors cursor-pointer group bg-slate-50/50 
                                    ${inv.status === 'Paid' ? 'border-[#e2e8f0] hover:border-[#1DB954]' :
                                        inv.status === 'Pending' ? 'border-[#e2e8f0] hover:border-orange-400' :
                                            'border-[#e2e8f0] hover:border-red-400'}`}
                            >
                                <div className="flex justify-between items-start mb-1">
                                    <span className={`text-xs font-semibold text-[#64748b] group-hover:${inv.status === 'Paid' ? 'text-[#1DB954]' : inv.status === 'Pending' ? 'text-orange-500' : 'text-red-500'}`}>
                                        {inv.invoiceNumber}
                                    </span>
                                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium
                                        ${inv.status === 'Paid' ? 'bg-green-100 text-green-700' :
                                            inv.status === 'Pending' ? 'bg-orange-100 text-orange-700' :
                                                'bg-red-100 text-red-700'}`}>
                                        {inv.status}
                                    </span>
                                </div>
                                <div className="text-sm font-medium text-[#0f172a] mb-1">{inv.recipient}</div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-[#94a3b8]">{inv.date}</span>
                                    <span className="text-sm font-bold text-[#0f172a]">SZL {inv.amount.toLocaleString()}</span>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                <div className="space-y-3">
                    <button
                        onClick={handleCreateInvoice}
                        disabled={isCreating}
                        className="w-full py-2.5 bg-[#1DB954] text-white text-sm font-bold rounded-lg hover:bg-[#169c46] transition-colors flex items-center justify-center gap-2 shadow-sm shadow-green-200 disabled:opacity-70"
                    >
                        {isCreating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
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

                <div className="space-y-3 relative z-10">
                    <div className="flex justify-between text-sm">
                        <span className="text-[#64748b]">Total Invoiced</span>
                        <span className="font-bold text-[#0f172a]">SZL {summary.total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-[#64748b]">Paid</span>
                        <span className="font-bold text-green-600">SZL {summary.paid.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-[#64748b]">Pending</span>
                        <span className="font-bold text-orange-500">SZL {summary.pending.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-[#64748b]">Overdue</span>
                        <span className="font-bold text-red-500">SZL {summary.overdue.toLocaleString()}</span>
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
