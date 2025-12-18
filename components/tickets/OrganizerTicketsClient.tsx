"use client";

import { useState, useRef, useEffect } from "react";
import {
    Plus, Search, Download, Upload, Copy, Trash2, Calendar, Clock,
    MapPin, ChevronDown, Check, User, Shield, CreditCard, Printer,
    Smartphone, RefreshCw, X, Ticket, Layout, Lock, Palette, MoreVertical
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { upsertTicketType } from "@/app/actions/tickets";

// --- Types ---

interface EventData {
    id: string;
    title: string;
    date: string;
    location: string;
}

interface TicketData {
    designFile?: File | null;
    id: string;
    eventId: string;
    eventTitle: string;
    eventDate: string;
    eventLocation: string;
    ticketType: string; // The Name
    quantity: number;
    quantitySold: number;
    price: number;
    description: string;
    status: 'active' | 'used' | 'expired';
    qrCode: string;
    designUrl?: string;
    // Advanced
    perks: string[];
    accessRules: {
        gates: string;
        entryStartTime: string;
        entryEndTime: string;
        ageRestricted: boolean;
        idRequired: boolean;
        transferable: boolean;
        transferLimit?: number;
    };
    designConfig: {
        backgroundColor: string;
        textColor: string;
        accentColor?: string;
        qrStyle: 'square' | 'rounded' | 'dots';
        showLogo: boolean;
    };
    transferSettings: {
        allowTransfer: boolean;
        requireApproval: boolean;
        chargeFee: boolean;
        feeAmount: number;
    };
}

interface OrganizerTicketsClientProps {
    tickets?: TicketData[];
    events?: EventData[];
}

// --- Component ---

export default function OrganizerTicketsClient({ tickets = [], events = [] }: OrganizerTicketsClientProps) {
    // -- State --
    const [activeEventId, setActiveEventId] = useState<string>(events[0]?.id || '');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTicketId, setSelectedTicketId] = useState<string | null>(tickets.length > 0 ? tickets[0].id : 'new');
    const [activeTab, setActiveTab] = useState<'basic' | 'perks' | 'access' | 'design'>('basic');
    const [isSaving, setIsSaving] = useState(false);

    // Derived State
    const filteredTickets = tickets.filter(t =>
        (activeEventId ? t.eventId === activeEventId : true) &&
        t.ticketType.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // -- Form State Handling --
    const [formData, setFormData] = useState<TicketData | null>(null);

    // Ensure activeEventId defaults to first event if not set
    useEffect(() => {
        if (!activeEventId && events.length > 0) {
            setActiveEventId(events[0].id);
        }
    }, [events, activeEventId]);

    // Initialize/Update Form Data
    useEffect(() => {
        const currentEvent = events.find(e => e.id === activeEventId);

        if (selectedTicketId === 'new') {
            // Initialize new ticket template
            setFormData({
                id: 'new',
                eventId: activeEventId,
                eventTitle: currentEvent?.title || 'New Event',
                eventDate: currentEvent?.date || new Date().toISOString(),
                eventLocation: currentEvent?.location || 'TBD',
                ticketType: 'New Ticket',
                quantity: 100,
                quantitySold: 0,
                price: 0,
                description: '',
                status: 'active',
                qrCode: 'PREVIEW',
                designFile: null,
                perks: [],
                accessRules: {
                    gates: 'All Gates',
                    entryStartTime: '18:00',
                    entryEndTime: '23:00',
                    ageRestricted: false,
                    idRequired: false,
                    transferable: true,
                    transferLimit: 5
                },
                designConfig: {
                    backgroundColor: '#1DB954',
                    textColor: '#FFFFFF',
                    qrStyle: 'square',
                    showLogo: true
                },
                transferSettings: {
                    allowTransfer: true,
                    requireApproval: false,
                    chargeFee: false,
                    feeAmount: 0
                }
            });
        } else if (selectedTicketId) {
            const ticket = tickets.find(t => t.id === selectedTicketId);
            if (ticket) {
                setFormData(JSON.parse(JSON.stringify(ticket)));
            }
        }
    }, [selectedTicketId, activeEventId, events, tickets]);

    const updateForm = (field: string, value: any) => {
        if (!formData) return;
        setFormData(prev => prev ? { ...prev, [field]: value } : null);
    };

    const updateNestedForm = (parent: string, field: string, value: any) => {
        if (!formData) return;
        setFormData((prev: any) => prev ? {
            ...prev,
            [parent]: {
                ...prev[parent],
                [field]: value
            }
        } : null);
    };

    // -- Handlers --

    const handleCreate = () => {
        setSelectedTicketId('new');
        setActiveTab('basic');
    };

    const handleSave = async () => {
        if (!formData) return;

        // Validation
        if (!formData.ticketType.trim()) {
            toast.error("Ticket name is required");
            return;
        }
        if (!formData.eventId) {
            toast.error("Event must be selected");
            return;
        }
        if (formData.price < 0) {
            toast.error("Price cannot be negative");
            return;
        }

        setIsSaving(true);
        try {
            const data = new FormData();
            data.append("id", formData.id);
            data.append("eventId", formData.eventId);
            data.append("ticketType", formData.ticketType);
            data.append("quantity", formData.quantity.toString());
            data.append("price", formData.price.toString());
            data.append("description", formData.description || "");
            
            if (formData.designUrl) data.append("ticketDesignUrl", formData.designUrl);
            if (formData.designFile) data.append("designFile", formData.designFile);

            // Append JSON fields
            data.append("perks", JSON.stringify(formData.perks));
            data.append("accessRules", JSON.stringify(formData.accessRules));
            data.append("designConfig", JSON.stringify(formData.designConfig));
            data.append("transferSettings", JSON.stringify(formData.transferSettings));

            const result = await upsertTicketType(data);

            if (result.error) {
                toast.error(result.error);
            } else {
                toast.success(formData.id === 'new' ? 'Ticket created successfully!' : 'Ticket updated successfully!');
                if (result.id) {
                    setSelectedTicketId(result.id);
                }
            }
        } catch (error) {
            console.error("Save error:", error);
            toast.error("An unexpected error occurred");
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancel = () => {
        if (selectedTicketId === 'new') {
            // Go back to first ticket if available, else stay on 'new' but reset? 
            // Better to just try and select the first available ticket
            const firstTicket = tickets[0];
            setSelectedTicketId(firstTicket ? firstTicket.id : 'new');
        } else {
            // Reset form to current ticket data from props
            const ticket = tickets.find(t => t.id === selectedTicketId);
            if (ticket) {
                setFormData(JSON.parse(JSON.stringify(ticket)));
            }
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            toast.success("Logo uploaded successfully (simulated)");
        }
    };

    const handleAddPerk = () => {
        if (!formData) return;
        const currentPerks = formData.perks || [];
        updateForm('perks', [...currentPerks, "New Perk"]);
    };

    const updatePerk = (index: number, value: string) => {
        if (!formData) return;
        const newPerks = [...formData.perks];
        newPerks[index] = value;
        updateForm('perks', newPerks);
    };

    const removePerk = (index: number) => {
        if (!formData) return;
        const newPerks = formData.perks.filter((_, i) => i !== index);
        updateForm('perks', newPerks);
    };

    if (!selectedTicketId && tickets.length === 0) {
        return (
            <DashboardLayout>
                <div className="flex flex-col items-center justify-center h-[80vh] text-center">
                    <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
                        <Ticket className="w-10 h-10 text-muted-foreground" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">No Tickets Found</h2>
                    <p className="text-muted-foreground mb-6 max-w-md">
                        Get started by creating your first event and adding ticket types.
                    </p>
                    <a href="/events/create" className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90">
                        Create Event
                    </a>
                </div>
            </DashboardLayout>
        )
    }

    return (
        <DashboardLayout>
            {/* Top Bar for Event Selection */}
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-border">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <select
                            value={activeEventId}
                            onChange={(e) => setActiveEventId(e.target.value)}
                            className="appearance-none bg-card border border-border text-foreground px-4 py-2 pr-10 rounded-lg font-medium min-w-[200px] focus:outline-none focus:ring-2 focus:ring-primary/20"
                        >
                            {events.map(e => (
                                <option key={e.id} value={e.id}>{e.title}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                    </div>
                    <span className="text-sm text-muted-foreground">
                        {events.find(e => e.id === activeEventId)?.date ? new Date(events.find(e => e.id === activeEventId)!.date).toLocaleDateString() : ''} • {events.find(e => e.id === activeEventId)?.location}
                    </span>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex flex-col items-end">
                        <span className="text-xs text-muted-foreground">Total Revenue</span>
                        <span className="font-bold text-success">SZL {tickets.filter(t => t.eventId === activeEventId).reduce((acc, t) => acc + (t.price * t.quantitySold), 0).toLocaleString()}</span>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-xs text-muted-foreground">Tickets Sold</span>
                        <span className="font-bold text-foreground">{tickets.filter(t => t.eventId === activeEventId).reduce((acc, t) => acc + t.quantitySold, 0)} / {tickets.filter(t => t.eventId === activeEventId).reduce((acc, t) => acc + t.quantity, 0)}</span>
                    </div>
                    <div className="h-8 w-px bg-border mx-2"></div>
                    <button className="p-2 text-muted-foreground hover:bg-muted rounded-full">
                        <Search className="w-5 h-5" />
                    </button>
                    <button
                        onClick={handleCreate}
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" /> Create
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-6 h-[calc(100vh-180px)]">

                {/* --- LEFT COLUMN: Ticket List --- */}
                <div className="col-span-3 flex flex-col gap-4 overflow-hidden h-full">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-foreground">Ticket Types</h3>
                        <button className="p-1.5 bg-primary text-primary-foreground rounded-md hover:opacity-90">
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="relative mb-2">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search ticket types..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-card border border-border rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                        {filteredTickets.map(ticket => (
                            <div
                                key={ticket.id}
                                onClick={() => setSelectedTicketId(ticket.id)}
                                className={`p-4 rounded-xl border cursor-pointer transition-all ${selectedTicketId === ticket.id
                                    ? 'bg-card border-primary shadow-sm ring-1 ring-primary'
                                    : 'bg-card border-border hover:border-primary/50'
                                    }`}
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${ticket.status === 'active' ? 'bg-success' : 'bg-muted-foreground'}`} />
                                        <span className="font-semibold text-foreground">{ticket.ticketType}</span>
                                    </div>
                                    <MoreVertical className="w-4 h-4 text-muted-foreground" />
                                </div>

                                <div className="text-sm text-muted-foreground mb-3">
                                    SZL {ticket.price}
                                </div>

                                <div className="space-y-1">
                                    <div className="flex justify-between text-xs text-muted-foreground">
                                        <span>{ticket.quantitySold}/{ticket.quantity} sold</span>
                                        <span className={ticket.status === 'active' ? 'text-success' : 'text-muted-foreground'}>
                                            {ticket.status === 'active' ? 'Active' : 'Inactive'}
                                        </span>
                                    </div>
                                    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-primary rounded-full"
                                            style={{ width: `${(ticket.quantitySold / ticket.quantity) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="pt-4 border-t border-border mt-4">
                            <h4 className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Quick Templates</h4>
                            <div className="space-y-2">
                                {['VIP Template', 'Early Bird', 'Group Ticket', 'Student Discount'].map((t, i) => (
                                    <button key={i} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground w-full p-2 hover:bg-muted rounded-lg transition-colors">
                                        <div className={`w-3 h-3 rounded-full ${['bg-yellow-400', 'bg-red-400', 'bg-purple-400', 'bg-blue-400'][i]}`} />
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- MIDDLE COLUMN: Editor --- */}
                <div className="col-span-6 flex flex-col h-full bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                    {formData ? (
                        <>
                            <div className="p-6 border-b border-border bg-muted/30">
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h2 className="text-xl font-bold text-foreground">Ticket Designer</h2>
                                        <p className="text-sm text-muted-foreground">Customize {formData.ticketType}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="px-3 py-1.5 text-xs font-medium bg-muted hover:bg-muted/80 text-foreground rounded border border-border flex items-center gap-1">
                                            Desktop
                                        </button>
                                        <button className="px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground rounded border border-transparent hover:bg-muted flex items-center gap-1">
                                            Mobile
                                        </button>
                                    </div>
                                </div>

                                {/* LIVE PREVIEW AREA */}
                                <div className="flex justify-center mb-6">
                                    <motion.div
                                        layout
                                        className="relative w-full max-w-md aspect-[1.8/1] rounded-2xl overflow-hidden shadow-xl text-white flex flex-col"
                                        style={{ backgroundColor: formData.designConfig?.backgroundColor || '#1DB954' }}
                                    >
                                        <div className="absolute top-4 right-4 bg-white p-1 rounded-md">
                                            <div className="w-8 h-8 bg-black/10 rounded-sm" /> {/* QR Placeholder */}
                                        </div>

                                        <div className="p-6 flex-1 flex flex-col justify-between z-10">
                                            <div>
                                                <p className="text-xs font-medium opacity-80 uppercase tracking-wide mb-1 opacity-90">{formData.eventTitle}</p>
                                                <h3 className="text-2xl font-black mb-4" style={{ color: formData.designConfig?.textColor || '#fff' }}>
                                                    {formData.ticketType}
                                                </h3>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4 text-sm">
                                                <div>
                                                    <p className="opacity-70 text-xs mb-0.5">Date</p>
                                                    <p className="font-semibold">{new Date(formData.eventDate).toLocaleDateString()}</p>
                                                </div>
                                                <div>
                                                    <p className="opacity-70 text-xs mb-0.5">Time</p>
                                                    <p className="font-semibold">{new Date(formData.eventDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                                </div>
                                                <div>
                                                    <p className="opacity-70 text-xs mb-0.5">Venue</p>
                                                    <p className="font-semibold truncate">{formData.eventLocation}</p>
                                                </div>
                                                <div>
                                                    <p className="opacity-70 text-xs mb-0.5">Price</p>
                                                    <p className="font-semibold">SZL {formData.price}</p>
                                                </div>
                                            </div>

                                            <div className="mt-4 pt-4 border-t border-white/20 flex justify-between items-end">
                                                <div>
                                                    <p className="opacity-70 text-[10px] mb-0.5">Ticket ID</p>
                                                    <p className="font-mono text-xs">TKX-{new Date().getFullYear()}-1234</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Background Elements/Pattern Overlay could go here */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent pointer-events-none" />
                                    </motion.div>
                                </div>

                                <div className="flex justify-center">
                                    <button className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors">
                                        <Download className="w-3 h-3" /> Download Mockup
                                    </button>
                                </div>
                            </div>

                            {/* Editor Tabs */}
                            <div className="flex border-b border-border">
                                {['basic', 'perks', 'access', 'design'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab as any)}
                                        className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === tab
                                            ? 'border-primary text-primary'
                                            : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
                                            }`}
                                    >
                                        {tab === 'basic' ? 'Basic Info' :
                                            tab === 'perks' ? 'Perks & Benefits' :
                                                tab === 'access' ? 'Access Rules' : 'Design'}
                                    </button>
                                ))}
                            </div>

                            {/* Editor Content Scrollable */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                                {activeTab === 'basic' && (
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-foreground">Ticket Name</label>
                                            <input
                                                type="text"
                                                value={formData.ticketType}
                                                onChange={(e) => updateForm('ticketType', e.target.value)}
                                                className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-foreground">Price (SZL)</label>
                                                <input
                                                    type="number"
                                                    value={formData.price}
                                                    onChange={(e) => updateForm('price', e.target.value === '' ? 0 : parseInt(e.target.value))}
                                                    className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-foreground">Quantity</label>
                                                <input
                                                    type="number"
                                                    value={formData.quantity}
                                                    onChange={(e) => updateForm('quantity', e.target.value === '' ? 0 : parseInt(e.target.value))}
                                                    className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex gap-6">
                                            <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                                                <input type="checkbox" className="rounded border-border text-primary focus:ring-primary/20" />
                                                Enable dynamic pricing
                                            </label>
                                            <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                                                <input type="checkbox" className="rounded border-border text-primary focus:ring-primary/20" />
                                                Enable waitlist
                                            </label>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-foreground">Description</label>
                                            <textarea
                                                value={formData.description || ''}
                                                onChange={(e) => updateForm('description', e.target.value)}
                                                rows={3}
                                                className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-foreground">Sales Start</label>
                                                <input type="datetime-local" className="w-full bg-background border border-border rounded-lg px-4 py-2 text-muted-foreground" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-foreground">Sales End</label>
                                                <input type="datetime-local" className="w-full bg-background border border-border rounded-lg px-4 py-2 text-muted-foreground" />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'perks' && (
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-sm font-medium text-foreground">Included Perks</h4>
                                            <button
                                                onClick={handleAddPerk}
                                                className="text-xs font-semibold text-primary hover:text-primary/80 flex items-center gap-1"
                                            >
                                                <Plus className="w-3 h-3" /> Add Perk
                                            </button>
                                        </div>

                                        <div className="space-y-3">
                                            {formData.perks?.length > 0 ? (
                                                formData.perks.map((perk, idx) => (
                                                    <div key={idx} className="flex gap-2">
                                                        <input
                                                            type="text"
                                                            value={perk}
                                                            onChange={(e) => updatePerk(idx, e.target.value)}
                                                            className="flex-1 bg-background border border-border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary/20"
                                                        />
                                                        <button
                                                            onClick={() => removePerk(idx)}
                                                            className="p-2 text-error hover:bg-error/10 rounded-lg transition-colors"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-sm text-muted-foreground italic">No perks added yet.</p>
                                            )}
                                        </div>

                                        <div className="pt-6 border-t border-border">
                                            <h4 className="text-sm font-medium text-foreground mb-4">VIP Package Builder</h4>
                                            <div className="grid grid-cols-2 gap-3">
                                                {['Fast Lane Access', 'Free Drink', 'Meet & Greet', 'Merch Bundle', 'Photo Booth', 'Lounge Access'].map(p => (
                                                    <label key={p} className="flex items-center gap-2 p-3 bg-muted/30 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                                                        <input type="checkbox" className="rounded border-border text-primary focus:ring-primary/20" />
                                                        <span className="text-sm text-foreground">{p}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'access' && (
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-foreground">Valid Entry Gates</label>
                                            <select
                                                value={formData.accessRules?.gates || 'All Gates'}
                                                onChange={(e) => updateNestedForm('accessRules', 'gates', e.target.value)}
                                                className="w-full bg-background border border-border rounded-lg px-4 py-2"
                                            >
                                                <option>All Gates</option>
                                                <option>VIP Gate A</option>
                                                <option>Main Entrance</option>
                                                <option>North Gate</option>
                                            </select>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-foreground">Entry Start Time</label>
                                                <input
                                                    type="time"
                                                    value={formData.accessRules?.entryStartTime || '18:00'}
                                                    onChange={(e) => updateNestedForm('accessRules', 'entryStartTime', e.target.value)}
                                                    className="w-full bg-background border border-border rounded-lg px-4 py-2"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-foreground">Entry End Time</label>
                                                <input
                                                    type="time"
                                                    value={formData.accessRules?.entryEndTime || '23:00'}
                                                    onChange={(e) => updateNestedForm('accessRules', 'entryEndTime', e.target.value)}
                                                    className="w-full bg-background border border-border rounded-lg px-4 py-2"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-4 pt-4 border-t border-border">
                                            <label className="flex items-center gap-3 text-sm text-foreground cursor-pointer">
                                                <input type="checkbox" className="rounded border-border text-primary w-4 h-4" />
                                                Age verification required
                                            </label>
                                            <label className="flex items-center gap-3 text-sm text-foreground cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.accessRules?.idRequired || false}
                                                    onChange={(e) => updateNestedForm('accessRules', 'idRequired', e.target.checked)}
                                                    className="rounded border-border text-primary w-4 h-4"
                                                />
                                                ID verification required
                                            </label>
                                            <label className="flex items-center gap-3 text-sm text-foreground cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.accessRules?.transferable || true}
                                                    onChange={(e) => updateNestedForm('accessRules', 'transferable', e.target.checked)}
                                                    className="rounded border-border text-primary w-4 h-4"
                                                />
                                                Ticket is transferable
                                            </label>

                                            <div className="bg-muted/30 p-4 rounded-lg border border-border">
                                                <label className="text-sm font-medium text-foreground block mb-2">Transfer Limit</label>
                                                <input type="number" defaultValue="3" className="w-full bg-background border border-border rounded-lg px-3 py-2" />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'design' && (
                                    <div className="space-y-6">
                                        <div className="space-y-3">
                                            <label className="text-sm font-medium text-foreground">Background Color</label>
                                            <div className="flex gap-3">
                                                <input
                                                    type="color"
                                                    value={formData.designConfig?.backgroundColor || '#1DB954'}
                                                    onChange={(e) => updateNestedForm('designConfig', 'backgroundColor', e.target.value)}
                                                    className="w-12 h-12 rounded cursor-pointer border-0 p-0"
                                                />
                                                <input
                                                    type="text"
                                                    value={formData.designConfig?.backgroundColor || '#1DB954'}
                                                    onChange={(e) => updateNestedForm('designConfig', 'backgroundColor', e.target.value)}
                                                    className="flex-1 bg-background border border-border rounded-lg px-4 py-2 uppercase font-mono"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <label className="text-sm font-medium text-foreground">Accent Color</label>
                                            <div className="flex gap-3">
                                                {['#1DB954', '#0f172a', '#475569', '#94a3b8', '#f59e0b', '#ef4444'].map(c => (
                                                    <button
                                                        key={c}
                                                        onClick={() => updateNestedForm('designConfig', 'textColor', c === '#1DB954' || c === '#f59e0b' || c === '#ef4444' ? '#FFFFFF' : '#000000')}
                                                        className="w-8 h-8 rounded-lg border border-border shadow-sm hover:scale-110 transition-transform"
                                                        style={{ backgroundColor: c }}
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <label className="text-sm font-medium text-foreground">Logo</label>
                                            <div className="border-2 border-dashed border-primary/30 bg-primary/5 rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-primary/10 transition-colors relative">
                                                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileUpload} />
                                                <Upload className="w-8 h-8 text-primary mb-3" />
                                                <p className="text-sm font-medium text-primary">Upload logo or drag & drop</p>
                                                <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 2MB</p>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <label className="text-sm font-medium text-foreground">QR Code Style</label>
                                            <div className="grid grid-cols-3 gap-4">
                                                {['Square', 'Rounded', 'Dots'].map(s => (
                                                    <button
                                                        key={s}
                                                        className={`p-4 border rounded-xl flex flex-col items-center gap-2 hover:bg-muted/50 ${(formData.designConfig?.qrStyle || 'square') === s.toLowerCase()
                                                            ? 'border-primary bg-primary/5 text-primary'
                                                            : 'border-border text-muted-foreground'
                                                            }`}
                                                        onClick={() => updateNestedForm('designConfig', 'qrStyle', s.toLowerCase())}
                                                    >
                                                        <div className={`w-12 h-12 bg-gray-200 ${s === 'Rounded' ? 'rounded-lg' : s === 'Dots' ? 'rounded-full' : 'rounded-none'}`} />
                                                        <span className="text-xs font-medium">{s}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Editor Footer Actions */}
                            <div className="p-6 border-t border-border bg-background flex justify-between items-center">
                                <button onClick={handleSave} className="px-6 py-2.5 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity">
                                    Save & Publish
                                </button>
                                <div className="flex gap-3">
                                    <button className="px-4 py-2.5 bg-card border border-border text-foreground font-medium rounded-lg hover:bg-muted transition-colors">
                                        Save Draft
                                    </button>
                                    <button
                                        onClick={handleCancel}
                                        className="px-4 py-2.5 text-muted-foreground font-medium hover:text-foreground transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center p-8">
                            <Ticket className="w-16 h-16 text-muted-foreground mb-4 opacity-50" />
                            <h3 className="text-lg font-semibold text-foreground">Select a ticket to customize</h3>
                            <p className="text-muted-foreground max-w-sm mt-1">Choose a ticket type from the left sidebar to start editing its design and settings.</p>
                        </div>
                    )}
                </div>

                {/* --- RIGHT COLUMN: Settings --- */}
                <div className="col-span-3 flex flex-col gap-6 overflow-y-auto pr-2 pb-6">
                    {/* Assignment */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-bold text-foreground uppercase tracking-wide">Assignment & Distribution</h4>

                        <div className="space-y-3">
                            <label className="text-xs font-medium text-muted-foreground">Assign to Customer</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <input type="text" placeholder="Search customer by email..." className="w-full bg-card border border-border rounded-lg pl-9 pr-4 py-2 text-sm" />
                            </div>
                            <button className="w-full py-2 bg-primary text-primary-foreground font-medium rounded-lg hover:opacity-90">
                                Assign Ticket
                            </button>
                        </div>

                        <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:bg-muted/20 transition-colors">
                            <Upload className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                            <p className="text-xs font-medium text-foreground">Upload CSV file</p>
                            <p className="text-[10px] text-muted-foreground">Max 1000 records</p>
                        </div>
                        <a href="#" className="text-xs text-primary hover:underline text-center block">Download CSV Template</a>
                    </div>

                    <div className="h-px bg-border w-full" />

                    {/* Discount Codes */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h4 className="text-sm font-bold text-foreground">Discount Codes</h4>
                            <button className="text-xs font-medium text-primary hover:underline">+ Create</button>
                        </div>

                        <div className="bg-card border border-border rounded-lg p-3 flex justify-between items-center">
                            <div>
                                <div className="text-sm font-bold text-foreground flex items-center gap-1">
                                    EARLYBIRD <Copy className="w-3 h-3 text-muted-foreground cursor-pointer" />
                                </div>
                                <div className="text-xs text-muted-foreground">Used 45 times • Expires Mar 1</div>
                            </div>
                            <span className="text-xs font-bold text-success bg-success/10 px-2 py-1 rounded">20% OFF</span>
                        </div>
                    </div>

                    <div className="h-px bg-border w-full" />

                    {/* Transfer Settings */}
                    <div className="space-y-3">
                        <h4 className="text-sm font-bold text-foreground">Transfer Settings</h4>
                        <label className="flex items-center gap-2 text-sm text-muted-foreground">
                            <input type="checkbox" defaultChecked className="rounded border-border text-primary" />
                            Allow ticket transfers
                        </label>
                        <label className="flex items-center gap-2 text-sm text-muted-foreground">
                            <input type="checkbox" className="rounded border-border text-primary" />
                            Require approval for transfers
                        </label>
                        <label className="flex items-center gap-2 text-sm text-muted-foreground">
                            <input type="checkbox" defaultChecked className="rounded border-border text-primary" />
                            Charge transfer fee
                        </label>
                        <input type="number" defaultValue="5" className="w-full bg-card border border-border rounded-lg px-3 py-2 text-sm" />
                    </div>

                    <div className="h-px bg-border w-full" />

                    {/* Batch Actions */}
                    <div className="space-y-2">
                        <h4 className="text-sm font-bold text-foreground mb-2">Batch Actions</h4>
                        {[
                            { icon: Printer, label: 'Generate All Tickets (PDF)' },
                            { icon: User, label: 'Send to Print Partner' },
                            { icon: Smartphone, label: 'Sync with Mobile App' },
                            { icon: RefreshCw, label: 'Set Up Auto-Refunds' }
                        ].map((action, i) => (
                            <button key={i} className="w-full flex items-center gap-3 p-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg transition-colors text-left">
                                <action.icon className="w-4 h-4" />
                                {action.label}
                            </button>
                        ))}
                    </div>

                </div>
            </div>
        </DashboardLayout>
    );
}
