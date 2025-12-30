"use client";

import { useState } from "react";
import DashboardLayout from "@/components/shared/layout/DashboardLayout";
import {
  Calendar,
  MapPin,
  DollarSign,
  Users,
  Ticket,
  Edit,
  ExternalLink,
  ArrowLeft,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function OrganizerEventDetailsClient({ event }: { event: any }) {
  const router = useRouter();

  return (
    <DashboardLayout>
      <div className="mb-6">
        <button
          onClick={() => router.push("/dashboard/events")}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Events
        </button>

        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              {event.name}
            </h1>
            <div className="flex flex-wrap gap-4 text-slate-500 text-sm">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />{" "}
                {new Date(event.date).toLocaleDateString()}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />{" "}
                {typeof event.location === "string"
                  ? event.location
                  : event.location?.name || "TBD"}
              </span>
            </div>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <button
              onClick={() => window.open(`/events/${event.id}`, "_blank")}
              className="flex-1 md:flex-none justify-center px-4 py-2 border border-slate-300 rounded-lg flex items-center gap-2 hover:bg-slate-50"
            >
              <ExternalLink className="w-4 h-4" /> Public Page
            </button>
            <button
              onClick={() => router.push(`/dashboard/events/edit/${event.id}`)}
              className="flex-1 md:flex-none justify-center px-4 py-2 bg-slate-900 text-white rounded-lg flex items-center gap-2 hover:bg-slate-800"
            >
              <Edit className="w-4 h-4" /> Edit Event
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-slate-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-slate-500 font-medium text-sm">
              Total Revenue
            </h3>
            <DollarSign className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-slate-900">
            SZL {event.revenue.toLocaleString()}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-slate-500 font-medium text-sm">Tickets Sold</h3>
            <Ticket className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-slate-900">
            {event.ticketsSold} / {event.ticketsTotal}
          </p>
          <div className="h-2 bg-slate-100 rounded-full mt-4 overflow-hidden">
            <div
              style={{
                width:
                  event.ticketsTotal > 0
                    ? `${(event.ticketsSold / event.ticketsTotal) * 100}%`
                    : "0%",
              }}
              className="h-full bg-blue-600 rounded-full"
            />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-slate-500 font-medium text-sm">Status</h3>
            <span
              className={`px-2 py-1 rounded-full text-xs font-bold ${
                event.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-slate-100 text-slate-700"
              }`}
            >
              {event.status}
            </span>
          </div>
          <p className="text-sm text-slate-500">
            {event.status === "Active"
              ? "Event is live and selling tickets."
              : "Event is not currently active."}
          </p>
        </div>
      </div>

      {/* Description / Details */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 mb-8">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Description</h2>
        <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
          {event.description || "No description provided."}
        </p>
      </div>

      {/* Quick Actions / Integration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          onClick={() => router.push("/dashboard/tickets")}
          className="bg-white p-6 rounded-xl border border-slate-200 hover:shadow-md transition-shadow cursor-pointer group"
        >
          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 bg-purple-50 rounded-lg group-hover:bg-purple-100 transition-colors">
              <Ticket className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Manage Tickets</h3>
              <p className="text-sm text-slate-500">
                Configure ticket types, prices and quotas
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 hover:shadow-md transition-shadow cursor-pointer group">
          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 bg-orange-50 rounded-lg group-hover:bg-orange-100 transition-colors">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Guest List</h3>
              <p className="text-sm text-slate-500">
                View and manage attendees
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
