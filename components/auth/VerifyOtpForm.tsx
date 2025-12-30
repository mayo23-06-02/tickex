"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { verifyOtp } from "@/app/actions/otp";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg shadow-primary/30 text-sm font-bold text-white bg-primary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? (
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
      ) : (
        "Verify Code"
      )}
    </button>
  );
}

interface VerifyOtpFormProps {
  email: string;
  type: string;
}

export default function VerifyOtpForm({ email, type }: VerifyOtpFormProps) {
  const router = useRouter();

  const [state, formAction] = useActionState(
    async (prevState: any, formData: FormData) => {
      const code = formData.get("code") as string;
      // const email = formData.get("email") as string; // Hidden input
      // const type = formData.get("type") as string; // Hidden input

      // We can pass these directly to the action wrappers or use hidden inputs
      // But useActionState expects the action to match the signature.
      // I'll wrap verifyOtp in an action here or update verifyOtp to accept FormData?
      // verifyOtp signature: (email, code, type)
      // So I'll just call it directly.

      const result = await verifyOtp(email, code, type as "user" | "organizer");

      if (result.success) {
        toast.success("Email verified successfully!");
        // Redirect to login based on type
        const loginUrl =
          type === "organizer"
            ? "/auth/organizer/login"
            : "/auth/customer/login";
        router.push(loginUrl);
      } else if (result.error) {
        toast.error(result.error);
      }
      return result;
    },
    undefined
  );

  return (
    <form action={formAction} className="space-y-6">
      <div className="text-center mb-4">
        <p className="text-sm text-gray-500">
          We sent a verification code to{" "}
          <span className="font-semibold text-gray-900">{email}</span>.
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Check your spam folder if you don't see it.
        </p>
      </div>

      <div>
        <label
          htmlFor="code"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Verification Code
        </label>
        <input
          id="code"
          name="code"
          type="text"
          required
          placeholder="123456"
          className="text-center text-2xl tracking-widest appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50"
          maxLength={6}
        />
      </div>

      <SubmitButton />

      <div className="mt-4 text-center text-xs text-gray-400">
        <button type="button" className="text-primary hover:underline">
          Resend Code
        </button>
      </div>
    </form>
  );
}
