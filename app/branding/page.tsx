"use client";

import { useState, useCallback, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { WebsiteBuilder } from "@/components/branding/WebsiteBuilder";
import { PageManager } from "@/components/branding/PageManager";
import { Eye, Code, Smartphone, Monitor, Save, Globe, ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import { getOrganizerEvents, getMicrosite, saveMicrosite, publishMicrosite } from "@/app/actions/microsite";

export interface Page {
    id: string;
    name: string;
    slug: string;
    components: any[];
}

function BrandingPageContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const eventId = searchParams.get("eventId");

    const [events, setEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop");
    const [showCode, setShowCode] = useState(false);

    // Builder State
    const [pages, setPages] = useState<Page[]>([
        { id: "home", name: "Home", slug: "/", components: [] },
    ]);
    const [currentPageId, setCurrentPageId] = useState("home");
    const [globalStyles, setGlobalStyles] = useState({
        primaryColor: "#1DB954",
        secondaryColor: "#0f172a",
        fontFamily: "Inter",
        backgroundColor: "#ffffff",
    });

    const currentPage = pages.find((p) => p.id === currentPageId);
    const currentEvent = events.find(e => e._id === eventId);

    // Initial Fetch
    useEffect(() => {
        async function load() {
            setLoading(true);
            try {
                // 1. Fetch Events
                const eventList = await getOrganizerEvents();
                setEvents(eventList);

                // 2. If eventId selected, fetch microsite
                if (eventId) {
                    const microsite = await getMicrosite(eventId);
                    if (microsite) {
                        if (microsite.pages && microsite.pages.length > 0) {
                            setPages(microsite.pages);
                            // Ensure current page exists
                            if (!microsite.pages.find((p: any) => p.id === currentPageId)) {
                                setCurrentPageId(microsite.pages[0].id);
                            }
                        }
                        if (microsite.globalStyles) {
                            setGlobalStyles(microsite.globalStyles);
                        }
                    }
                }
            } catch (error) {
                console.error(error);
                toast.error("Failed to load data");
            } finally {
                setLoading(false);
            }
        }
        load();
    }, [eventId]); // Reload if eventId changes

    const handleSave = async () => {
        if (!eventId) return;
        setSaving(true);
        try {
            const result = await saveMicrosite(eventId, {
                pages,
                globalStyles
            });

            if (result.error) {
                toast.error(result.error);
            } else {
                toast.success("Website design saved successfully!");
            }
        } catch (err) {
            toast.error("Failed to save");
        } finally {
            setSaving(false);
        }
    };

    const handlePublish = async () => {
        if (!eventId) return;
        const result = await publishMicrosite(eventId);
        if (result.success) {
            toast.success("Website published successfully!");
            // Optional: Redirect to live site or show link
        } else {
            toast.error(result.error || "Publish failed");
        }
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

    // Render Event Selection if no ID
    if (!eventId) {
        return (
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-[#0f172a]">Select Event to Design</h1>
                    <p className="text-[#64748b]">Choose an event to build a microsite for.</p>
                </div>
                {loading ? (
                    <div>Loading events...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {events.length === 0 ? (
                            <div className="col-span-3 text-center py-10 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                                <p className="text-slate-500">No events found. Create an event first.</p>
                            </div>
                        ) : (
                            events.map(event => (
                                <button
                                    key={event._id}
                                    onClick={() => router.push(`/branding?eventId=${event._id}`)}
                                    className="flex flex-col text-left bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-green-500 hover:shadow-md transition-all group"
                                >
                                    <div className="h-32 bg-slate-100 w-full relative">
                                        {event.imageUrl ? (
                                            <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-slate-400">No Image</div>
                                        )}
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-bold text-slate-900 mb-1">{event.title}</h3>
                                        <p className="text-xs text-slate-500">{new Date(event.startDate).toLocaleDateString()}</p>
                                    </div>
                                </button>
                            ))
                        )}
                    </div>
                )}
            </div>
        );
    }

    if (loading) return <div>Loading builder...</div>;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-start">
                <div>
                    <button
                        onClick={() => router.push('/branding')}
                        className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 mb-1"
                    >
                        <ChevronLeft className="w-3 h-3" /> Back to events
                    </button>
                    <h1 className="text-2xl font-bold text-[#0f172a]">
                        Designing: {currentEvent?.title || "Event"}
                    </h1>
                    <p className="text-[#64748b]">Create your event microsite</p>
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
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-[#e2e8f0] text-[#0f172a] rounded-lg font-medium hover:bg-slate-50 transition-colors disabled:opacity-50"
                    >
                        <Save className="w-4 h-4" />
                        {saving ? "Saving..." : "Save Draft"}
                    </button>

                    <button
                        onClick={handlePublish}
                        className="flex items-center gap-2 px-4 py-2 bg-[#1DB954] hover:bg-[#1ed760] text-white rounded-lg font-medium transition-all shadow-sm shadow-green-200"
                    >
                        <Globe className="w-4 h-4" />
                        Publish
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
                                https://tickex.co.sz/sites/{currentEvent?.slug || eventId}{currentPage?.slug !== "/" ? currentPage?.slug : ""}
                            </span>
                        </p>
                    </div>
                    <a
                        href={`/sites/${currentEvent?.slug || eventId}${currentPage?.slug !== "/" ? currentPage?.slug : ""}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-white border border-[#e2e8f0] text-[#0f172a] rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors inline-flex items-center"
                    >
                        <Eye className="w-4 h-4 mr-2" />
                        Preview Live
                    </a>
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
                    globalStyles={globalStyles}
                    onUpdateGlobalStyles={setGlobalStyles}
                />
            )}
        </div>
    );
}

export default function BrandingPage() {
    return (
        <DashboardLayout>
            <Suspense fallback={<div>Loading...</div>}>
                <BrandingPageContent />
            </Suspense>
        </DashboardLayout>
    );
}
