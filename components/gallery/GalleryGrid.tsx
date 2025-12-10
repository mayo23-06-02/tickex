"use client";

import { Image as ImageIcon, Video, FileText, Download, Trash2, MoreVertical, CheckSquare, Square } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import type { GalleryItem } from "@/app/gallery/page";

interface GalleryGridProps {
    items: GalleryItem[];
    viewMode: "grid" | "list";
    selectedItems: Set<string>;
    onToggleSelection: (id: string) => void;
    onDelete: (ids: string[]) => void;
}

export function GalleryGrid({ items, viewMode, selectedItems, onToggleSelection, onDelete }: GalleryGridProps) {
    const [menuOpenId, setMenuOpenId] = useState<string | null>(null);

    const getIcon = (type: string) => {
        switch (type) {
            case "image": return <ImageIcon className="w-16 h-16 text-[#94a3b8]" />;
            case "video": return <Video className="w-16 h-16 text-[#94a3b8]" />;
            case "document": return <FileText className="w-16 h-16 text-[#94a3b8]" />;
            default: return <FileText className="w-16 h-16 text-[#94a3b8]" />;
        }
    };

    if (viewMode === "grid") {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <AnimatePresence>
                    {items.map((item) => (
                        <motion.div
                            key={item.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className={`bg-white rounded-xl border-2 overflow-hidden transition-all cursor-pointer group ${selectedItems.has(item.id)
                                    ? "border-[#1DB954] ring-2 ring-[#1DB954]/20"
                                    : "border-[#e2e8f0] hover:border-slate-300"
                                }`}
                            onClick={() => onToggleSelection(item.id)}
                        >
                            <div className="aspect-square bg-slate-50 flex items-center justify-center relative">
                                {getIcon(item.type)}

                                <div className="absolute top-2 left-2">
                                    {selectedItems.has(item.id) ? (
                                        <CheckSquare className="w-5 h-5 text-[#1DB954]" />
                                    ) : (
                                        <Square className="w-5 h-5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    )}
                                </div>

                                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="relative" onClick={(e) => e.stopPropagation()}>
                                        <button
                                            onClick={() => setMenuOpenId(menuOpenId === item.id ? null : item.id)}
                                            className="p-1.5 bg-white rounded-lg shadow-sm hover:bg-slate-50"
                                        >
                                            <MoreVertical className="w-4 h-4 text-[#64748b]" />
                                        </button>

                                        <AnimatePresence>
                                            {menuOpenId === item.id && (
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.95 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.95 }}
                                                    className="absolute right-0 top-8 z-10 bg-white shadow-lg rounded-lg border border-[#e2e8f0] p-1 min-w-[140px]"
                                                >
                                                    <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[#0f172a] hover:bg-slate-50 rounded-md transition-colors">
                                                        <Download className="w-3.5 h-3.5" />
                                                        Download
                                                    </button>
                                                    <button
                                                        onClick={() => onDelete([item.id])}
                                                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                        Delete
                                                    </button>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4">
                                <h3 className="font-semibold text-sm text-[#0f172a] truncate mb-1">{item.name}</h3>
                                <p className="text-xs text-[#64748b]">{item.size.toFixed(1)} MB</p>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        );
    }

    // List view
    return (
        <div className="bg-white rounded-xl border border-[#e2e8f0] overflow-hidden">
            <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-slate-50 border-b border-[#e2e8f0] text-xs font-semibold text-[#64748b] uppercase tracking-wider">
                <div className="col-span-1"></div>
                <div className="col-span-5">Name</div>
                <div className="col-span-2">Type</div>
                <div className="col-span-2">Size</div>
                <div className="col-span-2">Date</div>
            </div>

            <AnimatePresence>
                {items.map((item) => (
                    <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={`grid grid-cols-12 gap-4 px-6 py-4 border-b border-[#e2e8f0] last:border-b-0 hover:bg-slate-50 cursor-pointer transition-colors ${selectedItems.has(item.id) ? "bg-green-50/50" : ""
                            }`}
                        onClick={() => onToggleSelection(item.id)}
                    >
                        <div className="col-span-1 flex items-center">
                            {selectedItems.has(item.id) ? (
                                <CheckSquare className="w-5 h-5 text-[#1DB954]" />
                            ) : (
                                <Square className="w-5 h-5 text-slate-400" />
                            )}
                        </div>
                        <div className="col-span-5 flex items-center gap-3">
                            <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                {item.type === "image" && <ImageIcon className="w-5 h-5 text-[#64748b]" />}
                                {item.type === "video" && <Video className="w-5 h-5 text-[#64748b]" />}
                                {item.type === "document" && <FileText className="w-5 h-5 text-[#64748b]" />}
                            </div>
                            <span className="font-medium text-sm text-[#0f172a] truncate">{item.name}</span>
                        </div>
                        <div className="col-span-2 flex items-center">
                            <span className="text-sm text-[#64748b] capitalize">{item.type}</span>
                        </div>
                        <div className="col-span-2 flex items-center">
                            <span className="text-sm text-[#64748b]">{item.size.toFixed(1)} MB</span>
                        </div>
                        <div className="col-span-2 flex items-center justify-between">
                            <span className="text-sm text-[#64748b]">
                                {item.uploadedAt.toLocaleDateString()}
                            </span>
                            <div className="relative" onClick={(e) => e.stopPropagation()}>
                                <button
                                    onClick={() => setMenuOpenId(menuOpenId === item.id ? null : item.id)}
                                    className="p-1 hover:bg-slate-100 rounded-md"
                                >
                                    <MoreVertical className="w-4 h-4 text-[#64748b]" />
                                </button>

                                <AnimatePresence>
                                    {menuOpenId === item.id && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            className="absolute right-0 top-8 z-10 bg-white shadow-lg rounded-lg border border-[#e2e8f0] p-1 min-w-[140px]"
                                        >
                                            <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[#0f172a] hover:bg-slate-50 rounded-md transition-colors">
                                                <Download className="w-3.5 h-3.5" />
                                                Download
                                            </button>
                                            <button
                                                onClick={() => onDelete([item.id])}
                                                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                                Delete
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>

            {items.length === 0 && (
                <div className="py-16 text-center text-slate-400">
                    <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>No items found</p>
                </div>
            )}
        </div>
    );
}
