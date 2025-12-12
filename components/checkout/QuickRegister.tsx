"use client";

import { useState } from "react";
import { Mail, Phone, ArrowRight, Check, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface QuickRegisterProps {
    eventId: string;
    onComplete: (userId: string) => void;
}

export function QuickRegister({ eventId, onComplete }: QuickRegisterProps) {
    const [step, setStep] = useState<'method' | 'details' | 'verify'>('method');
    const [method, setMethod] = useState<'email' | 'phone'>('email');
    const [contact, setContact] = useState('');
    const [name, setName] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [sentCode, setSentCode] = useState('');

    const handleMethodSelect = (selectedMethod: 'email' | 'phone') => {
        setMethod(selectedMethod);
        setStep('details');
    };

    const handleSendCode = async () => {
        if (!contact || !name) {
            toast.error('Please fill in all fields');
            return;
        }

        setIsLoading(true);

        // Simulate sending verification code
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Generate mock code (in production, this would be sent via SMS/Email)
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        setSentCode(code);

        toast.success(`Verification code sent to ${contact}`);
        console.log('Demo verification code:', code); // For testing

        setIsLoading(false);
        setStep('verify');
    };

    const handleVerify = async () => {
        if (verificationCode !== sentCode) {
            toast.error('Invalid verification code');
            return;
        }

        setIsLoading(true);

        // In production, create user account here
        await new Promise(resolve => setTimeout(resolve, 1000));

        toast.success('Account verified! Proceeding to checkout...');

        // Mock user ID
        const mockUserId = `user_${Date.now()}`;
        onComplete(mockUserId);

        setIsLoading(false);
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden max-w-md mx-auto">
            <div className="p-6 bg-gradient-to-r from-[#1DB954] to-[#1ed760] text-white">
                <h2 className="text-2xl font-bold">Quick Checkout</h2>
                <p className="text-white/90 text-sm mt-1">Register in seconds to get your tickets</p>
            </div>

            <div className="p-6">
                {step === 'method' && (
                    <div className="space-y-4">
                        <p className="text-slate-600 mb-6">Choose how you'd like to register:</p>

                        <button
                            onClick={() => handleMethodSelect('email')}
                            className="w-full p-4 border-2 border-slate-200 rounded-xl hover:border-[#1DB954] hover:bg-green-50/50 transition-all group"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-slate-100 group-hover:bg-[#1DB954]/10 rounded-lg transition-colors">
                                    <Mail className="w-6 h-6 text-slate-600 group-hover:text-[#1DB954]" />
                                </div>
                                <div className="flex-1 text-left">
                                    <div className="font-bold text-[#0f172a]">Email Address</div>
                                    <div className="text-sm text-slate-500">Get code via email</div>
                                </div>
                                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-[#1DB954]" />
                            </div>
                        </button>

                        <button
                            onClick={() => handleMethodSelect('phone')}
                            className="w-full p-4 border-2 border-slate-200 rounded-xl hover:border-[#1DB954] hover:bg-green-50/50 transition-all group"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-slate-100 group-hover:bg-[#1DB954]/10 rounded-lg transition-colors">
                                    <Phone className="w-6 h-6 text-slate-600 group-hover:text-[#1DB954]" />
                                </div>
                                <div className="flex-1 text-left">
                                    <div className="font-bold text-[#0f172a]">Phone Number</div>
                                    <div className="text-sm text-slate-500">Get code via SMS</div>
                                </div>
                                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-[#1DB954]" />
                            </div>
                        </button>
                    </div>
                )}

                {step === 'details' && (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-[#0f172a] mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="John Doe"
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#1DB954] focus:ring-2 focus:ring-[#1DB954]/20 outline-none transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#0f172a] mb-2">
                                {method === 'email' ? 'Email Address' : 'Phone Number'}
                            </label>
                            <input
                                type={method === 'email' ? 'email' : 'tel'}
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
                                placeholder={method === 'email' ? 'john@example.com' : '+268 7XXX XXXX'}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#1DB954] focus:ring-2 focus:ring-[#1DB954]/20 outline-none transition-all"
                            />
                        </div>

                        <button
                            onClick={handleSendCode}
                            disabled={isLoading}
                            className="w-full py-3 bg-[#1DB954] hover:bg-[#1ed760] disabled:bg-slate-300 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Sending Code...
                                </>
                            ) : (
                                <>
                                    Send Verification Code
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>

                        <button
                            onClick={() => setStep('method')}
                            className="w-full py-2 text-slate-600 hover:text-[#0f172a] text-sm font-medium"
                        >
                            ← Back
                        </button>
                    </div>
                )}

                {step === 'verify' && (
                    <div className="space-y-4">
                        <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                            <p className="text-sm text-green-800">
                                We've sent a 6-digit code to <strong>{contact}</strong>
                            </p>
                            <p className="text-xs text-green-600 mt-1">
                                Demo code: {sentCode}
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#0f172a] mb-2">
                                Verification Code
                            </label>
                            <input
                                type="text"
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                placeholder="000000"
                                maxLength={6}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#1DB954] focus:ring-2 focus:ring-[#1DB954]/20 outline-none transition-all text-center text-2xl font-bold tracking-widest"
                            />
                        </div>

                        <button
                            onClick={handleVerify}
                            disabled={isLoading || verificationCode.length !== 6}
                            className="w-full py-3 bg-[#1DB954] hover:bg-[#1ed760] disabled:bg-slate-300 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Verifying...
                                </>
                            ) : (
                                <>
                                    <Check className="w-5 h-5" />
                                    Verify & Continue
                                </>
                            )}
                        </button>

                        <button
                            onClick={handleSendCode}
                            className="w-full py-2 text-slate-600 hover:text-[#0f172a] text-sm font-medium"
                        >
                            Resend Code
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
