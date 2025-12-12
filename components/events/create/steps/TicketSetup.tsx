"use client";

import { useState, useCallback } from "react";
import { Plus, Trash2, Ticket, DollarSign, Users, Upload, X, Image as ImageIcon } from "lucide-react";
import { EventFormData } from "../CreateEventWizard";

interface StepProps {
    data: EventFormData;
    update: (data: Partial<EventFormData>) => void;
}

interface TicketType {
    id: number;
    name: string;
    price: number;
    quantity: number;
    description?: string;
    designFile?: File | null;
    designPreview?: string;
}

export function TicketSetup({ data, update }: StepProps) {
    const [tickets, setTickets] = useState<TicketType[]>(data.tickets.length > 0 ? data.tickets : [
        { id: 1, name: "General Admission", price: 0, quantity: 100, description: "" }
    ]);
    const [dragOver, setDragOver] = useState<number | null>(null);

    const addTicket = () => {
        setTickets([...tickets, { id: Date.now(), name: "", price: 0, quantity: 0, description: "" }]);
    };

    const removeTicket = (id: number) => {
        const newTickets = tickets.filter(t => t.id !== id);
        setTickets(newTickets);
        update({ tickets: newTickets });
    };

    const updateTicket = (id: number, field: string, value: any) => {
        const newTickets = tickets.map(t => t.id === id ? { ...t, [field]: value } : t);
        setTickets(newTickets);
        update({ tickets: newTickets });
    };

    const handleDrop = useCallback((e: React.DragEvent, ticketId: number) => {
        e.preventDefault();
        setDragOver(null);

        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            handleFileUpload(file, ticketId);
        }
    }, []);

    const handleFileUpload = (file: File, ticketId: number) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const newTickets = tickets.map(t =>
                t.id === ticketId
                    ? { ...t, designFile: file, designPreview: e.target?.result as string }
                    : t
            );
            setTickets(newTickets);
            update({ tickets: newTickets });
        };
        reader.readAsDataURL(file);
    };

    const removeDesign = (ticketId: number) => {
        const newTickets = tickets.map(t =>
            t.id === ticketId
                ? { ...t, designFile: null, designPreview: undefined }
                : t
        );
        setTickets(newTickets);
        update({ tickets: newTickets });
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-[#0f172a]">Ticketing Setup</h2>
                <p className="text-[#64748b]">Configure your ticket types, pricing, and custom designs.</p>
            </div>

            <div className="space-y-6">
                {tickets.map((ticket, index) => (
                    <div key={ticket.id} className="p-6 bg-white border-2 border-[#e2e8f0] rounded-2xl relative group hover:border-[#1DB954]/30 transition-all">
                        <div className="flex items-start gap-6">
                            <div className="mt-3 bg-gradient-to-br from-[#1DB954] to-[#1ed760] p-3 rounded-xl shadow-lg shadow-green-200">
                                <Ticket className="w-6 h-6 text-white" />
                            </div>

                            <div className="flex-1 space-y-4">
                                {/* Ticket Name & Description */}
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-[#64748b] uppercase tracking-wide">Ticket Name</label>
                                        <input
                                            type="text"
                                            value={ticket.name}
                                            onChange={(e) => updateTicket(ticket.id, "name", e.target.value)}
                                            placeholder="e.g. VIP Pass, Early Bird, General Admission"
                                            className="w-full px-4 py-2.5 rounded-lg border border-[#e2e8f0] text-sm focus:outline-none focus:border-[#1DB954] focus:ring-2 focus:ring-[#1DB954]/20 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-[#64748b] uppercase tracking-wide">Description (Optional)</label>
                                        <textarea
                                            value={ticket.description || ''}
                                            onChange={(e) => updateTicket(ticket.id, "description", e.target.value)}
                                            placeholder="What's included with this ticket?"
                                            rows={2}
                                            className="w-full px-4 py-2.5 rounded-lg border border-[#e2e8f0] text-sm focus:outline-none focus:border-[#1DB954] focus:ring-2 focus:ring-[#1DB954]/20 transition-all resize-none"
                                        />
                                    </div>
                                </div>

                                {/* Price & Quantity */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-[#64748b] uppercase tracking-wide">Price (SZL)</label>
                                        <div className="relative">
                                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" />
                                            <input
                                                type="number"
                                                value={ticket.price}
                                                onChange={(e) => updateTicket(ticket.id, "price", parseFloat(e.target.value) || 0)}
                                                min="0"
                                                step="0.01"
                                                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#e2e8f0] text-sm focus:outline-none focus:border-[#1DB954] focus:ring-2 focus:ring-[#1DB954]/20 transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-[#64748b] uppercase tracking-wide">Quantity Available</label>
                                        <div className="relative">
                                            <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" />
                                            <input
                                                type="number"
                                                value={ticket.quantity}
                                                onChange={(e) => updateTicket(ticket.id, "quantity", parseInt(e.target.value) || 0)}
                                                min="1"
                                                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#e2e8f0] text-sm focus:outline-none focus:border-[#1DB954] focus:ring-2 focus:ring-[#1DB954]/20 transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Ticket Design Upload */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-[#64748b] uppercase tracking-wide">
                                        Custom Ticket Design (150mm × 80mm)
                                    </label>
                                    <p className="text-xs text-[#94a3b8] mb-2">
                                        Upload a custom design. Space will be reserved for barcode generation.
                                    </p>

                                    {ticket.designPreview ? (
                                        <div className="relative group/design">
                                            <div className="relative aspect-[15/8] w-full max-w-md rounded-xl overflow-hidden border-2 border-[#e2e8f0] bg-slate-50">
                                                <img
                                                    src={ticket.designPreview}
                                                    alt="Ticket Design"
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded">
                                                    Barcode space reserved
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => removeDesign(ticket.id)}
                                                className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover/design:opacity-100 transition-opacity hover:bg-red-600"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ) : (
                                        <div
                                            onDrop={(e) => handleDrop(e, ticket.id)}
                                            onDragOver={(e) => { e.preventDefault(); setDragOver(ticket.id); }}
                                            onDragLeave={() => setDragOver(null)}
                                            className={`relative aspect-[15/8] w-full max-w-md rounded-xl border-2 border-dashed transition-all cursor-pointer ${dragOver === ticket.id
                                                    ? 'border-[#1DB954] bg-green-50'
                                                    : 'border-[#e2e8f0] bg-slate-50 hover:border-[#1DB954] hover:bg-green-50/30'
                                                }`}
                                        >
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) handleFileUpload(file, ticket.id);
                                                }}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            />
                                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-[#94a3b8]">
                                                <div className="p-4 bg-white rounded-full border-2 border-[#e2e8f0]">
                                                    <Upload className="w-6 h-6" />
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-sm font-medium text-[#0f172a]">Drop your design here</p>
                                                    <p className="text-xs">or click to browse</p>
                                                </div>
                                                <div className="text-xs text-[#94a3b8]">
                                                    Recommended: 1500 × 800 px (150mm × 80mm at 254 DPI)
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {tickets.length > 1 && (
                                <button
                                    onClick={() => removeTicket(ticket.id)}
                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                    </div>
                ))}

                <button
                    onClick={addTicket}
                    className="w-full py-4 border-2 border-dashed border-[#e2e8f0] rounded-xl text-sm font-semibold text-[#64748b] hover:border-[#1DB954] hover:text-[#1DB954] hover:bg-green-50/30 transition-all flex items-center justify-center gap-2 group"
                >
                    <div className="p-1.5 bg-slate-100 rounded-lg group-hover:bg-[#1DB954]/10 transition-colors">
                        <Plus className="w-4 h-4" />
                    </div>
                    Add Another Ticket Type
                </button>
            </div>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <div className="flex gap-3">
                    <ImageIcon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-900">
                        <p className="font-semibold mb-1">Ticket Design Tips:</p>
                        <ul className="text-xs space-y-1 text-blue-800">
                            <li>• Use high-resolution images (at least 1500×800 pixels)</li>
                            <li>• Leave space on the right side for barcode (approximately 20% of width)</li>
                            <li>• Include your event branding, colors, and key information</li>
                            <li>• Ensure text is readable at small sizes</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
