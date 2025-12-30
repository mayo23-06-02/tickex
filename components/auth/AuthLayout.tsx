"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
  sideContent?: ReactNode;
  backLink?: { href: string; label: string };
}

export default function AuthLayout({
  children,
  title,
  subtitle,
  sideContent,
  backLink,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen w-full flex bg-[#F8F9FA] overflow-hidden">
      {/* Left Section - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 lg:p-12 relative z-10">
        <div className="w-full max-w-md">
          {/* Logo / Brand Header */}
          <div className="mb-8 flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative w-32 h-12 transition-transform group-hover:scale-105">
                <Image
                  src="/logo.svg"
                  alt="Tickex Logo"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-extrabold text-[#333333] mb-2 tracking-tight">
              {title}
            </h1>
            <p className="text-gray-500 mb-8">{subtitle}</p>

            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/40 p-8">
              {children}
            </div>

            {backLink && (
              <div className="mt-6 text-center">
                <Link
                  href={backLink.href}
                  className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-primary transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  {backLink.label}
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Right Section - Decorative Background with Image */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden items-center justify-center p-12 text-white">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/auth_background_event_concert_1766052410493.png"
            alt="Event Background"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-linear-to-br from-primary/80 via-primary/40 to-black/60 mix-blend-multiply" />
        </div>

        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 z-1" />

        {/* Glassmorphism Abstract Shapes */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent rounded-full mix-blend-overlay filter blur-3xl opacity-30 animate-blob z-2" />
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-primary rounded-full mix-blend-overlay filter blur-3xl opacity-30 animate-blob animation-delay-4000 z-2" />

        <div className="relative z-10 max-w-lg text-center">
          {sideContent || (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="w-20 h-20 mx-auto bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 shadow-2xl flex items-center justify-center mb-8 relative overflow-hidden group hover:bg-white/30 transition-colors">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-10 h-10 text-white"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h11l5-5z" />
                  <path d="M7 11h10" />
                  <path d="M7 15h10" />
                  <path d="M7 7h10" />
                </svg>
              </div>

              <h2 className="text-5xl font-black mb-6 tracking-tight leading-tight">
                Your Gateway to{" "}
                <span className="text-white underline decoration-accent underline-offset-8">
                  Unforgettable
                </span>{" "}
                Experiences.
              </h2>
              <p className="text-white/90 text-xl font-medium leading-relaxed">
                Join 100,000+ fans and organizers creating the future of event
                ticketing. Secure, seamless, and spectacular.
              </p>

              <div className="mt-12 flex justify-center gap-3">
                <div className="w-12 h-1.5 bg-white rounded-full shadow-lg" />
                <div className="w-2 h-1.5 bg-white/40 rounded-full" />
                <div className="w-2 h-1.5 bg-white/40 rounded-full" />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
