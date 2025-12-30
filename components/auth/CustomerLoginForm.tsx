"use client";

import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { authenticateCustomer } from "@/app/actions/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

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
        "Explore Now"
      )}
    </button>
  );
}

export default function CustomerLoginForm() {
  const [errorMessage, dispatch] = useActionState(
    authenticateCustomer,
    undefined
  );
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (errorMessage === "Invalid credentials.") {
      toast.error("Invalid email or password");
    }
  }, [errorMessage]);

  return (
    <form action={dispatch} className="space-y-6">
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
          autoComplete="email"
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
            autoComplete="current-password"
            required
            placeholder="••••••••"
            className="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm bg-gray-50 pr-10"
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

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
          />
          <label
            htmlFor="remember-me"
            className="ml-2 block text-sm text-gray-900"
          >
            Remember me
          </label>
        </div>

        <div className="text-sm">
          <Link
            href="#"
            className="font-medium text-primary hover:text-primary"
          >
            Forgot Password?
          </Link>
        </div>
      </div>

      <SubmitButton />

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Don't have an account?
            </span>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/auth/customer/register"
            className="font-bold text-primary hover:text-primary"
          >
            Sign Up
          </Link>
        </div>
      </div>

      <div className="mt-4 text-center text-xs text-gray-400">
        <Link href="/auth/organizer/login">Log in as Organizer</Link>
      </div>
    </form>
  );
}
