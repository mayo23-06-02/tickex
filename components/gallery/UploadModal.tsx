"use client";

import { useState, useRef } from "react";
import { X, Upload, File, Image, Video, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface UploadModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUpload: (files: File[]) => void;
}

export function UploadModal({ isOpen, onClose, onUpload }: UploadModalProps) {
    const [dragActive, setDragActive] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setSelectedFiles(Array.from(e.dataTransfer.files));
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFiles(Array.from(e.target.files));
        }
    };

    const handleUpload = () => {
        if (selectedFiles.length > 0) {
            onUpload(selectedFiles);
            setSelectedFiles([]);
        }
    };

    const getFileIcon = (file: File) => {
        if (file.type.startsWith("image/")) return <Image className="w-5 h-5 text-blue-500" />;
        if (file.type.startsWith("video/")) return <Video className="w-5 h-5 text-purple-500" />;
        return <FileText className="w-5 h-5 text-orange-500" />;
    };

    const formatFileSize = (bytes: number) => {
        if (bytes < 1024) return bytes + " B";
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
        return (bytes / (1024 * 1024)).toFixed(1) + " MB";
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden"
                    >
                        <div className="p-6 border-b border-[#e2e8f0] flex justify-between items-center">
                            <h3 className="text-xl font-bold text-[#0f172a]">Upload Files</h3>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5 text-[#64748b]" />
                            </button>
                        </div>

                        <div className="p-6">
                            <input
                                ref={fileInputRef}
                                type="file"
                                multiple
                                onChange={handleFileChange}
                                className="hidden"
                                accept="image/*,video/*,.pdf,.doc,.docx"
                            />

                            <div
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={handleDrop}
                                onClick={() => fileInputRef.current?.click()}
                                className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all ${dragActive
                                        ? "border-[#1DB954] bg-green-50"
                                        : "border-[#e2e8f0] hover:border-[#1DB954] hover:bg-slate-50"
                                    }`}
                            >
                                <Upload className={`w-12 h-12 mx-auto mb-4 ${dragActive ? "text-[#1DB954]" : "text-[#94a3b8]"}`} />
                                <p className="text-lg font-semibold text-[#0f172a] mb-2">
                                    {dragActive ? "Drop files here" : "Drag & drop files here"}
                                </p>
                                <p className="text-sm text-[#64748b] mb-4">or click to browse</p>
                                <p className="text-xs text-[#94a3b8]">
                                    Supports: Images, Videos, Documents (Max 50MB per file)
                                </p>
                            </div>

                            {selectedFiles.length > 0 && (
                                <div className="mt-6">
                                    <h4 className="text-sm font-semibold text-[#0f172a] mb-3">
                                        Selected Files ({selectedFiles.length})
                                    </h4>
                                    <div className="space-y-2 max-h-48 overflow-y-auto">
                                        {selectedFiles.map((file, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-[#e2e8f0]"
                                            >
                                                {getFileIcon(file)}
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-[#0f172a] truncate">
                                                        {file.name}
                                                    </p>
                                                    <p className="text-xs text-[#64748b]">
                                                        {formatFileSize(file.size)}
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
                                                    }}
                                                    className="p-1 hover:bg-red-50 text-red-500 rounded-md transition-colors"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="p-6 bg-slate-50 border-t border-[#e2e8f0] flex gap-3">
                            <button
                                onClick={onClose}
                                className="flex-1 px-4 py-3 rounded-lg border border-[#e2e8f0] text-[#64748b] font-semibold hover:bg-white transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpload}
                                disabled={selectedFiles.length === 0}
                                className="flex-1 px-4 py-3 rounded-lg bg-[#1DB954] text-white font-bold hover:bg-[#169c46] transition-colors shadow-lg shadow-green-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Upload {selectedFiles.length > 0 && `(${selectedFiles.length})`}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
