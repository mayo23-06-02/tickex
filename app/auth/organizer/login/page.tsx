"use client";

import Link from "next/link";
import { Ticket } from "lucide-react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { authenticate } from "@/app/actions/auth";

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="flex w-full justify-center rounded-lg border border-transparent bg-[#0f172a] py-2.5 px-4 text-sm font-bold text-white shadow-lg hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0f172a] focus:ring-offset-2 transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {pending ? "Logging in..." : "Log In to Dashboard"}
        </button>
    );
}

export default function OrganizerLoginPage() {
    const [errorMessage, dispatch] = useActionState(authenticate, undefined);

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <Link href="/" className="flex justify-center mb-6">
                    <div className="w-12 h-12 bg-[#0f172a] rounded-xl flex items-center justify-center shadow-lg shadow-slate-300">
                        <Ticket className="w-7 h-7 text-white" />
                    </div>
                </Link>
                <h2 className="mt-6 text-center text-3xl font-black text-[#0f172a]">
                    Organizer Login
                </h2>
                <p className="mt-2 text-center text-sm text-[#64748b]">
                    Start selling events?{' '}
                    <Link href="/auth/organizer/register" className="font-medium text-[#0f172a] hover:text-slate-700">
                        Create an organizer account
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200 sm:rounded-2xl sm:px-10 border border-slate-100">
                    <div className="rounded-lg bg-blue-50 p-4 mb-6">
                        <div className="flex">
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-blue-800">Organizer Portal</h3>
                                <div className="mt-2 text-sm text-blue-700">
                                    <p>Access your dashboard, manage events, and track sales.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <form action={dispatch} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-[#0f172a]">
                                Work Email
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full appearance-none rounded-lg border border-slate-200 px-3 py-2 placeholder-slate-400 shadow-sm focus:border-[#0f172a] focus:outline-none focus:ring-[#0f172a] sm:text-sm"
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
                                    autoComplete="current-password"
                                    required
                                    className="block w-full appearance-none rounded-lg border border-slate-200 px-3 py-2 placeholder-slate-400 shadow-sm focus:border-[#0f172a] focus:outline-none focus:ring-[#0f172a] sm:text-sm"
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
                            {errorMessage && (
                                <p className="text-sm text-red-500">{errorMessage}</p>
                            )}
                        </div>
                    </form>
                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-200" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-white px-2 text-slate-500">Not an organizer?</span>
                            </div>
                        </div>
                        <div className="mt-6">
                            <Link
                                href="/auth/customer/login"
                                className="flex w-full justify-center rounded-lg border border-slate-200 bg-white py-2 px-4 text-sm font-medium text-[#64748b] shadow-sm hover:bg-slate-50 transition-colors"
                            >
                                Sign in as Customer
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
