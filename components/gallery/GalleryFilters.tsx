"use client";

import { Grid3x3, List, Image, Video, FileText, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface GalleryFiltersProps {
    viewMode: "grid" | "list";
    setViewMode: (mode: "grid" | "list") => void;
    filterType: "all" | "image" | "video" | "document";
    setFilterType: (type: "all" | "image" | "video" | "document") => void;
    selectedCount: number;
    onDeleteSelected: () => void;
}

export function GalleryFilters({
    viewMode,
    setViewMode,
    filterType,
    setFilterType,
    selectedCount,
    onDeleteSelected
}: GalleryFiltersProps) {
    const filters = [
        { id: "all" as const, label: "All", icon: Grid3x3 },
        { id: "image" as const, label: "Photos", icon: Image },
        { id: "video" as const, label: "Videos", icon: Video },
        { id: "document" as const, label: "Documents", icon: FileText },
    ];

    return (
        <div className="flex justify-between items-center mb-6 bg-white rounded-xl p-4 shadow-sm border border-[#e2e8f0]">
            <div className="flex gap-2">
                {filters.map((filter) => (
                    <button
                        key={filter.id}
                        onClick={() => setFilterType(filter.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${filterType === filter.id
                                ? "bg-[#1DB954] text-white shadow-sm shadow-green-200"
                                : "bg-slate-50 text-[#64748b] hover:bg-slate-100"
                            }`}
                    >
                        <filter.icon className="w-4 h-4" />
                        {filter.label}
                    </button>
                ))}
            </div>

            <div className="flex items-center gap-3">
                <AnimatePresence>
                    {selectedCount > 0 && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            onClick={onDeleteSelected}
                            className="flex items-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
                        >
                            <Trash2 className="w-4 h-4" />
                            Delete ({selectedCount})
                        </motion.button>
                    )}
                </AnimatePresence>

                <div className="flex bg-slate-100 rounded-lg p-1">
                    <button
                        onClick={() => setViewMode("grid")}
                        className={`p-2 rounded-md transition-colors ${viewMode === "grid"
                                ? "bg-white text-[#1DB954] shadow-sm"
                                : "text-[#94a3b8] hover:text-[#64748b]"
                            }`}
                    >
                        <Grid3x3 className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setViewMode("list")}
                        className={`p-2 rounded-md transition-colors ${viewMode === "list"
                                ? "bg-white text-[#1DB954] shadow-sm"
                                : "text-[#94a3b8] hover:text-[#64748b]"
                            }`}
                    >
                        <List className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
