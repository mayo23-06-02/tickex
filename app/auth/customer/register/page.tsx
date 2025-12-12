"use client";

import Link from "next/link";
import { Ticket } from "lucide-react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { registerUser } from "@/app/actions/auth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="flex w-full justify-center rounded-lg border border-transparent bg-[#1DB954] py-2.5 px-4 text-sm font-bold text-white shadow-lg hover:shadow-green-200 hover:bg-[#1ed760] focus:outline-none focus:ring-2 focus:ring-[#1DB954] focus:ring-offset-2 transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {pending ? "Creating Account..." : "Create Account"}
        </button>
    );
}

const initialState = {
    error: undefined,
    success: undefined
};

export default function CustomerRegisterPage() {
    const [state, dispatch] = useActionState(registerUser, initialState);
    const router = useRouter();

    useEffect(() => {
        if (state?.success) {
            toast.success("Account created! Please sign in.");
            router.push("/auth/customer/login");
        }
    }, [state?.success, router]);

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <Link href="/" className="flex justify-center mb-6">
                    <div className="w-12 h-12 bg-[#1DB954] rounded-xl flex items-center justify-center shadow-lg shadow-green-200">
                        <Ticket className="w-7 h-7 text-white" />
                    </div>
                </Link>
                <h2 className="mt-6 text-center text-3xl font-black text-[#0f172a]">
                    Create Account
                </h2>
                <p className="mt-2 text-center text-sm text-[#64748b]">
                    Already have an account?{' '}
                    <Link href="/auth/customer/login" className="font-medium text-[#1DB954] hover:text-[#1ed760]">
                        Sign in
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200 sm:rounded-2xl sm:px-10 border border-slate-100">
                    <form action={dispatch} className="space-y-6">
                        {/* Hidden input for default role */}
                        <input type="hidden" name="role" value="customer" />

                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-[#0f172a]">
                                Full Name
                            </label>
                            <div className="mt-1">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    className="block w-full appearance-none rounded-lg border border-slate-200 px-3 py-2 placeholder-slate-400 shadow-sm focus:border-[#1DB954] focus:outline-none focus:ring-[#1DB954] sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-[#0f172a]">
                                Email address
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full appearance-none rounded-lg border border-slate-200 px-3 py-2 placeholder-slate-400 shadow-sm focus:border-[#1DB954] focus:outline-none focus:ring-[#1DB954] sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-[#0f172a]">
                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className="block w-full appearance-none rounded-lg border border-slate-200 px-3 py-2 placeholder-slate-400 shadow-sm focus:border-[#1DB954] focus:outline-none focus:ring-[#1DB954] sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <SubmitButton />
                        </div>
                        <div
                            className="flex h-8 items-end space-x-1"
                            aria-live="polite"
                            aria-atomic="true"
                        >
                            {state?.error && (
                                <p className="text-sm text-red-500">{state.error}</p>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
