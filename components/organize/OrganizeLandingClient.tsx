"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Ticket,
  BarChart3,
  Users,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Globe2,
  Zap,
} from "lucide-react";

export default function OrganizeLandingClient() {
  return (
    <div className="min-h-screen bg-[#FDFDFF] text-[#333333]">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2">
              <div className="relative w-32 h-10">
                <Image
                  src="/logo.svg"
                  alt="Tickex Logo"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <Link
                href="#"
                className="font-medium text-gray-600 hover:text-primary transition-colors"
              >
                Features
              </Link>
              <Link
                href="#"
                className="font-medium text-gray-600 hover:text-primary transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="#"
                className="font-medium text-gray-600 hover:text-primary transition-colors"
              >
                Resources
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/auth/organizer/login"
                className="font-bold text-gray-600 hover:text-primary transition-colors"
              >
                Log In
              </Link>
              <Link
                href="/auth/organizer/register"
                className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:w-1/2"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6">
                <Zap className="w-4 h-4" />
                <span>The #1 Platform for Africa's Organizers</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-black text-[#333333] leading-[1.1] mb-6 tracking-tight">
                Power Your Events with{" "}
                <span className="text-primary italic">Tickex</span>
              </h1>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-xl">
                Scale your reach, simplify your operations, and maximize revenue
                with Africa's most intuitive event management suite. Built for
                speed, trust, and growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/signup-organizer"
                  className="inline-flex items-center justify-center bg-primary text-white px-8 py-4 rounded-2xl font-black text-lg hover:scale-[1.02] transition-all shadow-xl shadow-primary/30 group"
                >
                  Get Started as an Organizer
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button className="inline-flex items-center justify-center border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all">
                  Watch Demo
                </button>
              </div>
              <div className="mt-10 flex items-center gap-6">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden relative"
                    >
                      <Image
                        src={`https://i.pravatar.cc/150?u=${i + 10}`}
                        alt="User"
                        fill
                      />
                    </div>
                  ))}
                </div>
                <p className="text-sm font-medium text-gray-500">
                  <span className="text-primary font-bold">
                    Trusted by 2,000+
                  </span>{" "}
                  industry leaders across the continent.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="hidden lg:block lg:w-1/2 relative"
            >
              <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-primary/20 border border-primary/10">
                <Image
                  src="/organizer_dashboard_preview_1766052764700.png"
                  alt="Dashboard Preview"
                  width={800}
                  height={600}
                  className="w-full"
                />
                <div className="absolute inset-0 bg-linear-to-tr from-primary/10 to-transparent" />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl animate-blob" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-[#F8F9FF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-black text-[#333333] mb-6 tracking-tight">
              Everything You Need to Scale
            </h2>
            <p className="text-lg text-gray-600">
              We've removed the technical hurdles so you can focus on creating
              memorable experiences.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-white p-10 rounded-[2rem] shadow-xl shadow-gray-100 border border-gray-50"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8">
                <Ticket className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Effortless Ticketing</h3>
              <p className="text-gray-600 leading-relaxed">
                Create events, set ticket tiers, and start selling in minutes.
                Our streamlined builder is designed for high-conversion sales.
              </p>
            </motion.div>
            {/* Card 2 */}
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-white p-10 rounded-[2rem] shadow-xl shadow-gray-100 border border-gray-50"
            >
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-8">
                <BarChart3 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Real-Time Analytics</h3>
              <p className="text-gray-600 leading-relaxed">
                Track sales, demographics, and revenue forecasts with dashboards
                built for decision-making. Know exactly what works.
              </p>
            </motion.div>
            {/* Card 3 */}
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-white p-10 rounded-[2rem] shadow-xl shadow-gray-100 border border-gray-50"
            >
              <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-600 mb-8">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Audience Engagement</h3>
              <p className="text-gray-600 leading-relaxed">
                Send campaigns, manage communications, and keep attendees
                excited before, during, and after with our built-in CRM tools.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust / Payments Section */}
      <section className="py-24 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-500 mb-12 uppercase tracking-widest">
            Secure Payments Powered by Trusted Providers
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-20 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            {/* MoMo Stylized */}
            <div className="flex items-center gap-2 font-black text-2xl text-[#FFCB05]">
              <div className="w-10 h-10 bg-[#FFCB05] rounded-full flex items-center justify-center text-[#004F9E] text-xs font-black">
                MoMo
              </div>
              Mobile Money
            </div>
            {/* Visa */}
            <svg
              className="h-8 w-auto text-[#1434CB]"
              viewBox="0 0 100 32"
              fill="currentColor"
            >
              <path d="M38.16,1.48,32.7,25.66c-.22.92-1,1.52-1.92,1.52H14.86L10.54,4.2c-.3-.92-1.12-1.54-2.1-1.6L0.2,1.86s-1.1.2-1.1,0.66C-0.9,3,2,6.54,2,6.54c3.44,3.12,6.54,6.48,6.54,10.6l5.72,21.3h7.62l14-23.94,7.66,23.94h7.64l11.44-24.46h-7.66C44.1,14.04,39,1.48,38.16,1.48Zm22.38,14a13.3,13.3,0,1,0,13.3,13.3A13.3,13.3,0,0,0,60.54,15.44ZM60.54,36a7,7,0,1,1,7-7A7,7,0,0,1,60.54,36Zm26.16-20.56h-6.38a3.14,3.14,0,0,0-2.82,1.88L65.6,35.46a3.14,3.14,0,0,0,2.82,4.4h6.38L86.7,15.44Z" />
            </svg>
            {/* Mastercard */}
            <div className="flex items-center gap-1">
              <div className="w-8 h-8 bg-[#EB001B] rounded-full opacity-90" />
              <div className="w-8 h-8 bg-[#F79E1B] rounded-full -ml-4 opacity-90" />
              <span className="font-bold text-gray-800 text-xl ml-2 tracking-tighter">
                mastercard
              </span>
            </div>
            {/* PayPal */}
            <div className="flex items-center gap-2">
              <svg
                className="h-8 w-auto text-[#003087]"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20.067 6.378c.496 4.477-1.534 8.205-6.09 8.205h-2.1c-.463 0-.853.333-.941.785l-1.071 5.48c-.046.236-.252.402-.492.402H5.56a.4.4 0 01-.397-.478l2.693-13.785a.8.8 0 01.785-.646H14.1c3.085 0 5.56 1.432 5.967 4.032z" />
              </svg>
              <span className="font-italic text-[#003087] font-black text-2xl">
                PayPal
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 -skew-y-3 origin-right scale-y-125" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl lg:text-5xl font-black text-[#333333] mb-8 leading-tight">
            Ready to Grow Your Events?
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join thousands of organizers using Tickex to simplify event
            management and maximize ticket sales. Your next big success starts
            here.
          </p>
          <Link
            href="/signup-organizer"
            className="inline-flex items-center justify-center bg-primary text-white px-12 py-5 rounded-[1.5rem] font-black text-xl hover:scale-105 transition-all shadow-2xl shadow-primary/40 group"
          >
            Create Your Organizer Account
            <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </Link>
          <p className="mt-8 text-gray-500 font-medium tracking-wide">
            NO CREDIT CARD REQUIRED • START FREE
          </p>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="py-12 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="relative w-24 h-8 opacity-50">
              <Image
                src="/logo.svg"
                alt="Tickex Logo"
                fill
                className="object-contain object-left"
              />
            </div>
            <div className="flex gap-8 text-sm font-medium text-gray-400">
              <Link href="#" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                Contact Support
              </Link>
            </div>
            <p className="text-gray-400 text-sm">
              © 2025 TickEx. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
