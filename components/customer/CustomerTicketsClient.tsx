"use client";

import { Calendar, MapPin, QrCode, Ticket as TicketIcon } from "lucide-react";
import DashboardLayout from "@/components/shared/layout/DashboardLayout";

interface TicketProps {
  id: string;
  code: string;
  eventName: string;
  eventDate: string;
  eventLocation: { name: string; address: string } | string;
  ticketType: string;
  status: string;
}

interface Props {
  tickets: TicketProps[];
}

export default function CustomerTicketsClient({ tickets }: Props) {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#0f172a]">My Tickets</h1>
        <p className="text-[#64748b]">View your upcoming events and tickets</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.length > 0 ? (
          tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all"
            >
              <div className="bg-[#1DB954] h-2"></div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-[#1DB954]">
                    <TicketIcon className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold uppercase">
                    {ticket.status}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#0f172a] mb-1">
                  {ticket.eventName}
                </h3>
                <p className="text-sm text-[#1DB954] font-medium mb-4">
                  {ticket.ticketType}
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm text-[#64748b]">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(ticket.eventDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-[#64748b]">
                    <MapPin className="w-4 h-4" />
                    <span>
                      {typeof ticket.eventLocation === "string"
                        ? ticket.eventLocation
                        : ticket.eventLocation.name}
                    </span>
                  </div>
                </div>

                <div className="pt-6 border-t border-dashed border-slate-200 flex flex-col items-center gap-3">
                  <div className="bg-white p-2 rounded-lg border border-slate-100 shadow-sm">
                    <QrCode className="w-24 h-24 text-[#0f172a]" />
                  </div>
                  <p className="text-xs font-mono text-slate-400 tracking-widest">
                    {ticket.code}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TicketIcon className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-[#0f172a] mb-2">
              No tickets yet
            </h3>
            <p className="text-slate-500 mb-6">
              You haven't purchased any tickets yet.
            </p>
            <a
              href="/"
              className="px-6 py-2.5 bg-[#1DB954] hover:bg-[#1ed760] text-white rounded-lg font-medium transition-colors"
            >
              Browse Events
            </a>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
