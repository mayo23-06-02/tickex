"use client";

import AuthLayout from "@/components/auth/AuthLayout";
import OrganizerLoginForm from "@/components/auth/OrganizerLoginForm";

export default function OrganizerLoginPage() {
  return (
    <AuthLayout title="Organizer Portal" subtitle="Manage your events and team">
      <OrganizerLoginForm />
    </AuthLayout>
  );
}
