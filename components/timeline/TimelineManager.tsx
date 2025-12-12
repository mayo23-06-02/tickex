"use client";

import { useState, useEffect } from "react";
import { motion, Reorder } from "framer-motion";
import {
    Check,
    Circle,
    Clock,
    MoreVertical,
    Edit2,
    Trash2,
    Users,
    Calendar,
    Flag,
    GripVertical,
    Plus,
    CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import { AddMilestoneModal } from "./AddMilestoneModal";
import { getMilestones, createMilestone, updateMilestone, deleteMilestone } from "@/app/actions/timeline";

interface TimelineItem {
    id: string;
    status: "completed" | "active" | "pending";
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    progress: number;
    assignees: string[];
    priority: "high" | "medium" | "low";
    dependencies?: string[];
}

interface TimelineManagerProps {
    isModalOpen?: boolean;
    setIsModalOpen?: (open: boolean) => void;
}

export function TimelineManager({ isModalOpen: externalModalOpen, setIsModalOpen: externalSetModalOpen }: TimelineManagerProps = {}) {
    const [items, setItems] = useState<TimelineItem[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
    const [internalModalOpen, setInternalModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Use external modal state if provided, otherwise use internal state
    const isModalOpen = externalModalOpen !== undefined ? externalModalOpen : internalModalOpen;
    const setIsModalOpen = externalSetModalOpen || setInternalModalOpen;

    useEffect(() => {
        loadItems();
    }, []);

    async function loadItems() {
        try {
            const data = await getMilestones();
            const formatted = data.map((m: any) => ({
                id: m._id,
                title: m.title,
                description: m.description,
                status: m.status,
                startDate: m.startDate || m.dueDate, // Fallback
                endDate: m.dueDate,
                progress: m.status === 'completed' ? 100 : (m.status === 'active' ? 50 : 0),
                assignees: [], // Placeholder
                priority: m.priority || 'medium',
                dependencies: []
            }));
            setItems(formatted);
        } catch (error) {
            console.error("Failed to load milestones", error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleAddMilestone = async (milestoneData: any) => {
        try {
            await createMilestone({
                title: milestoneData.title,
                description: milestoneData.description,
                dueDate: milestoneData.endDate,
                startDate: milestoneData.startDate,
                priority: milestoneData.priority,
                status: "pending"
            });
            await loadItems();
            setIsModalOpen(false);
            toast.success("Milestone created");
        } catch (error) {
            toast.error("Failed to create milestone");
        }
    };

    const handleStatusChange = async (id: string, newStatus: TimelineItem["status"]) => {
        const originalItems = [...items];
        // Optimistic update
        setItems((prev) =>
            prev.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        status: newStatus,
                        progress: newStatus === "completed" ? 100 : newStatus === "active" ? item.progress : 0,
                    }
                    : item
            )
        );

        try {
            await updateMilestone(id, { status: newStatus });
            toast.success(`Milestone status updated to ${newStatus}`);
        } catch (error) {
            setItems(originalItems); // Revert
            toast.error("Failed to update status");
        }
    };

    const handleProgressUpdate = async (id: string, progress: number) => {
        // Debouncing would be ideal here, but for now simple optimistic
        setItems((prev) =>
            prev.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        progress,
                        status: progress === 100 ? "completed" : progress > 0 ? "active" : "pending",
                    }
                    : item
            )
        );
        // We won't call DB on every drag event for performance in this demo, strictly should use debounce
    };

    const handleDelete = async (id: string) => {
        const originalItems = [...items];
        setItems((prev) => prev.filter((item) => item.id !== id));
        setMenuOpenId(null);

        try {
            await deleteMilestone(id);
            toast.success("Milestone deleted");
        } catch (error) {
            setItems(originalItems);
            toast.error("Failed to delete milestone");
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case "high":
                return "text-red-500 bg-red-50";
            case "medium":
                return "text-amber-500 bg-amber-50";
            case "low":
                return "text-blue-500 bg-blue-50";
            default:
                return "text-slate-500 bg-slate-50";
        }
    };

    if (isLoading) {
        return <div className="bg-white rounded-xl border border-[#e2e8f0] shadow-sm p-12 text-center text-slate-400">Loading timeline...</div>;
    }

    return (
        <div className="bg-white rounded-xl border border-[#e2e8f0] shadow-sm">
            {/* Same JSX as before, just mapping items */}
            <div className="p-6 border-b border-[#e2e8f0]">
                <h2 className="text-lg font-bold text-[#0f172a]">Timeline Milestones</h2>
                <p className="text-sm text-[#64748b] mt-1">Drag to reorder, click to edit</p>
            </div>

            <Reorder.Group
                axis="y"
                values={items}
                onReorder={setItems}
                className="divide-y divide-[#e2e8f0]"
            >
                {items.length === 0 && (
                    <div className="p-12 text-center text-slate-400">No milestones yet. Create one to get started.</div>
                )}
                {items.map((item, index) => (
                    <Reorder.Item
                        key={item.id}
                        value={item}
                        className="relative group"
                    >
                        <div className="p-6 hover:bg-slate-50/50 transition-colors">
                            <div className="flex items-start gap-4">
                                {/* Drag Handle */}
                                <div className="flex-shrink-0 mt-1 cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity">
                                    <GripVertical className="w-5 h-5 text-[#94a3b8]" />
                                </div>

                                {/* Status Icon */}
                                <div className="flex-shrink-0 mt-1">
                                    {item.status === "completed" && (
                                        <div className="w-8 h-8 rounded-full bg-[#1DB954] flex items-center justify-center text-white">
                                            <Check className="w-4 h-4" />
                                        </div>
                                    )}
                                    {item.status === "active" && (
                                        <div className="w-8 h-8 rounded-full bg-white border-2 border-[#1DB954] flex items-center justify-center">
                                            <div className="w-3 h-3 rounded-full bg-[#1DB954] animate-pulse"></div>
                                        </div>
                                    )}
                                    {item.status === "pending" && (
                                        <div className="w-8 h-8 rounded-full bg-slate-100 border border-[#e2e8f0] flex items-center justify-center text-[#94a3b8]">
                                            <Circle className="w-4 h-4 fill-current" />
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-4 mb-3">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-1">
                                                <h3 className="text-base font-bold text-[#0f172a]">{item.title}</h3>
                                                <span
                                                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(
                                                        item.priority
                                                    )}`}
                                                >
                                                    {item.priority}
                                                </span>
                                            </div>
                                            <p className="text-sm text-[#64748b]">{item.description}</p>
                                        </div>

                                        {/* Actions Menu */}
                                        <div className="relative">
                                            <button
                                                onClick={() => setMenuOpenId(menuOpenId === item.id ? null : item.id)}
                                                className="p-1.5 hover:bg-white rounded-lg transition-colors"
                                            >
                                                <MoreVertical className="w-4 h-4 text-[#94a3b8]" />
                                            </button>

                                            {menuOpenId === item.id && (
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.95 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    className="absolute right-0 top-8 z-10 bg-white shadow-lg rounded-lg border border-[#e2e8f0] p-1 min-w-[160px]"
                                                >
                                                    <button
                                                        onClick={() => {
                                                            setEditingId(item.id);
                                                            setMenuOpenId(null);
                                                        }}
                                                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[#0f172a] hover:bg-slate-50 rounded-md transition-colors"
                                                    >
                                                        <Edit2 className="w-3.5 h-3.5" />
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleStatusChange(item.id, "completed")}
                                                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[#1DB954] hover:bg-green-50 rounded-md transition-colors"
                                                        disabled={item.status === "completed"}
                                                    >
                                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                                        Mark Complete
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(item.id)}
                                                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                        Delete
                                                    </button>
                                                </motion.div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Meta Info */}
                                    <div className="flex flex-wrap items-center gap-4 mb-3 text-xs text-[#64748b]">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar className="w-3.5 h-3.5" />
                                            <span>
                                                {new Date(item.startDate).toLocaleDateString()} -{" "}
                                                {new Date(item.endDate).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Users className="w-3.5 h-3.5" />
                                            <span>{item.assignees?.join(", ") || "Unassigned"}</span>
                                        </div>
                                        {item.dependencies && item.dependencies.length > 0 && (
                                            <div className="flex items-center gap-1.5">
                                                <Flag className="w-3.5 h-3.5" />
                                                <span>Depends on others</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs">
                                            <span className="text-[#64748b]">Progress</span>
                                            <span className="font-medium text-[#0f172a]">{item.progress}%</span>
                                        </div>
                                        <div className="relative">
                                            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${item.progress}%` }}
                                                    transition={{ duration: 0.5 }}
                                                    className={`h-full rounded-full ${item.status === "completed"
                                                        ? "bg-[#1DB954]"
                                                        : item.status === "active"
                                                            ? "bg-blue-500"
                                                            : "bg-slate-300"
                                                        }`}
                                                />
                                            </div>
                                            {item.status !== "completed" && (
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max="100"
                                                    value={item.progress}
                                                    onChange={(e) =>
                                                        handleProgressUpdate(item.id, parseInt(e.target.value))
                                                    }
                                                    className="absolute inset-0 w-full h-2 opacity-0 cursor-pointer"
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Reorder.Item>
                ))}
            </Reorder.Group>

            {/* Add New Milestone Button */}
            <div className="p-6 border-t border-[#e2e8f0]">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-[#e2e8f0] rounded-lg text-[#64748b] hover:text-[#1DB954] hover:border-[#1DB954] transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    <span className="font-medium">Add New Milestone</span>
                </button>
            </div>

            {/* Add Milestone Modal */}
            <AddMilestoneModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdd={handleAddMilestone}
            />
        </div>
    );
}
