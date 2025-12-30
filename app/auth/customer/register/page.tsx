"use client";

import AuthLayout from "@/components/auth/AuthLayout";
import CustomerRegisterForm from "@/components/auth/CustomerRegisterForm";

export default function CustomerRegisterPage() {
  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join the network. Get started in seconds."
    >
      <CustomerRegisterForm />
    </AuthLayout>
  );
}
