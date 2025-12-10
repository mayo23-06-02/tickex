"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { TicketSidebar, TicketType } from "@/components/tickets/TicketSidebar";
import { TicketDesigner } from "@/components/tickets/TicketDesigner";
import { TicketDistribution } from "@/components/tickets/TicketDistribution";
import { toast } from "sonner";

// Mock Data
const initialTickets: TicketType[] = [
    {
        id: "1",
        name: "VIP Access",
        price: 500,
        sold: 120,
        total: 200,
        status: "Active",
        color: "#1DB954",
        salesStart: "2025-03-01T09:00",
        salesEnd: "2025-03-31T18:00",
        description: "Full access to all VIP areas giving you the best experience.",
        dynamicPricing: true,
        waitlist: false,
        venue: "Central Stadium",
        eventDate: "2025-03-15",
        eventTime: "19:00"
    },
    {
        id: "2",
        name: "General Admission",
        price: 150,
        sold: 722,
        total: 1000,
        status: "Active",
        color: "#0f172a",
        salesStart: "2025-03-05T09:00",
        salesEnd: "2025-04-10T18:00",
        description: "Standard entry to the festival grounds.",
        dynamicPricing: false,
        waitlist: true
    },
    {
        id: "3",
        name: "Early Bird",
        price: 100,
        sold: 100,
        total: 100,
        status: "Inactive",
        color: "#f59e0b",
        salesStart: "2025-02-01T09:00",
        salesEnd: "2025-02-28T18:00",
        description: "Discounted tickets for early buyers.",
        dynamicPricing: false,
        waitlist: false
    },
];

export default function TicketsPage() {
    const [selectedId, setSelectedId] = useState("1");
    const [tickets, setTickets] = useState<TicketType[]>(initialTickets);
    const [searchQuery, setSearchQuery] = useState("");

    // Details for the currently selected ticket (editing state)
    // In a real app, this might be fetched. Here strictly mocked or derived.
    const [ticketData, setTicketData] = useState<any>({
        name: "VIP Access",
        price: 500,
        total: 200,
        perks: ["Backstage access", "Premium seating", "Meet & greet"],
        status: "Active",
        salesStart: "2025-03-01T09:00",
        salesEnd: "2025-03-31T18:00",
        description: "Full access to all VIP areas giving you the best experience.",
        dynamicPricing: true,
        waitlist: false,
        venue: "Central Stadium",
        eventDate: "2025-03-15",
        eventTime: "19:00"
    });

    const [ticketDesign, setTicketDesign] = useState({
        bgColor: "#1DB954"
    });

    // When selectedId changes, load the data into the editor state
    useEffect(() => {
        const ticket = tickets.find(t => t.id === selectedId);
        if (ticket) {
            setTicketData({
                name: ticket.name,
                price: ticket.price,
                total: ticket.total,
                status: ticket.status,
                perks: ticket.id === "1" ? ["Backstage access", "Premium seating"] : [],
                salesStart: ticket.salesStart || "",
                salesEnd: ticket.salesEnd || "",
                description: ticket.description || "",
                dynamicPricing: ticket.dynamicPricing || false,
                waitlist: ticket.waitlist || false,
                venue: ticket.venue || "Central Stadium",
                eventDate: ticket.eventDate || "2025-03-15",
                eventTime: ticket.eventTime || "19:00"
            });
            setTicketDesign({
                bgColor: ticket.color || "#1DB954"
            });
        }
    }, [selectedId, tickets]);

    const handleSelectTicket = (id: string) => {
        setSelectedId(id);
    };

    const handleCreateTicket = () => {
        const newTicket: TicketType = {
            id: Date.now().toString(),
            name: "New Ticket",
            price: 0,
            sold: 0,
            total: 100,
            status: "Inactive",
            color: "#64748b"
        };
        setTickets([...tickets, newTicket]);
        setSelectedId(newTicket.id);
    };

    const handleDeleteTicket = (id: string) => {
        const newTickets = tickets.filter(t => t.id !== id);
        setTickets(newTickets);
        if (newTickets.length > 0 && selectedId === id) {
            setSelectedId(newTickets[0].id);
        } else if (newTickets.length === 0) {
            // Handle empty state if needed
            setSelectedId("");
        }
    };

    const handleSaveTicket = () => {
        setTickets(prev => prev.map(t => {
            if (t.id === selectedId) {
                return {
                    ...t,
                    name: ticketData.name,
                    price: ticketData.price,
                    total: ticketData.total,
                    status: ticketData.status || t.status,
                    color: ticketDesign.bgColor,
                    salesStart: ticketData.salesStart,
                    salesEnd: ticketData.salesEnd,
                    description: ticketData.description,
                    dynamicPricing: ticketData.dynamicPricing,
                    waitlist: ticketData.waitlist,
                    venue: ticketData.venue,
                    eventDate: ticketData.eventDate,
                    eventTime: ticketData.eventTime
                };
            }
            return t;
        }));
        toast.success("Ticket updated successfully");
    };

    const handleCancelTicket = () => {
        const ticket = tickets.find(t => t.id === selectedId);
        if (ticket) {
            setTicketData({
                name: ticket.name,
                price: ticket.price,
                total: ticket.total,
                status: ticket.status,
                perks: ticket.id === "1" ? ["Backstage access", "Premium seating"] : [],
                salesStart: ticket.salesStart || "",
                salesEnd: ticket.salesEnd || "",
                description: ticket.description || "",
                dynamicPricing: ticket.dynamicPricing || false,
                waitlist: ticket.waitlist || false,
                venue: ticket.venue || "Central Stadium",
                eventDate: ticket.eventDate || "2025-03-15",
                eventTime: ticket.eventTime || "19:00"
            });
            setTicketDesign({
                bgColor: ticket.color || "#1DB954"
            });
            toast.info("Changes reverted");
        }
    };

    const updateTicketData = (updates: any) => {
        setTicketData((prev: any) => ({ ...prev, ...updates }));
    };

    const updateTicketDesign = (updates: any) => {
        setTicketDesign((prev: any) => ({ ...prev, ...updates }));
    };

    const filteredTickets = tickets.filter(t =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <DashboardLayout>
            <div className="flex flex-col xl:flex-row gap-8 h-[calc(100vh-140px)]">
                {/* Left Sidebar */}
                <TicketSidebar
                    tickets={filteredTickets}
                    selectedId={selectedId}
                    onSelect={handleSelectTicket}
                    onCreate={handleCreateTicket}
                    onDelete={handleDeleteTicket}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />

                {/* Main Content */}
                <div className="flex-1 flex gap-8 overflow-hidden h-full">
                    {selectedId ? (
                        <div className="flex-1 overflow-y-auto pr-2">
                            <TicketDesigner
                                data={ticketData}
                                design={ticketDesign}
                                updateData={updateTicketData}
                                updateDesign={updateTicketDesign}
                                onSave={handleSaveTicket}
                                onCancel={handleCancelTicket}
                            />
                        </div>
                    ) : (
                        <div className="flex-1 flex items-center justify-center text-slate-400">
                            Select or create a ticket to edit
                        </div>
                    )}

                    {/* Right Sidebar */}
                    <div className="overflow-y-auto pl-2">
                        <TicketDistribution />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
