"use client";

import { Plus, Edit, Trash2 } from "lucide-react";
import type { Page } from "@/app/branding/page";
import { useMemo } from "react";

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
    const currentPage = useMemo(() => pages.find(p => p.id === currentPageId), [pages, currentPageId]);

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
            {currentPage && (
                <div className="mt-4 p-3 border border-[#e2e8f0] rounded-lg bg-slate-50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                            <label className="text-xs font-semibold text-[#64748b] uppercase tracking-wider mb-1 block">
                                Name
                            </label>
                            <input
                                type="text"
                                value={currentPage.name}
                                onChange={(e) => onUpdatePage(currentPage.id, { name: e.target.value })}
                                className="w-full px-3 py-2 rounded-lg border border-[#e2e8f0] text-sm"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-semibold text-[#64748b] uppercase tracking-wider mb-1 block">
                                Slug
                            </label>
                            <input
                                type="text"
                                value={currentPage.slug}
                                onChange={(e) => {
                                    const raw = e.target.value.trim();
                                    const normalized = (raw.startsWith("/") ? raw : `/${raw}`)
                                        .replace(/\s+/g, "-")
                                        .toLowerCase();
                                    onUpdatePage(currentPage.id, { slug: normalized });
                                }}
                                className="w-full px-3 py-2 rounded-lg border border-[#e2e8f0] text-sm font-mono"
                            />
                            <p className="text-xs text-[#64748b] mt-1">Use leading `/`, e.g. `/home`, `/about`</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
