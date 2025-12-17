"use client";

import { useState, useEffect, useRef } from "react";
import {
  Search,
  MapPin,
  Calendar,
  ArrowRight,
  ChevronRight,
  Star,
  Users,
  Ticket,
  Clock,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface LandingPageProps {
  featuredEvents: any[];
  trendingEvents: any[];
}

export default function LandingPageClient({
  featuredEvents,
  trendingEvents,
}: LandingPageProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const heroRef = useRef<HTMLDivElement>(null);

  // Event categories
  const categories = [
    { id: "all", name: "All Events", icon: "🎉", color: "bg-primary" },
    { id: "music", name: "Music", icon: "🎵", color: "bg-accent" },
    { id: "sports", name: "Sports", icon: "⚽", color: "bg-success" },
    { id: "arts", name: "Arts & Theater", icon: "🎭", color: "bg-warning" },
    { id: "food", name: "Food & Drink", icon: "🍕", color: "bg-error" },
    { id: "conference", name: "Conferences", icon: "💼", color: "bg-info" },
  ];

  // Stats data
  const stats = [
    {
      value: "50K+",
      label: "Events Hosted",
      icon: <Ticket className="w-5 h-5" />,
    },
    {
      value: "1M+",
      label: "Happy Attendees",
      icon: <Users className="w-5 h-5" />,
    },
    { value: "200+", label: "Cities", icon: <MapPin className="w-5 h-5" /> },
    { value: "24/7", label: "Support", icon: <Clock className="w-5 h-5" /> },
  ];

  // Features
  const features = [
    {
      title: "Secure Ticketing",
      description: "Blockchain-verified tickets with anti-fraud protection",
      icon: "🛡️",
      color: "bg-primary/10",
    },
    {
      title: "Instant Delivery",
      description: "Digital tickets delivered instantly to your device",
      icon: "⚡",
      color: "bg-success/10",
    },
    {
      title: "Best Price Guarantee",
      description:
        "We ensure you get the best prices or we refund the difference",
      icon: "💰",
      color: "bg-warning/10",
    },
    {
      title: "Easy Refunds",
      description: "Hassle-free refunds up to 24 hours before the event",
      icon: "↩️",
      color: "bg-info/10",
    },
  ];

  // Testimonials
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Event Organizer",
      content:
        "Tickex made selling tickets effortless. The platform is intuitive and the support team is fantastic!",
      rating: 5,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    {
      name: "Michael Chen",
      role: "Music Festival Attendee",
      content:
        "Found tickets to all my favorite festivals at great prices. The mobile app is super convenient!",
      rating: 5,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    },
    {
      name: "Emma Rodriguez",
      role: "Corporate Event Manager",
      content:
        "The analytics dashboard helped us understand our audience better. Highly recommend!",
      rating: 5,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.append("search", searchQuery);
    if (selectedCity) params.append("location", selectedCity);
    if (selectedDate) params.append("date", selectedDate);

    router.push(`/events?${params.toString()}`);
  };

  // Hero animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 font-sans overflow-x-hidden">
      {/* Navigation */}
      <nav className="sticky top-0 w-full bg-white/90 backdrop-blur-lg z-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/logo.svg"
                alt="Tickex Logo"
                width={150}
                height={100}
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/events"
                className="text-slate-700 hover:text-primary font-medium transition-colors"
              >
                Discover Events
              </Link>
              <Link
                href="/organize"
                className="text-slate-700 hover:text-primary font-medium transition-colors"
              >
                Organize
              </Link>
              <Link
                href="/help"
                className="text-slate-700 hover:text-primary font-medium transition-colors"
              >
                Help Center
              </Link>
              <Link
                href="/auth/customer/login"
                className="px-6 py-2 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-all hover:shadow-lg"
              >
                Sign In
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-100"
            >
              <div
                className={`w-6 h-0.5 bg-slate-700 transition-all ${
                  isMenuOpen ? "rotate-45 translate-y-1" : ""
                }`}
              />
              <div
                className={`w-6 h-0.5 bg-slate-700 my-1 transition-all ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              />
              <div
                className={`w-6 h-0.5 bg-slate-700 transition-all ${
                  isMenuOpen ? "-rotate-45 -translate-y-1" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-slate-100"
            >
              <div className="px-4 py-6 space-y-4">
                <Link
                  href="/events"
                  className="block text-slate-700 hover:text-primary font-medium py-2"
                >
                  Discover Events
                </Link>
                <Link
                  href="/organize"
                  className="block text-slate-700 hover:text-primary font-medium py-2"
                >
                  Organize
                </Link>
                <Link
                  href="/help"
                  className="block text-slate-700 hover:text-primary font-medium py-2"
                >
                  Help Center
                </Link>
                <Link href="/auth/customer/login">
                  <button className="">Sign In</button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative overflow-hidden">
        {/* Background still image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1600"
            alt="Hero background"
            fill
            priority
            className="object-cover"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-blue-500/80" />
        </div>

        {/* Animated shapes */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

        {/* Hero Content */}
        <div className="relative  max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl md:text-5xl font-bold mb-6">
                <span className="bg-white from-primary via-accent to-primary bg-clip-text text-transparent">
                  Discover Amazing
                </span>
                <br />
                <span className="text-slate-900">Events Around You</span>
              </h1>

              <p className="text-xl text-white text-slate-600 mb-12 max-w-3xl ">
                From concerts and sports to conferences and festivals - find and
                book tickets to the best events in your city. Secure, simple,
                and seamless.
              </p>
            </motion.div>

            {/* Search Bar */}
            <motion.form
              onSubmit={handleSearch}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-4xl   rounded-2xl  "
            >
              <div className="flex flex-col bg-white p-2 rounded-2xl md:flex-row gap-2 md:gap-4">
                <div className="flex-1">
                  <div className="flex items-center p-4 rounded-xl hover:bg-slate-50 transition-colors">
                    <Search className="w-5 h-5 text-slate-400 mr-3" />
                    <input
                      type="text"
                      placeholder="Search events, artists, or venues..."
                      className="w-full bg-transparent text-slate-800 placeholder-slate-400 focus:outline-none"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-8 py-4 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-all hover:shadow-lg flex items-center justify-center"
                >
                  Search Events
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </motion.form>

            {/* Categories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 flex flex-wrap  gap-3"
            >
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full flex items-center space-x-2 transition-all bg-slate-100 `}
                >
                  <span className="font-medium">{cat.name}</span>
                </button>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
      <div className="w-full    ">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/strip.svg"
            alt="Tickex"
            width={1420}
            height={10}
            className="w-full  object-cover"
            priority
          />
        </Link>
      </div>
      {/* Featured Events */}
      <section className="py-20 bg-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Featured <span className="text-primary">Events</span>
              </h2>
              <p className="text-slate-600">
                Hand-picked events you won&apos;t want to miss
              </p>
            </div>
            <Link
              href="/events"
              className="hidden md:flex items-center text-primary font-semibold hover:text-primary/80 transition-colors"
            >
              View all events
              <ChevronRight className="w-5 h-5 ml-1" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {featuredEvents.slice(0, 6).map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
              >
                <Link href={`/events/${event.id}`}>
                  <div className="group bg-white rounded-2xl overflow-hidden  hover:shadow-2xl transition-all duration-300 cursor-pointer">
                    <div className="relative h-full aspect-square overflow-hidden">
                      <Image
                        src={
                          event.imageUrl ||
                          "https://images.unsplash.com/photo-1514525253161-7a46d19cd819"
                        }
                        alt={event.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors mb-2">
                            {event.title}
                          </h3>
                          <p className="text-slate-600 text-sm line-clamp-2">
                            {event.description ||
                              "Join us for an unforgettable experience"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4 text-slate-400" />
                          <span className="text-sm text-slate-600">
                            {event.location || "Various Venues"}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4 text-slate-400" />
                          <span className="text-sm text-slate-600">
                            {event.date
                              ? new Date(event.date).toLocaleDateString()
                              : "TBD"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/events"
              className="inline-flex items-center px-8 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition-all hover:shadow-lg"
            >
              Browse All Events
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>
      <div className="w-full h-[400px] max-w-7xl mx-auto ">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/landing_banner.svg"
            alt="Tickex"
            width={1420}
            height={400}
            className="w-full h-[400px] object-cover"
            priority
          />
        </Link>
      </div>
      {/* Features Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why Choose <span className="text-primary">Tickex</span>
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Experience event ticketing reimagined with cutting-edge technology
              and customer-centric features
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-2xl  hover:shadow-xl transition-shadow"
              >
                <div
                  className={`w-14 h-14 ${feature.color} rounded-xl flex items-center justify-center mb-6`}
                >
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Find Your Next Adventure?
          </h2>
          <p className="text-white/90 mb-8 text-lg">
            Join thousands of event-goers who trust Tickex for their ticket
            needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/events"
              className="px-8 py-3 bg-white text-primary rounded-full font-bold hover:bg-slate-100 transition-all hover:scale-105"
            >
              Explore Events
            </Link>
            <Link
              href="/auth/customer/signup"
              className="px-8 py-3 border-2 border-white text-white rounded-full font-bold hover:bg-white/10 transition-all hover:scale-105"
            >
              Sign Up Free
            </Link>
          </div>
        </div>
      </section>
      <div className="w-full    ">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/strip.svg"
            alt="Tickex"
            width={1420}
            height={20}
            className="w-full  object-cover"
            priority
          />
        </Link>
      </div>
      {/* Footer */}
      <footer className="bg-slate-900 text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">T</span>
                </div>
                <span className="text-2xl font-bold">Tickex</span>
              </div>
              <p className="text-slate-400 mb-6">
                Your gateway to unforgettable experiences. Secure tickets to the
                best events worldwide.
              </p>
              <div className="flex space-x-4">
                {["Twitter", "Facebook", "Instagram", "LinkedIn"].map(
                  (social) => (
                    <div
                      key={social}
                      className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors cursor-pointer"
                    >
                      <span className="font-semibold">{social.charAt(0)}</span>
                    </div>
                  )
                )}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Discover</h4>
              <ul className="space-y-3">
                {[
                  "Concerts",
                  "Sports",
                  "Arts & Theater",
                  "Food & Drink",
                  "Conferences",
                  "Festivals",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-slate-400 hover:text-white transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Organize</h4>
              <ul className="space-y-3">
                {[
                  "Create Events",
                  "Sell Tickets",
                  "Marketing Tools",
                  "Analytics",
                  "Pricing",
                  "Resources",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-slate-400 hover:text-white transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Support</h4>
              <ul className="space-y-3">
                {[
                  "Help Center",
                  "Contact Us",
                  "FAQ",
                  "Privacy Policy",
                  "Terms of Service",
                  "Refund Policy",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-slate-400 hover:text-white transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">
              © 2024 Tickex. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-slate-400 hover:text-white text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-slate-400 hover:text-white text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-slate-400 hover:text-white text-sm">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
