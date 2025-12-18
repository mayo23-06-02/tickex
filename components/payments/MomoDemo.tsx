"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { momoPayAction, momoStatusAction, type MomoActionState } from "@/app/actions/momo";

function SubmitButton({ label }: { label: string }) {
    const { pending } = useFormStatus();
    return (
        <button
            type="submit"
            disabled={pending}
            className="px-4 py-2 rounded-lg bg-[#1DB954] text-white font-bold hover:bg-[#169c46] transition-colors disabled:opacity-50"
        >
            {pending ? "Processing..." : label}
        </button>
    );
}

export function MomoDemo() {
    const initial: MomoActionState = {};
    const [payState, payDispatch] = useActionState<MomoActionState, FormData>(momoPayAction, initial);
    const [statusState, statusDispatch] = useActionState<MomoActionState, FormData>(momoStatusAction, initial);
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-4 border border-border rounded-lg bg-card">
                <div className="text-sm font-semibold text-muted-foreground mb-3">MoMo Collection Demo</div>
                <form action={payDispatch} className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                            <label className="text-xs font-medium text-muted-foreground">Amount</label>
                            <input name="amount" type="number" min="1" defaultValue="10" className="w-full px-3 py-2 rounded-lg border border-border text-sm" />
                        </div>
                        <div>
                            <label className="text-xs font-medium text-muted-foreground">Currency</label>
                            <input name="currency" defaultValue="EUR" className="w-full px-3 py-2 rounded-lg border border-border text-sm" />
                        </div>
                        <div>
                            <label className="text-xs font-medium text-muted-foreground">MSISDN</label>
                            <input name="msisdn" placeholder="2567XXXXXXXX" className="w-full px-3 py-2 rounded-lg border border-border text-sm" />
                        </div>
                    </div>
                    <div>
                        <SubmitButton label="Initiate Payment" />
                    </div>
                    <div className="text-xs text-muted-foreground">
                        {payState?.success && payState?.referenceId && (
                            <div className="text-green-600">Request initiated. Reference ID: {payState.referenceId}</div>
                        )}
                        {payState?.error && (
                            <div className="text-red-600">Error: {String(payState.error)}</div>
                        )}
                    </div>
                </form>
            </div>
            <div className="p-4 border border-border rounded-lg bg-card">
                <div className="text-sm font-semibold text-muted-foreground mb-3">Check Payment Status</div>
                <form action={statusDispatch} className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                            <label className="text-xs font-medium text-muted-foreground">Reference ID</label>
                            <input name="referenceId" className="w-full px-3 py-2 rounded-lg border border-border text-sm" />
                        </div>
                    </div>
                    <div>
                        <SubmitButton label="Check Status" />
                    </div>
                    <div className="text-xs text-muted-foreground">
                        {statusState?.success && statusState?.data ? (
                            <div className="text-green-600">Status: {String(((statusState.data as { status?: string })?.status || ""))}</div>
                        ) : null}
                        {statusState?.error && (
                            <div className="text-red-600">Error: {String(statusState.error)}</div>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
