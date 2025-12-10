"use client";

import { Plus, Edit, Trash2 } from "lucide-react";
import type { Page } from "@/app/branding/page";

interface PageManagerProps {
    pages: Page[];
    currentPageId: string;
    onSelectPage: (id: string) => void;
    onAddPage: () => void;
    onUpdatePage: (id: string, updates: Partial<Page>) => void;
    onDeletePage: (id: string) => void;
}

export function PageManager({
    pages,
    currentPageId,
    onSelectPage,
    onAddPage,
    onUpdatePage,
    onDeletePage
}: PageManagerProps) {
    return (
        <div className="bg-white rounded-xl p-4 border border-[#e2e8f0]">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-bold text-[#0f172a]">Pages</h3>
                <button
                    onClick={onAddPage}
                    className="flex items-center gap-1 px-3 py-1.5 bg-[#1DB954] text-white rounded-lg text-xs font-medium hover:bg-[#169c46] transition-colors"
                >
                    <Plus className="w-3.5 h-3.5" />
                    Add Page
                </button>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2">
                {pages.map((page) => (
                    <div
                        key={page.id}
                        onClick={() => onSelectPage(page.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 cursor-pointer transition-all whitespace-nowrap ${currentPageId === page.id
                                ? "border-[#1DB954] bg-green-50"
                                : "border-[#e2e8f0] hover:border-slate-300"
                            }`}
                    >
                        <span className="text-sm font-medium">{page.name}</span>
                        <span className="text-xs text-[#64748b]">({page.slug})</span>
                        {pages.length > 1 && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDeletePage(page.id);
                                }}
                                className="ml-2 p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                            >
                                <Trash2 className="w-3 h-3" />
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
