"use client";

import { useState, useEffect } from "react";
import { Plus, Clock, Info, CheckSquare, Square, CreditCard, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getBills, createBill, payBill } from "@/app/actions/financials";
import { toast } from "sonner";

interface PayoutItem {
    id: string;
    title: string;
    date: string;
    amount: number;
    status: "Pending" | "Scheduled" | "Paid";
    type: "rent" | "service" | "artist";
}

interface PaymentFormData {
    cardNumber: string;
    cardName: string;
    expiryDate: string;
    cvv: string;
}

export function PayoutSchedule() {
    const [payouts, setPayouts] = useState<PayoutItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [paymentModalId, setPaymentModalId] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [paymentForm, setPaymentForm] = useState<PaymentFormData>({
        cardNumber: "",
        cardName: "",
        expiryDate: "",
        cvv: ""
    });

    useEffect(() => {
        loadBills();
    }, []);

    async function loadBills() {
        try {
            const data = await getBills();
            const formatted = data.map((bill: any) => ({
                id: bill._id,
                title: bill.title,
                date: bill.dueDate,
                amount: bill.amount,
                status: bill.status,
                type: bill.type
            }));
            setPayouts(formatted);
        } catch (error) {
            console.error("Failed to load bills", error);
            toast.error("Failed to load bills");
        } finally {
            setIsLoading(false);
        }
    }

    const toggleSelection = (id: string) => {
        const newSelected = new Set(selectedIds);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelectedIds(newSelected);
    };

    const handleBulkPay = async () => {
        // Bulk pay not yet implemented in backend properly for atomicity, simple loop for now
        toast.info("Bulk payment for selected items processing...");
        for (const id of Array.from(selectedIds)) {
            try {
                await payBill(id, { method: "bulk_card_sim", last4: "0000" });
            } catch (e) { console.error(e); }
        }
        await loadBills();
        setSelectedIds(new Set());
        toast.success("Selected bills paid");
    };

    const handleMarkAsPaid = async (id: string) => {
        try {
            await payBill(id, { method: "manual_mark", last4: "N/A" });
            toast.success("Bill marked as paid");
            loadBills();
        } catch (error) {
            toast.error("Failed to update bill");
        }
    };

    const openPaymentModal = (id: string) => {
        setPaymentModalId(id);
        setPaymentForm({
            cardNumber: "",
            cardName: "",
            expiryDate: "",
            cvv: ""
        });
        setPaymentSuccess(false);
    };

    const closePaymentModal = () => {
        setPaymentModalId(null);
        setIsProcessing(false);
        setPaymentSuccess(false);
    };

    const handlePaymentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate payment processing delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        try {
            if (paymentModalId) {
                await payBill(paymentModalId, {
                    method: "credit_card",
                    last4: paymentForm.cardNumber.slice(-4)
                });
            }
            setIsProcessing(false);
            setPaymentSuccess(true);

            // Wait for success animation
            await new Promise(resolve => setTimeout(resolve, 1500));

            closePaymentModal();
            loadBills();
            toast.success("Payment successful");
        } catch (error) {
            setIsProcessing(false);
            toast.error("Payment failed");
        }
    };

    const formatCardNumber = (value: string) => {
        const cleaned = value.replace(/\s/g, '');
        const chunks = cleaned.match(/.{1,4}/g);
        return chunks ? chunks.join(' ') : cleaned;
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case "rent": return <Clock className="w-5 h-5" />;
            case "service": return <Clock className="w-5 h-5" />;
            case "artist": return <Info className="w-5 h-5" />;
            default: return <Info className="w-5 h-5" />;
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case "rent": case "service": return "bg-orange-100 text-orange-500";
            case "artist": return "bg-blue-100 text-blue-500";
            default: return "bg-slate-100 text-slate-500";
        }
    };

    const [isAdding, setIsAdding] = useState(false);
    const [newPayment, setNewPayment] = useState<Partial<PayoutItem>>({
        title: "",
        date: "",
        amount: 0,
        type: "service"
    });

    const handleSavePayment = async () => {
        if (!newPayment.title || !newPayment.amount || !newPayment.date) return;

        try {
            await createBill({
                title: newPayment.title,
                amount: Number(newPayment.amount),
                dueDate: newPayment.date,
                type: newPayment.type
            });
            setIsAdding(false);
            setNewPayment({ title: "", date: "", amount: 0, type: "service" });
            loadBills();
            toast.success("Bill scheduled");
        } catch (error) {
            toast.error("Failed to schedule bill");
        }
    };

    const currentPaymentItem = payouts.find(p => p.id === paymentModalId);

    if (isLoading) {
        return <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e2e8f0] h-96 animate-pulse"></div>;
    }

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e2e8f0]">
            {/* ... (Existing JSX structure remains mostly same, just updating handlers moved above) ... */}
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-[#0f172a]">Payout Schedule</h3>
                <div className="flex gap-2">
                    {selectedIds.size > 0 && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            onClick={handleBulkPay}
                            className="bg-[#0f172a] text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-slate-800 transition-colors shadow-sm"
                        >
                            Pay Selected ({selectedIds.size})
                        </motion.button>
                    )}
                    <button
                        onClick={() => setIsAdding(!isAdding)}
                        className="flex items-center gap-1 bg-[#1DB954] text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-[#169c46] transition-colors shadow-sm"
                    >
                        <Plus className={`w-3.5 h-3.5 transition-transform ${isAdding ? 'rotate-45' : ''}`} />
                        {isAdding ? "Cancel" : "Schedule Payment"}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {isAdding && (
                    <motion.div
                        initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                        animate={{ opacity: 1, height: "auto", marginBottom: 16 }}
                        exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                        className="overflow-hidden bg-slate-50 border border-[#e2e8f0] rounded-lg p-4"
                    >
                        <div className="grid grid-cols-2 gap-3 mb-3">
                            <div>
                                <label className="text-xs font-semibold text-[#64748b] mb-1 block">Title</label>
                                <input
                                    type="text"
                                    value={newPayment.title}
                                    onChange={(e) => setNewPayment({ ...newPayment, title: e.target.value })}
                                    placeholder="e.g. Venue Deposit"
                                    className="w-full px-3 py-2 rounded-lg border border-[#e2e8f0] text-sm focus:outline-none focus:border-[#1DB954]"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-[#64748b] mb-1 block">Amount (SZL)</label>
                                <input
                                    type="number"
                                    value={newPayment.amount || ""}
                                    onChange={(e) => setNewPayment({ ...newPayment, amount: Number(e.target.value) })}
                                    placeholder="0.00"
                                    className="w-full px-3 py-2 rounded-lg border border-[#e2e8f0] text-sm focus:outline-none focus:border-[#1DB954]"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-[#64748b] mb-1 block">Date</label>
                                <input
                                    type="date"
                                    value={newPayment.date}
                                    onChange={(e) => setNewPayment({ ...newPayment, date: e.target.value })}
                                    className="w-full px-3 py-2 rounded-lg border border-[#e2e8f0] text-sm focus:outline-none focus:border-[#1DB954]"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-[#64748b] mb-1 block">Type</label>
                                <select
                                    value={newPayment.type}
                                    onChange={(e) => setNewPayment({ ...newPayment, type: e.target.value as any })}
                                    className="w-full px-3 py-2 rounded-lg border border-[#e2e8f0] text-sm focus:outline-none focus:border-[#1DB954]"
                                >
                                    <option value="service">Service</option>
                                    <option value="rent">Rent</option>
                                    <option value="artist">Artist</option>
                                </select>
                            </div>
                        </div>
                        <button
                            onClick={handleSavePayment}
                            className="w-full bg-[#1DB954] text-white py-2 rounded-lg text-sm font-bold hover:bg-[#169c46] transition-colors shadow-sm"
                        >
                            Save Payment
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="space-y-4">
                <AnimatePresence>
                    {payouts.map((item) => (
                        <motion.div
                            key={item.id}
                            layout
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`border ${selectedIds.has(item.id) ? 'border-[#1DB954] ring-1 ring-[#1DB954]' : 'border-[#e2e8f0]'} rounded-lg p-4 transition-all ${item.status === 'Paid' ? 'bg-slate-50 opacity-60' : 'bg-white'}`}
                        >
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex items-start gap-3">
                                    <button
                                        onClick={() => toggleSelection(item.id)}
                                        className="mt-1 text-slate-400 hover:text-[#1DB954] transition-colors"
                                    >
                                        {selectedIds.has(item.id) ? (
                                            <CheckSquare className="w-5 h-5 text-[#1DB954]" />
                                        ) : (
                                            <Square className="w-5 h-5" />
                                        )}
                                    </button>

                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mt-1 ${getTypeColor(item.type)}`}>
                                        {getTypeIcon(item.type)}
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-[#0f172a]">{item.title}</h4>
                                        <p className="text-xs text-[#64748b]">Due: {item.date}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-bold text-[#0f172a]">SZL {item.amount.toLocaleString()}</div>
                                    <div className={`inline-block text-[10px] font-bold px-1.5 py-0.5 rounded mt-1
                                        ${item.status === 'Paid' ? 'bg-green-100 text-green-700' :
                                            item.status === 'Pending' ? 'bg-orange-100 text-orange-700' :
                                                'bg-blue-100 text-blue-700'}`}>
                                        {item.status}
                                    </div>
                                </div>
                            </div>

                            {item.status !== 'Paid' && (
                                <div className="flex gap-3 mt-4 pl-8">
                                    <button
                                        onClick={() => handleMarkAsPaid(item.id)}
                                        className="flex-1 bg-[#1DB954]/10 text-[#1DB954] py-2 rounded-lg text-xs font-bold hover:bg-[#1DB954] hover:text-white transition-all"
                                    >
                                        Mark as Paid
                                    </button>
                                    <button
                                        onClick={() => openPaymentModal(item.id)}
                                        className="flex-1 bg-[#1DB954] text-white py-2 rounded-lg text-xs font-semibold hover:bg-[#169c46] transition-colors flex items-center justify-center gap-1"
                                    >
                                        <CreditCard className="w-3.5 h-3.5" />
                                        Make Payment
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>

                {payouts.length === 0 && !isLoading && (
                    <div className="text-center py-8 text-slate-400 text-sm">No scheduled payouts</div>
                )}
            </div>

            {/* Payment Modal */}
            <AnimatePresence>
                {paymentModalId && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                        onClick={closePaymentModal}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
                        >
                            {!isProcessing && !paymentSuccess ? (
                                <form onSubmit={handlePaymentSubmit}>
                                    <div className="p-6 border-b border-[#e2e8f0]">
                                        <h3 className="text-xl font-bold text-[#0f172a]">Make Payment</h3>
                                        <p className="text-sm text-[#64748b] mt-1">
                                            {currentPaymentItem?.title} - SZL {currentPaymentItem?.amount.toLocaleString()}
                                        </p>
                                    </div>

                                    <div className="p-6 space-y-4">
                                        <div>
                                            <label className="text-xs font-semibold text-[#64748b] mb-2 block">
                                                Card Number
                                            </label>
                                            <div className="relative">
                                                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94a3b8]" />
                                                <input
                                                    type="text"
                                                    required
                                                    maxLength={19}
                                                    value={paymentForm.cardNumber}
                                                    onChange={(e) => {
                                                        const formatted = formatCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16));
                                                        setPaymentForm({ ...paymentForm, cardNumber: formatted });
                                                    }}
                                                    placeholder="1234 5678 9012 3456"
                                                    className="w-full pl-11 pr-4 py-3 rounded-lg border border-[#e2e8f0] text-sm focus:outline-none focus:border-[#1DB954] focus:ring-2 focus:ring-[#1DB954]/20"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-xs font-semibold text-[#64748b] mb-2 block">
                                                Cardholder Name
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={paymentForm.cardName}
                                                onChange={(e) => setPaymentForm({ ...paymentForm, cardName: e.target.value })}
                                                placeholder="John Doe"
                                                className="w-full px-4 py-3 rounded-lg border border-[#e2e8f0] text-sm focus:outline-none focus:border-[#1DB954] focus:ring-2 focus:ring-[#1DB954]/20"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-xs font-semibold text-[#64748b] mb-2 block">
                                                    Expiry Date
                                                </label>
                                                <input
                                                    type="text"
                                                    required
                                                    maxLength={5}
                                                    value={paymentForm.expiryDate}
                                                    onChange={(e) => {
                                                        let value = e.target.value.replace(/\D/g, '');
                                                        if (value.length >= 2) {
                                                            value = value.slice(0, 2) + '/' + value.slice(2, 4);
                                                        }
                                                        setPaymentForm({ ...paymentForm, expiryDate: value });
                                                    }}
                                                    placeholder="MM/YY"
                                                    className="w-full px-4 py-3 rounded-lg border border-[#e2e8f0] text-sm focus:outline-none focus:border-[#1DB954] focus:ring-2 focus:ring-[#1DB954]/20"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs font-semibold text-[#64748b] mb-2 block">
                                                    CVV
                                                </label>
                                                <input
                                                    type="text"
                                                    required
                                                    maxLength={3}
                                                    value={paymentForm.cvv}
                                                    onChange={(e) => setPaymentForm({ ...paymentForm, cvv: e.target.value.replace(/\D/g, '') })}
                                                    placeholder="123"
                                                    className="w-full px-4 py-3 rounded-lg border border-[#e2e8f0] text-sm focus:outline-none focus:border-[#1DB954] focus:ring-2 focus:ring-[#1DB954]/20"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6 bg-slate-50 border-t border-[#e2e8f0] flex gap-3">
                                        <button
                                            type="button"
                                            onClick={closePaymentModal}
                                            className="flex-1 px-4 py-3 rounded-lg border border-[#e2e8f0] text-[#64748b] font-semibold hover:bg-white transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="flex-1 px-4 py-3 rounded-lg bg-[#1DB954] text-white font-bold hover:bg-[#169c46] transition-colors shadow-lg shadow-green-200"
                                        >
                                            Pay SZL {currentPaymentItem?.amount.toLocaleString()}
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <div className="p-12 flex flex-col items-center justify-center">
                                    {isProcessing ? (
                                        <>
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                className="w-16 h-16 border-4 border-[#e2e8f0] border-t-[#1DB954] rounded-full mb-4"
                                            />
                                            <p className="text-lg font-semibold text-[#0f172a]">Processing Payment...</p>
                                            <p className="text-sm text-[#64748b] mt-1">Please wait</p>
                                        </>
                                    ) : (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="text-center"
                                        >
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                                className="w-20 h-20 bg-[#1DB954] rounded-full flex items-center justify-center mx-auto mb-4"
                                            >
                                                <Check className="w-10 h-10 text-white" strokeWidth={3} />
                                            </motion.div>
                                            <motion.h3
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.3 }}
                                                className="text-2xl font-bold text-[#0f172a] mb-2"
                                            >
                                                Payment Successful!
                                            </motion.h3>
                                            <motion.p
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.4 }}
                                                className="text-[#64748b]"
                                            >
                                                SZL {currentPaymentItem?.amount.toLocaleString()} paid
                                            </motion.p>
                                        </motion.div>
                                    )}
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
