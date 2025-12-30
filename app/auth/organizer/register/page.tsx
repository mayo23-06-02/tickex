"use client";

import AuthLayout from "@/components/auth/AuthLayout";
import OrganizerRegisterForm from "@/components/auth/OrganizerRegisterForm";

export default function OrganizerRegisterPage() {
  return (
    <AuthLayout
      title="Create Organization"
      subtitle="Power your events with TickEx."
    >
      <OrganizerRegisterForm />
    </AuthLayout>
  );
}
