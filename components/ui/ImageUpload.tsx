"use client";

import { useState, useRef } from "react";
import { Upload, X, Loader2, Image as ImageIcon } from "lucide-react";
import { uploadFile } from "@/app/actions/upload";
import { toast } from "sonner";

interface ImageUploadProps {
    value: string;
    onChange: (url: string) => void;
    label?: string;
    className?: string;
}

export function ImageUpload({ value, onChange, label, className = "" }: ImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Basic validation
        if (!file.type.startsWith("image/")) {
            toast.error("Please select an image file");
            return;
        }

        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            toast.error("Image must be smaller than 5MB");
            return;
        }

        try {
            setIsUploading(true);
            const formData = new FormData();
            formData.append("file", file);

            const result = await uploadFile(formData);

            if (result.error) {
                toast.error(result.error);
            } else if (result.url) {
                onChange(result.url);
                toast.success("Image uploaded!");
            }
        } catch (error) {
            console.error(error);
            toast.error("Upload failed");
        } finally {
            setIsUploading(false);
            // Reset input so same file can be selected again if needed
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    return (
        <div className={className}>
            {label && (
                <label className="text-sm font-medium text-[#0f172a] mb-2 block">
                    {label}
                </label>
            )}

            <div className="flex gap-4 items-start">
                {/* Preview */}
                {value ? (
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-slate-200 group flex-shrink-0">
                        <img
                            src={value}
                            alt="Uploaded"
                            className="w-full h-full object-cover"
                        />
                        <button
                            onClick={() => onChange("")}
                            className="absolute top-1 right-1 p-1 bg-white/90 rounded-full text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <X className="w-3 h-3" />
                        </button>
                    </div>
                ) : (
                    <div className="w-24 h-24 rounded-lg border-2 border-dashed border-slate-200 flex items-center justify-center bg-slate-50 flex-shrink-0 text-slate-400">
                        <ImageIcon className="w-8 h-8 opacity-50" />
                    </div>
                )}

                {/* Actions */}
                <div className="flex-1">
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                    />

                    <div className="flex flex-col gap-2">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="https://..."
                                value={value}
                                onChange={(e) => onChange(e.target.value)}
                                className="flex-1 px-3 py-2 rounded-lg border border-[#e2e8f0] text-sm font-mono text-slate-600"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isUploading}
                            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white border border-[#e2e8f0] rounded-lg text-sm font-medium text-[#0f172a] hover:bg-slate-50 transition-colors disabled:opacity-50"
                        >
                            {isUploading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Uploading...
                                </>
                            ) : (
                                <>
                                    <Upload className="w-4 h-4" />
                                    Upload Image
                                </>
                            )}
                        </button>
                    </div>

                    <p className="text-xs text-slate-500 mt-2">
                        Supported: JPG, PNG, WEBP. Max 5MB.
                    </p>
                </div>
            </div>
        </div>
    );
}
