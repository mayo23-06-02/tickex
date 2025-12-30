"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { registerUser } from "@/app/actions/auth"; // Assuming this export exists
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Eye, EyeOff, Check, X } from "lucide-react";

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
        "Create Account"
      )}
    </button>
  );
}

export default function CustomerRegisterForm() {
  const [state, formAction] = useActionState(
    async (prevState: any, formData: FormData) => {
      const password = formData.get("password") as string;
      const confirmPassword = formData.get("confirmPassword") as string;

      if (password !== confirmPassword) {
        return { error: "Passwords do not match" };
      }

      const result = await registerUser(prevState, formData);
      if (result.success) {
        toast.success("Account created! Please verify your email.");
        // Redirect to verify page
        const email = formData.get("email") as string;
        // storing email in localstorage or passing via query param
        window.location.href = `/auth/verify?email=${encodeURIComponent(
          email
        )}&type=user`;
      } else if (result.error) {
        toast.error(result.error);
      }
      return result;
    },
    undefined
  );

  const [showPassword, setShowPassword] = useState(false);

  // Password strength indicators (simplified)
  const [password, setPassword] = useState("");
  const hasMinLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Full Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="Dave Sanders"
          className="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm bg-gray-50"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="d.sand@company.com"
          className="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm bg-gray-50"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-sm bg-gray-50 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
          placeholder="••••••••"
          className="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm bg-gray-50"
        />
      </div>

      {/* Password Requirements */}
      <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 mt-2">
        <div
          className={`flex items-center gap-1 ${
            hasMinLength ? "text-green-600" : ""
          }`}
        >
          {hasMinLength ? (
            <Check className="w-3 h-3" />
          ) : (
            <div className="w-3 h-3 rounded-full border border-gray-300" />
          )}{" "}
          8+ characters
        </div>
        <div
          className={`flex items-center gap-1 ${
            hasNumber ? "text-green-600" : ""
          }`}
        >
          {hasNumber ? (
            <Check className="w-3 h-3" />
          ) : (
            <div className="w-3 h-3 rounded-full border border-gray-300" />
          )}{" "}
          At least 1 number
        </div>
        <div
          className={`flex items-center gap-1 ${
            hasUpper ? "text-green-600" : ""
          }`}
        >
          {hasUpper ? (
            <Check className="w-3 h-3" />
          ) : (
            <div className="w-3 h-3 rounded-full border border-gray-300" />
          )}{" "}
          1 uppercase letter
        </div>
        <div
          className={`flex items-center gap-1 ${
            hasLower ? "text-green-600" : ""
          }`}
        >
          {hasLower ? (
            <Check className="w-3 h-3" />
          ) : (
            <div className="w-3 h-3 rounded-full border border-gray-300" />
          )}{" "}
          1 lowercase letter
        </div>
        <div
          className={`flex items-center gap-1 ${
            hasSpecial ? "text-green-600" : ""
          }`}
        >
          {hasSpecial ? (
            <Check className="w-3 h-3" />
          ) : (
            <div className="w-3 h-3 rounded-full border border-gray-300" />
          )}{" "}
          1 special character
        </div>
      </div>

      <SubmitButton />

      <div className="mt-6 text-center text-sm">
        <Link
          href="/auth/customer/login"
          className="flex items-center justify-center gap-2 text-gray-500 hover:text-gray-900"
        >
          <ArrowLeftIcon /> Back to Login
        </Link>
      </div>
    </form>
  );
}

function ArrowLeftIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-4 h-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
      />
    </svg>
  );
}
