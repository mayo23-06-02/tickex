"use client";

import AuthLayout from "@/components/auth/AuthLayout";
import CustomerLoginForm from "@/components/auth/CustomerLoginForm";

export default function CustomerLoginPage() {
  return (
    <AuthLayout
      title="Log in to your Account"
      subtitle="Welcome back! Select method to log in:"
    >
      {/* Social Login Buttons (Mocked for visual match) */}
      <div className="flex gap-4 mb-6">
        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Sign Up with Google
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
          <img
            src="https://www.svgrepo.com/show/511330/apple-173.svg"
            alt="Apple"
            className="w-5 h-5"
          />
          Sign Up with Apple
        </button>
      </div>

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-gray-500">
            or continue with email
          </span>
        </div>
      </div>

      <CustomerLoginForm />
    </AuthLayout>
  );
}
