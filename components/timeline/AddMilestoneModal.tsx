"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Users, Flag, FileText, Clock, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface AddMilestoneModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (milestone: any) => void;
}

export function AddMilestoneModal({ isOpen, onClose, onAdd }: AddMilestoneModalProps) {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        priority: "medium" as "high" | "medium" | "low",
        assignees: [] as string[],
        dependencies: [] as string[],
        status: "pending" as "completed" | "active" | "pending",
    });

    const [assigneeInput, setAssigneeInput] = useState("");
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.title.trim()) {
            newErrors.title = "Title is required";
        }

        if (!formData.startDate) {
            newErrors.startDate = "Start date is required";
        }

        if (!formData.endDate) {
            newErrors.endDate = "End date is required";
        }

        if (formData.startDate && formData.endDate && new Date(formData.startDate) > new Date(formData.endDate)) {
            newErrors.endDate = "End date must be after start date";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error("Please fix the errors in the form");
            return;
        }

        const newMilestone = {
            id: Date.now().toString(),
            title: formData.title,
            description: formData.description,
            startDate: formData.startDate,
            endDate: formData.endDate,
            progress: 0,
            assignees: formData.assignees,
            priority: formData.priority,
            status: formData.status,
            dependencies: formData.dependencies,
        };

        onAdd(newMilestone);
        toast.success("Milestone added successfully!");
        handleClose();
    };

    const handleClose = () => {
        setFormData({
            title: "",
            description: "",
            startDate: "",
            endDate: "",
            priority: "medium",
            assignees: [],
            dependencies: [],
            status: "pending",
        });
        setAssigneeInput("");
        setErrors({});
        onClose();
    };

    const addAssignee = () => {
        if (assigneeInput.trim() && !formData.assignees.includes(assigneeInput.trim())) {
            setFormData({
                ...formData,
                assignees: [...formData.assignees, assigneeInput.trim()],
            });
            setAssigneeInput("");
        }
    };

    const removeAssignee = (assignee: string) => {
        setFormData({
            ...formData,
            assignees: formData.assignees.filter((a) => a !== assignee),
        });
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
                        >
                            {/* Header */}
                            <div className="p-6 border-b border-[#e2e8f0] flex justify-between items-start">
                                <div>
                                    <h2 className="text-2xl font-bold text-[#0f172a]">Add New Milestone</h2>
                                    <p className="text-sm text-[#64748b] mt-1">
                                        Create a new milestone for your event timeline
                                    </p>
                                </div>
                                <button
                                    onClick={handleClose}
                                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                                >
                                    <X className="w-5 h-5 text-[#64748b]" />
                                </button>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
                                <div className="space-y-6">
                                    {/* Title */}
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-semibold text-[#0f172a] mb-2">
                                            <FileText className="w-4 h-4 text-[#1DB954]" />
                                            Milestone Title *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            placeholder="e.g., Venue Setup"
                                            className={`w-full px-4 py-3 bg-white border ${errors.title ? "border-red-500" : "border-[#e2e8f0]"
                                                } rounded-lg text-[#0f172a] placeholder:text-[#94a3b8] focus:outline-none focus:border-[#1DB954] transition-colors`}
                                        />
                                        {errors.title && (
                                            <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                                                <AlertCircle className="w-3 h-3" />
                                                {errors.title}
                                            </p>
                                        )}
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-semibold text-[#0f172a] mb-2">
                                            <FileText className="w-4 h-4 text-[#1DB954]" />
                                            Description
                                        </label>
                                        <textarea
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            placeholder="Describe the milestone objectives and deliverables..."
                                            rows={3}
                                            className="w-full px-4 py-3 bg-white border border-[#e2e8f0] rounded-lg text-[#0f172a] placeholder:text-[#94a3b8] focus:outline-none focus:border-[#1DB954] transition-colors resize-none"
                                        />
                                    </div>

                                    {/* Date Range */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="flex items-center gap-2 text-sm font-semibold text-[#0f172a] mb-2">
                                                <Calendar className="w-4 h-4 text-[#1DB954]" />
                                                Start Date *
                                            </label>
                                            <input
                                                type="date"
                                                value={formData.startDate}
                                                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                                className={`w-full px-4 py-3 bg-white border ${errors.startDate ? "border-red-500" : "border-[#e2e8f0]"
                                                    } rounded-lg text-[#0f172a] focus:outline-none focus:border-[#1DB954] transition-colors`}
                                            />
                                            {errors.startDate && (
                                                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                                                    <AlertCircle className="w-3 h-3" />
                                                    {errors.startDate}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="flex items-center gap-2 text-sm font-semibold text-[#0f172a] mb-2">
                                                <Calendar className="w-4 h-4 text-[#1DB954]" />
                                                End Date *
                                            </label>
                                            <input
                                                type="date"
                                                value={formData.endDate}
                                                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                                className={`w-full px-4 py-3 bg-white border ${errors.endDate ? "border-red-500" : "border-[#e2e8f0]"
                                                    } rounded-lg text-[#0f172a] focus:outline-none focus:border-[#1DB954] transition-colors`}
                                            />
                                            {errors.endDate && (
                                                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                                                    <AlertCircle className="w-3 h-3" />
                                                    {errors.endDate}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Priority & Status */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="flex items-center gap-2 text-sm font-semibold text-[#0f172a] mb-2">
                                                <Flag className="w-4 h-4 text-[#1DB954]" />
                                                Priority
                                            </label>
                                            <select
                                                value={formData.priority}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        priority: e.target.value as "high" | "medium" | "low",
                                                    })
                                                }
                                                className="w-full px-4 py-3 bg-white border border-[#e2e8f0] rounded-lg text-[#0f172a] focus:outline-none focus:border-[#1DB954] transition-colors"
                                            >
                                                <option value="low">Low Priority</option>
                                                <option value="medium">Medium Priority</option>
                                                <option value="high">High Priority</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="flex items-center gap-2 text-sm font-semibold text-[#0f172a] mb-2">
                                                <Clock className="w-4 h-4 text-[#1DB954]" />
                                                Initial Status
                                            </label>
                                            <select
                                                value={formData.status}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        status: e.target.value as "completed" | "active" | "pending",
                                                    })
                                                }
                                                className="w-full px-4 py-3 bg-white border border-[#e2e8f0] rounded-lg text-[#0f172a] focus:outline-none focus:border-[#1DB954] transition-colors"
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="active">Active</option>
                                                <option value="completed">Completed</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Assignees */}
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-semibold text-[#0f172a] mb-2">
                                            <Users className="w-4 h-4 text-[#1DB954]" />
                                            Assignees
                                        </label>
                                        <div className="flex gap-2 mb-3">
                                            <input
                                                type="text"
                                                value={assigneeInput}
                                                onChange={(e) => setAssigneeInput(e.target.value)}
                                                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addAssignee())}
                                                placeholder="Enter name and press Enter"
                                                className="flex-1 px-4 py-3 bg-white border border-[#e2e8f0] rounded-lg text-[#0f172a] placeholder:text-[#94a3b8] focus:outline-none focus:border-[#1DB954] transition-colors"
                                            />
                                            <button
                                                type="button"
                                                onClick={addAssignee}
                                                className="px-4 py-3 bg-[#1DB954] hover:bg-[#1ed760] text-white rounded-lg font-medium transition-colors"
                                            >
                                                Add
                                            </button>
                                        </div>
                                        {formData.assignees.length > 0 && (
                                            <div className="flex flex-wrap gap-2">
                                                {formData.assignees.map((assignee, index) => (
                                                    <motion.div
                                                        key={index}
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-[#1DB954] rounded-lg text-sm font-medium"
                                                    >
                                                        <Users className="w-3.5 h-3.5" />
                                                        {assignee}
                                                        <button
                                                            type="button"
                                                            onClick={() => removeAssignee(assignee)}
                                                            className="ml-1 hover:text-red-500 transition-colors"
                                                        >
                                                            <X className="w-3.5 h-3.5" />
                                                        </button>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </form>

                            {/* Footer */}
                            <div className="p-6 border-t border-[#e2e8f0] flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    className="px-6 py-2.5 bg-white border border-[#e2e8f0] text-[#0f172a] rounded-lg font-medium hover:bg-slate-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    className="px-6 py-2.5 bg-[#1DB954] hover:bg-[#1ed760] text-white rounded-lg font-medium transition-all shadow-sm shadow-green-200 hover:shadow-md hover:shadow-green-300"
                                >
                                    Add Milestone
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
