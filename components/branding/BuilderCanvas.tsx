"use client";

import { Trash2, Eye } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { WebsiteComponent } from "./WebsiteBuilder";
import { ComponentRenderer } from "./ComponentRenderer";

interface BuilderCanvasProps {
    components: WebsiteComponent[];
    selectedComponent: string | null;
    onSelectComponent: (id: string) => void;
    onDeleteComponent: (id: string) => void;
    previewMode: "desktop" | "mobile";
    showCode: boolean;
    globalStyles: any;
}

export function BuilderCanvas({
    components,
    selectedComponent,
    onSelectComponent,
    onDeleteComponent,
    previewMode,
    showCode,
    globalStyles
}: BuilderCanvasProps) {
    if (showCode) {
        return (
            <div className="bg-[#1e1e1e] rounded-xl p-6 h-full overflow-auto">
                <pre className="text-sm text-green-400 font-mono">
                    <code>{JSON.stringify({ components, globalStyles }, null, 2)}</code>
                </pre>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl border border-[#e2e8f0] h-full overflow-hidden flex flex-col">
            {/* Preview Header */}
            <div className="px-4 py-3 border-b border-[#e2e8f0] bg-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-[#64748b]" />
                    <span className="text-sm font-semibold text-[#0f172a]">
                        Live Preview
                    </span>
                </div>
                <span className="text-xs text-[#64748b]">
                    {components.length} component{components.length !== 1 ? "s" : ""}
                </span>
            </div>

            {/* Canvas Area */}
            <div className="flex-1 overflow-y-auto bg-slate-100">
                <div
                    className={`mx-auto bg-white shadow-xl transition-all duration-300 ${previewMode === "mobile" ? "max-w-md" : "w-full max-w-7xl"
                        }`}
                    style={{ minHeight: "100%" }}
                >
                    {components.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-24 text-center">
                            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                                <Eye className="w-8 h-8 text-[#94a3b8]" />
                            </div>
                            <h3 className="text-lg font-bold text-[#0f172a] mb-2">Start Building</h3>
                            <p className="text-sm text-[#64748b] max-w-sm">
                                Add components from the library to see your website come to life
                            </p>
                        </div>
                    ) : (
                        <div>
                            {components.map((component) => (
                                <SortableComponent
                                    key={component.id}
                                    component={component}
                                    isSelected={selectedComponent === component.id}
                                    onSelect={onSelectComponent}
                                    onDelete={onDeleteComponent}
                                    globalStyles={globalStyles}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function SortableComponent({
    component,
    isSelected,
    onSelect,
    onDelete,
    globalStyles
}: {
    component: WebsiteComponent;
    isSelected: boolean;
    onSelect: (id: string) => void;
    onDelete: (id: string) => void;
    globalStyles: any;
}) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: component.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            onClick={() => onSelect(component.id)}
            className={`relative group cursor-pointer transition-all ${isSelected ? "ring-4 ring-[#1DB954] ring-offset-4" : ""
                }`}
        >
            {/* Component Preview */}
            <div className="relative">
                <ComponentRenderer component={component} globalStyles={globalStyles} />

                {/* Overlay Controls */}
                <div className={`absolute inset-0 bg-black/0 hover:bg-black/5 transition-all ${isSelected ? "bg-green-50/10" : ""}`}>
                    {/* Selection Badge */}
                    {isSelected && (
                        <div className="absolute top-4 left-4 px-3 py-1 bg-[#1DB954] text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            Selected
                        </div>
                    )}

                    {/* Component Label & Actions */}
                    <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="px-3 py-1 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg text-xs font-semibold text-[#0f172a] capitalize">
                            {component.type}
                        </div>
                        <button
                            {...attributes}
                            {...listeners}
                            className="p-2 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white transition-colors cursor-grab active:cursor-grabbing"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <svg className="w-4 h-4 text-[#64748b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                            </svg>
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete(component.id);
                            }}
                            className="p-2 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg hover:bg-red-50 text-red-500 transition-colors"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
