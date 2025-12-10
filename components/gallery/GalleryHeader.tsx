"use client";

import { Upload } from "lucide-react";

interface GalleryHeaderProps {
    onUploadClick: () => void;
    totalStorage: number;
}

export function GalleryHeader({ onUploadClick, totalStorage }: GalleryHeaderProps) {
    return (
        <div className="mb-6">
            <div className="flex justify-between items-start mb-2">
                <div>
                    <h1 className="text-2xl font-bold text-[#0f172a]">Gallery</h1>
                    <p className="text-sm text-[#64748b]">Memory vault and asset management</p>
                </div>
                <button
                    onClick={onUploadClick}
                    className="flex items-center gap-2 px-4 py-2.5 bg-[#1DB954] hover:bg-[#1ed760] text-white rounded-lg font-medium transition-all shadow-sm shadow-green-200"
                >
                    <Upload className="w-4 h-4" />
                    Upload
                </button>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#64748b] mt-3">
                <span>Storage: <span className="font-semibold text-[#0f172a]">{totalStorage.toFixed(1)}GB</span> / 10GB</span>
                <div className="flex-1 max-w-xs h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-[#1DB954] rounded-full transition-all"
                        style={{ width: `${(totalStorage / 10) * 100}%` }}
                    />
                </div>
            </div>
        </div>
    );
}
