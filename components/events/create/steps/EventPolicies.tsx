"use client";

import { Shield, AlertTriangle } from "lucide-react";
import { EventFormData } from "../CreateEventWizard";

interface StepProps {
    data: EventFormData;
    update: (data: Partial<EventFormData>) => void;
}

export function EventPolicies({ data, update }: StepProps) {
    return (
        <div className="space-y-6 max-w-3xl mx-auto">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-[#0f172a]">Policies & Rules</h2>
                <p className="text-[#64748b]">Set the conditions for your event attendees.</p>
            </div>

            <div className="space-y-6">
                {/* Refund Policy */}
                <div className="space-y-3">
                    <label className="text-sm font-medium text-[#0f172a]">Refund Policy</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {["No Refunds", "7 days before", "Flexible"].map((policy) => (
                            <div
                                key={policy}
                                onClick={() => update({ refundPolicy: policy })}
                                className={`cursor-pointer p-4 rounded-xl border-2 transition-all ${data.refundPolicy === policy
                                        ? "border-[#1DB954] bg-green-50/30"
                                        : "border-[#e2e8f0] hover:border-slate-300"
                                    }`}
                            >
                                <div className={`w-4 h-4 rounded-full border-2 mb-2 ${data.refundPolicy === policy ? "border-[#1DB954] bg-[#1DB954]" : "border-slate-300"
                                    }`}></div>
                                <div className="font-medium text-sm text-[#0f172a]">{policy}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Age Restriction */}
                <div className="space-y-3">
                    <label className="text-sm font-medium text-[#0f172a]">Age Restriction</label>
                    <select
                        value={data.ageRestriction}
                        onChange={(e) => update({ ageRestriction: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-[#e2e8f0] bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1DB954]/20 focus:border-[#1DB954] transition-all"
                    >
                        <option value="All Ages">All Ages</option>
                        <option value="18+">18+ Only</option>
                        <option value="21+">21+ Only</option>
                    </select>
                </div>

                {/* Terms */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex gap-3">
                    <Shield className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                        <h4 className="text-sm font-semibold text-yellow-800 mb-1">Liability Disclaimer</h4>
                        <p className="text-xs text-yellow-700 leading-relaxed">
                            Tickex is not responsible for any incidents that occur during the event. By publishing, you agree to our Terms of Service and Event Organizer Policy.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
