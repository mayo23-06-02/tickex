"use client";

import { useState, useCallback } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { WebsiteBuilder } from "@/components/branding/WebsiteBuilder";
import { PageManager } from "@/components/branding/PageManager";
import { Eye, Code, Smartphone, Monitor, Save, Globe, Plus } from "lucide-react";
import { toast } from "sonner";

export interface Page {
    id: string;
    name: string;
    slug: string;
    components: any[];
}

export default function BrandingPage() {
    const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop");
    const [showCode, setShowCode] = useState(false);
    const [pages, setPages] = useState<Page[]>([
        {
            id: "home",
            name: "Home",
            slug: "/",
            components: [],
        },
    ]);
    const [currentPageId, setCurrentPageId] = useState("home");

    const currentPage = pages.find((p) => p.id === currentPageId);

    const handleSave = () => {
        toast.success("Website design saved successfully!");
    };

    const handlePublish = () => {
        toast.success("Website published to tickex.co.sz/events/summer-festival-2025");
    };

    const handleAddPage = () => {
        const newPage: Page = {
            id: `page-${Date.now()}`,
            name: "New Page",
            slug: `/page-${pages.length}`,
            components: [],
        };
        setPages([...pages, newPage]);
        setCurrentPageId(newPage.id);
        toast.success("New page created!");
    };

    const handleUpdatePage = (pageId: string, updates: Partial<Page>) => {
        setPages(pages.map((p) => (p.id === pageId ? { ...p, ...updates } : p)));
    };

    const handleDeletePage = (pageId: string) => {
        if (pages.length === 1) {
            toast.error("Cannot delete the last page");
            return;
        }
        setPages(pages.filter((p) => p.id !== pageId));
        if (currentPageId === pageId) {
            setCurrentPageId(pages[0].id);
        }
        toast.success("Page deleted");
    };

    const handleUpdateComponents = useCallback((components: any[]) => {
        setPages((prevPages) =>
            prevPages.map((p) => (p.id === currentPageId ? { ...p, components } : p))
        );
    }, [currentPageId]);

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl font-bold text-[#0f172a]">Branding & Design</h1>
                        <p className="text-[#64748b]">Create your event microsite for tickex.co.sz</p>
                    </div>
                    <div className="flex items-center gap-3">
                        {/* Preview Toggle */}
                        <div className="flex bg-white rounded-lg border border-[#e2e8f0] p-1">
                            <button
                                onClick={() => setPreviewMode("desktop")}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${previewMode === "desktop"
                                    ? "bg-slate-100 text-[#0f172a]"
                                    : "text-[#64748b] hover:text-[#0f172a]"
                                    }`}
                            >
                                <Monitor className="w-4 h-4" />
                                Desktop
                            </button>
                            <button
                                onClick={() => setPreviewMode("mobile")}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${previewMode === "mobile"
                                    ? "bg-slate-100 text-[#0f172a]"
                                    : "text-[#64748b] hover:text-[#0f172a]"
                                    }`}
                            >
                                <Smartphone className="w-4 h-4" />
                                Mobile
                            </button>
                        </div>

                        <button
                            onClick={() => setShowCode(!showCode)}
                            className="flex items-center gap-2 px-4 py-2 bg-white border border-[#e2e8f0] text-[#0f172a] rounded-lg font-medium hover:bg-slate-50 transition-colors"
                        >
                            <Code className="w-4 h-4" />
                            {showCode ? "Hide Code" : "View Code"}
                        </button>

                        <button
                            onClick={handleSave}
                            className="flex items-center gap-2 px-4 py-2 bg-white border border-[#e2e8f0] text-[#0f172a] rounded-lg font-medium hover:bg-slate-50 transition-colors"
                        >
                            <Save className="w-4 h-4" />
                            Save Draft
                        </button>

                        <button
                            onClick={handlePublish}
                            className="flex items-center gap-2 px-4 py-2 bg-[#1DB954] hover:bg-[#1ed760] text-white rounded-lg font-medium transition-all shadow-sm shadow-green-200"
                        >
                            <Globe className="w-4 h-4" />
                            Publish Website
                        </button>
                    </div>
                </div>

                {/* Website URL Preview */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <Globe className="w-5 h-5 text-[#1DB954]" />
                        <div className="flex-1">
                            <p className="text-sm font-medium text-[#0f172a]">Your Event Website</p>
                            <p className="text-sm text-[#64748b]">
                                <span className="font-mono">
                                    https://tickex.co.sz/events/summer-festival-2025{currentPage?.slug !== "/" ? currentPage?.slug : ""}
                                </span>
                            </p>
                        </div>
                        <button className="px-4 py-2 bg-white border border-[#e2e8f0] text-[#0f172a] rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
                            <Eye className="w-4 h-4 inline mr-2" />
                            Preview Live
                        </button>
                    </div>
                </div>

                {/* Page Manager */}
                <PageManager
                    pages={pages}
                    currentPageId={currentPageId}
                    onSelectPage={setCurrentPageId}
                    onAddPage={handleAddPage}
                    onUpdatePage={handleUpdatePage}
                    onDeletePage={handleDeletePage}
                />

                {/* Main Builder Interface */}
                {currentPage && (
                    <WebsiteBuilder
                        key={currentPageId}
                        previewMode={previewMode}
                        showCode={showCode}
                        components={currentPage.components}
                        onUpdateComponents={handleUpdateComponents}
                    />
                )}
            </div>
        </DashboardLayout>
    );
}
