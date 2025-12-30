"use client";

import AuthLayout from "@/components/auth/AuthLayout";
import VerifyOtpForm from "@/components/auth/VerifyOtpForm";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function VerifyPageContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const type = searchParams.get("type") || "user";

  if (!email) {
    return (
      <div className="text-center text-gray-500">
        Invalid verification link.
      </div>
    );
  }

  return (
    <AuthLayout
      title="Verify Email"
      subtitle="Secure your account."
      backLink={{
        href:
          type === "organizer"
            ? "/auth/organizer/login"
            : "/auth/customer/login",
        label: "Back to Login",
      }}
    >
      <VerifyOtpForm email={email} type={type} />
    </AuthLayout>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyPageContent />
    </Suspense>
  );
}
