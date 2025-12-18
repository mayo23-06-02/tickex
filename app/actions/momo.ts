"use server";

import { auth } from "@/auth";
import { v4 as uuidv4 } from "uuid";

async function getAccessToken() {
    const subKey = process.env.MOMO_SUBSCRIPTION_KEY || "";
    const apiUser = process.env.MOMO_API_USER || "";
    const apiKey = process.env.MOMO_API_KEY || "";
    const targetEnv = process.env.MOMO_TARGET_ENV || "sandbox";
    const baseUrl = process.env.MOMO_BASE_URL || "https://sandbox.momodeveloper.mtn.com";
    if (!subKey || !apiUser || !apiKey) throw new Error("Missing MoMo credentials");
    const authHeader = Buffer.from(`${apiUser}:${apiKey}`).toString("base64");
    const res = await fetch(`${baseUrl}/collection/token/`, {
        method: "POST",
        headers: {
            Authorization: `Basic ${authHeader}`,
            "Ocp-Apim-Subscription-Key": subKey,
            "X-Target-Environment": targetEnv,
            "Content-Type": "application/json",
        },
        body: "{}",
        cache: "no-store",
    });
    if (!res.ok) throw new Error(`Token error ${res.status}`);
    return (await res.json()) as { access_token: string; expires_in: number };
}

export async function requestToPay(params: {
    amount: string;
    currency?: string;
    msisdn: string;
    externalId?: string;
    payerMessage?: string;
    payeeNote?: string;
    referenceId?: string;
    callbackUrl?: string;
}) {
    const session = await auth();
    if (!session?.user) return { error: "Unauthorized" };
    try {
        const { access_token } = await getAccessToken();
        const subKey = process.env.MOMO_SUBSCRIPTION_KEY || "";
        const targetEnv = process.env.MOMO_TARGET_ENV || "sandbox";
        const baseUrl = process.env.MOMO_BASE_URL || "https://sandbox.momodeveloper.mtn.com";
        const referenceId = params.referenceId || uuidv4();
        const currency = params.currency || "EUR";
        const body = {
            amount: params.amount,
            currency,
            externalId: params.externalId || referenceId,
            payer: { partyIdType: "MSISDN", partyId: params.msisdn },
            payerMessage: params.payerMessage || "Tickex payment",
            payeeNote: params.payeeNote || "Thank you",
        };
        const headers: Record<string, string> = {
            Authorization: `Bearer ${access_token}`,
            "Ocp-Apim-Subscription-Key": subKey,
            "X-Reference-Id": referenceId,
            "X-Target-Environment": targetEnv,
            "Content-Type": "application/json",
        };
        if (params.callbackUrl) headers["X-Callback-Url"] = params.callbackUrl;
        const res = await fetch(`${baseUrl}/collection/v1_0/requesttopay`, {
            method: "POST",
            headers,
            body: JSON.stringify(body),
            cache: "no-store",
        });
        if (!res.ok) {
            const text = await res.text();
            return { error: `RTP error ${res.status}`, details: text };
        }
        return { success: true, referenceId };
    } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : "Unexpected error";
        return { error: msg };
    }
}

export async function getRequestToPayStatus(referenceId: string) {
    const session = await auth();
    if (!session?.user) return { error: "Unauthorized" };
    try {
        const { access_token } = await getAccessToken();
        const subKey = process.env.MOMO_SUBSCRIPTION_KEY || "";
        const targetEnv = process.env.MOMO_TARGET_ENV || "sandbox";
        const baseUrl = process.env.MOMO_BASE_URL || "https://sandbox.momodeveloper.mtn.com";
        const res = await fetch(`${baseUrl}/collection/v1_0/requesttopay/${referenceId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${access_token}`,
                "Ocp-Apim-Subscription-Key": subKey,
                "X-Target-Environment": targetEnv,
            },
            cache: "no-store",
        });
        if (!res.ok) {
            const text = await res.text();
            return { error: `Status error ${res.status}`, details: text };
        }
        const json = await res.json();
        return { success: true, data: json };
    } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : "Unexpected error";
        return { error: msg };
    }
}

type MomoActionState = {
    success?: boolean;
    referenceId?: string;
    data?: unknown;
    error?: string;
    details?: string;
};

export type { MomoActionState };

export async function momoPayAction(prevState: MomoActionState, formData: FormData) {
    const amount = String(formData.get("amount") || "");
    const currency = String(formData.get("currency") || "EUR");
    const msisdn = String(formData.get("msisdn") || "");
    const externalId = String(formData.get("externalId") || "");
    if (!amount || !msisdn) return { error: "Amount and phone are required" };
    return await requestToPay({ amount, currency, msisdn, externalId });
}

export async function momoStatusAction(prevState: MomoActionState, formData: FormData) {
    const referenceId = String(formData.get("referenceId") || "");
    if (!referenceId) return { error: "Reference ID is required" };
    return await getRequestToPayStatus(referenceId);
}
