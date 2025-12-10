"use client";

import { useState } from "react";
import { Plus, Trash2, Ticket, DollarSign, Users } from "lucide-react";
import { EventFormData } from "../CreateEventWizard";

interface StepProps {
    data: EventFormData;
    update: (data: Partial<EventFormData>) => void;
}

export function TicketSetup({ data, update }: StepProps) {
    const [tickets, setTickets] = useState(data.tickets.length > 0 ? data.tickets : [
        { id: 1, name: "General Admission", price: 0, capacity: 100 }
    ]);

    const addTicket = () => {
        setTickets([...tickets, { id: Date.now(), name: "", price: 0, capacity: 0 }]);
    };

    const removeTicket = (id: number) => {
        setTickets(tickets.filter(t => t.id !== id));
        update({ tickets: tickets.filter(t => t.id !== id) });
    };

    const updateTicket = (id: number, field: string, value: any) => {
        const newTickets = tickets.map(t => t.id === id ? { ...t, [field]: value } : t);
        setTickets(newTickets);
        update({ tickets: newTickets });
    };

    return (
        <div className="space-y-6 max-w-3xl mx-auto">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-[#0f172a]">Ticketing Setup</h2>
                <p className="text-[#64748b]">Configure your ticket types and pricing.</p>
            </div>

            <div className="space-y-4">
                {tickets.map((ticket, index) => (
                    <div key={ticket.id} className="p-4 bg-slate-50 border border-[#e2e8f0] rounded-xl relative group">
                        <div className="flex items-start gap-4">
                            <div className="mt-3 bg-white p-2 rounded-lg border border-[#e2e8f0]">
                                <Ticket className="w-5 h-5 text-[#1DB954]" />
                            </div>

                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1.5 md:col-span-2">
                                    <label className="text-xs font-semibold text-[#64748b] uppercase">Ticket Name</label>
                                    <input
                                        type="text"
                                        value={ticket.name}
                                        onChange={(e) => updateTicket(ticket.id, "name", e.target.value)}
                                        placeholder="e.g. VIP Pass"
                                        className="w-full px-3 py-2 rounded-lg border border-[#e2e8f0] text-sm focus:outline-none focus:border-[#1DB954]"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-[#64748b] uppercase">Price (SZL)</label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#94a3b8]" />
                                        <input
                                            type="number"
                                            value={ticket.price}
                                            onChange={(e) => updateTicket(ticket.id, "price", parseFloat(e.target.value))}
                                            className="w-full pl-8 pr-3 py-2 rounded-lg border border-[#e2e8f0] text-sm focus:outline-none focus:border-[#1DB954]"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-[#64748b] uppercase">Capacity</label>
                                    <div className="relative">
                                        <Users className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#94a3b8]" />
                                        <input
                                            type="number"
                                            value={ticket.capacity}
                                            onChange={(e) => updateTicket(ticket.id, "capacity", parseInt(e.target.value))}
                                            className="w-full pl-8 pr-3 py-2 rounded-lg border border-[#e2e8f0] text-sm focus:outline-none focus:border-[#1DB954]"
                                        />
                                    </div>
                                </div>
                            </div>

                            {tickets.length > 1 && (
                                <button
                                    onClick={() => removeTicket(ticket.id)}
                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    </div>
                ))}

                <button
                    onClick={addTicket}
                    className="w-full py-3 border-2 border-dashed border-[#e2e8f0] rounded-xl text-sm font-medium text-[#64748b] hover:border-[#1DB954] hover:text-[#1DB954] hover:bg-green-50/30 transition-all flex items-center justify-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Add Ticket Type
                </button>
            </div>
        </div>
    );
}
