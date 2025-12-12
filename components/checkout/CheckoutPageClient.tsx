"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Ticket, CreditCard, Check, Loader2, ShoppingCart } from "lucide-react";
import { QuickRegister } from "@/components/checkout/QuickRegister";
import { toast } from "sonner";
import { CustomerLayout } from "@/components/layout/CustomerLayout";

interface CheckoutItem {
    ticketTypeId: string;
    ticketName: string;
    quantity: number;
    price: number;
}

interface CheckoutPageClientProps {
    eventId: string;
    eventTitle: string;
    items: CheckoutItem[];
    totalAmount: number;
    currentUserId?: string;
}

export default function CheckoutPageClient({
    eventId,
    eventTitle,
    items,
    totalAmount,
    currentUserId
}: CheckoutPageClientProps) {
    const router = useRouter();
    const [userId, setUserId] = useState(currentUserId);
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'mobile'>('card');

    const handleQuickRegisterComplete = (newUserId: string) => {
        setUserId(newUserId);
    };

    const handlePayment = async () => {
        if (!userId) {
            toast.error('Please complete registration first');
            return;
        }

        setIsProcessing(true);

        try {
            // Import dynamically to avoid server-client issues if needed, but standard import is fine
            const { processMockPayment } = await import('@/app/actions/payments');

            const result = await processMockPayment({
                eventId,
                items,
                totalAmount,
                userId,
                paymentMethod
            });

            if (result.success && result.orderId) {
                toast.success('Payment successful! Redirecting to your tickets...');

                // Redirect to orders page
                setTimeout(() => {
                    router.push(`/my-orders?new=${result.orderId}`);
                }, 1500);
            } else {
                toast.error('Payment failed: ' + (result.error || 'Unknown error'));
                setIsProcessing(false);
            }
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong. Please try again.');
            setIsProcessing(false);
        }
    };

    if (!userId) {
        return (
            <CustomerLayout>
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-black text-foreground mb-2">Almost There!</h1>
                        <p className="text-muted-foreground">Quick registration to secure your tickets</p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Order Summary */}
                        <div className="bg-card rounded-2xl shadow-lg border border-border p-6 h-fit">
                            <h2 className="text-xl font-bold text-foreground mb-4">Order Summary</h2>

                            <div className="mb-4 p-4 bg-muted rounded-xl">
                                <div className="font-bold text-foreground mb-1">{eventTitle}</div>
                                <div className="text-sm text-muted-foreground">Event Tickets</div>
                            </div>

                            <div className="space-y-3 mb-6">
                                {items.map((item, index) => (
                                    <div key={index} className="flex justify-between items-center py-2 border-b border-border">
                                        <div>
                                            <div className="font-medium text-foreground">{item.ticketName}</div>
                                            <div className="text-sm text-muted-foreground">Qty: {item.quantity}</div>
                                        </div>
                                        <div className="font-bold text-foreground">
                                            SZL {(item.price * item.quantity).toFixed(2)}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-4 border-t-2 border-border">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-bold text-foreground">Total</span>
                                    <span className="text-2xl font-black text-primary">
                                        SZL {totalAmount.toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Quick Register */}
                        <QuickRegister eventId={eventId} onComplete={handleQuickRegisterComplete} />
                    </div>
                </div>
            </CustomerLayout>
        );
    }

    return (
        <CustomerLayout>
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full mb-4">
                        <Check className="w-5 h-5" />
                        <span className="font-semibold">Account Verified</span>
                    </div>
                    <h1 className="text-3xl font-black text-[#0f172a] mb-2">Complete Your Purchase</h1>
                    <p className="text-slate-600">Choose your payment method</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Payment Methods */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
                            <h2 className="text-xl font-bold text-[#0f172a] mb-6">Payment Method</h2>

                            <div className="space-y-4">
                                <button
                                    onClick={() => setPaymentMethod('card')}
                                    className={`w-full p-4 border-2 rounded-xl transition-all ${paymentMethod === 'card'
                                        ? 'border-[#1DB954] bg-green-50'
                                        : 'border-slate-200 hover:border-slate-300'
                                        }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`p-3 rounded-lg ${paymentMethod === 'card' ? 'bg-[#1DB954]/10' : 'bg-slate-100'
                                            }`}>
                                            <CreditCard className={`w-6 h-6 ${paymentMethod === 'card' ? 'text-[#1DB954]' : 'text-slate-600'
                                                }`} />
                                        </div>
                                        <div className="flex-1 text-left">
                                            <div className="font-bold text-[#0f172a]">Credit/Debit Card</div>
                                            <div className="text-sm text-slate-500">Visa, Mastercard, Amex</div>
                                        </div>
                                        {paymentMethod === 'card' && (
                                            <Check className="w-5 h-5 text-[#1DB954]" />
                                        )}
                                    </div>
                                </button>

                                <button
                                    onClick={() => setPaymentMethod('mobile')}
                                    className={`w-full p-4 border-2 rounded-xl transition-all ${paymentMethod === 'mobile'
                                        ? 'border-[#1DB954] bg-green-50'
                                        : 'border-slate-200 hover:border-slate-300'
                                        }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`p-3 rounded-lg ${paymentMethod === 'mobile' ? 'bg-[#1DB954]/10' : 'bg-slate-100'
                                            }`}>
                                            <ShoppingCart className={`w-6 h-6 ${paymentMethod === 'mobile' ? 'text-[#1DB954]' : 'text-slate-600'
                                                }`} />
                                        </div>
                                        <div className="flex-1 text-left">
                                            <div className="font-bold text-[#0f172a]">Mobile Money</div>
                                            <div className="text-sm text-slate-500">MTN, Eswatini Mobile</div>
                                        </div>
                                        {paymentMethod === 'mobile' && (
                                            <Check className="w-5 h-5 text-[#1DB954]" />
                                        )}
                                    </div>
                                </button>
                            </div>

                            {paymentMethod === 'card' && (
                                <div className="mt-6 space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-[#0f172a] mb-2">
                                            Card Number
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="1234 5678 9012 3456"
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#1DB954] focus:ring-2 focus:ring-[#1DB954]/20 outline-none"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-[#0f172a] mb-2">
                                                Expiry Date
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="MM/YY"
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#1DB954] focus:ring-2 focus:ring-[#1DB954]/20 outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-[#0f172a] mb-2">
                                                CVV
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="123"
                                                maxLength={3}
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#1DB954] focus:ring-2 focus:ring-[#1DB954]/20 outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {paymentMethod === 'mobile' && (
                                <div className="mt-6">
                                    <label className="block text-sm font-medium text-[#0f172a] mb-2">
                                        Mobile Number
                                    </label>
                                    <input
                                        type="tel"
                                        placeholder="+268 7XXX XXXX"
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#1DB954] focus:ring-2 focus:ring-[#1DB954]/20 outline-none"
                                    />
                                </div>
                            )}
                        </div>

                        <button
                            onClick={handlePayment}
                            disabled={isProcessing}
                            className="w-full py-4 bg-[#1DB954] hover:bg-[#1ed760] disabled:bg-slate-300 text-white font-bold rounded-xl shadow-lg shadow-green-200 transition-all flex items-center justify-center gap-2"
                        >
                            {isProcessing ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Processing Payment...
                                </>
                            ) : (
                                <>
                                    <CreditCard className="w-5 h-5" />
                                    Pay SZL {totalAmount.toFixed(2)}
                                </>
                            )}
                        </button>
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 h-fit">
                        <h3 className="text-lg font-bold text-[#0f172a] mb-4">Order Summary</h3>

                        <div className="mb-4 p-3 bg-slate-50 rounded-lg">
                            <div className="font-semibold text-[#0f172a] text-sm mb-1">{eventTitle}</div>
                            <div className="text-xs text-slate-500">Event Tickets</div>
                        </div>

                        <div className="space-y-2 mb-4">
                            {items.map((item, index) => (
                                <div key={index} className="flex justify-between text-sm">
                                    <span className="text-slate-600">{item.ticketName} × {item.quantity}</span>
                                    <span className="font-semibold text-[#0f172a]">
                                        SZL {(item.price * item.quantity).toFixed(2)}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="pt-4 border-t border-slate-200">
                            <div className="flex justify-between items-center">
                                <span className="font-bold text-[#0f172a]">Total</span>
                                <span className="text-xl font-black text-[#1DB954]">
                                    SZL {totalAmount.toFixed(2)}
                                </span>
                            </div>
                        </div>

                        <div className="mt-6 p-3 bg-green-50 rounded-lg border border-green-200">
                            <div className="flex items-start gap-2">
                                <Ticket className="w-4 h-4 text-green-600 mt-0.5" />
                                <p className="text-xs text-green-800">
                                    Tickets will be sent to your email/phone immediately after payment
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </CustomerLayout>
    );
}
