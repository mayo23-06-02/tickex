"use client";

import type { WebsiteComponent } from "./types";
import { ImageUpload } from "@/components/ui/ImageUpload";

interface DesignPanelProps {
    selectedComponent: WebsiteComponent | undefined;
    onUpdateComponent: (id: string, props: Record<string, any>) => void;
    globalStyles: {
        primaryColor: string;
        secondaryColor: string;
        fontFamily: string;
        backgroundColor: string;
    };
    onUpdateGlobalStyles: (styles: any) => void;
}

export function DesignPanel({
    selectedComponent,
    onUpdateComponent,
    globalStyles,
    onUpdateGlobalStyles
}: DesignPanelProps) {
    return (
        <div className="bg-white rounded-xl p-6 border border-[#e2e8f0] h-full overflow-y-auto">
            <h3 className="text-sm font-bold text-[#0f172a] mb-6">Design Settings</h3>

            {/* Global Styles */}
            <div className="mb-8">
                <h4 className="text-xs font-semibold text-[#64748b] uppercase tracking-wider mb-4">
                    Global Styles
                </h4>
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-[#0f172a] mb-2 block">
                            Primary Color
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="color"
                                value={globalStyles.primaryColor}
                                onChange={(e) =>
                                    onUpdateGlobalStyles({ ...globalStyles, primaryColor: e.target.value })
                                }
                                className="w-12 h-10 rounded-lg border border-[#e2e8f0] cursor-pointer"
                            />
                            <input
                                type="text"
                                value={globalStyles.primaryColor}
                                onChange={(e) =>
                                    onUpdateGlobalStyles({ ...globalStyles, primaryColor: e.target.value })
                                }
                                className="flex-1 px-3 py-2 rounded-lg border border-[#e2e8f0] text-sm font-mono"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-[#0f172a] mb-2 block">
                            Secondary Color
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="color"
                                value={globalStyles.secondaryColor}
                                onChange={(e) =>
                                    onUpdateGlobalStyles({ ...globalStyles, secondaryColor: e.target.value })
                                }
                                className="w-12 h-10 rounded-lg border border-[#e2e8f0] cursor-pointer"
                            />
                            <input
                                type="text"
                                value={globalStyles.secondaryColor}
                                onChange={(e) =>
                                    onUpdateGlobalStyles({ ...globalStyles, secondaryColor: e.target.value })
                                }
                                className="flex-1 px-3 py-2 rounded-lg border border-[#e2e8f0] text-sm font-mono"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-[#0f172a] mb-2 block">
                            Font Family
                        </label>
                        <select
                            value={globalStyles.fontFamily}
                            onChange={(e) =>
                                onUpdateGlobalStyles({ ...globalStyles, fontFamily: e.target.value })
                            }
                            className="w-full px-3 py-2 rounded-lg border border-[#e2e8f0] text-sm"
                        >
                            <option value="Inter">Inter</option>
                            <option value="Roboto">Roboto</option>
                            <option value="Poppins">Poppins</option>
                            <option value="Montserrat">Montserrat (Recommended)</option>
                            <option value="Merriweather">Merriweather</option>
                            <option value="Open Sans">Open Sans</option>
                            <option value="Lato">Lato</option>
                        </select>
                        <p className="text-xs text-[#64748b] mt-1">
                            💡 Tip: Use Montserrat for body text and Merriweather for headings
                        </p>
                    </div>
                </div>
            </div>

            {/* Component-Specific Settings */}
            {selectedComponent ? (
                <div>
                    <h4 className="text-xs font-semibold text-[#64748b] uppercase tracking-wider mb-4">
                        {selectedComponent.type} Settings
                    </h4>
                    <div className="space-y-4">
                        {Object.entries(selectedComponent.props).map(([key, value]) => {
                            const isImageField = /image|photo|bg|background/i.test(key);

                            return (
                                <div key={key}>
                                    <label className="text-sm font-medium text-[#0f172a] mb-2 block capitalize">
                                        {key.replace(/([A-Z])/g, " $1").trim()}
                                    </label>

                                    {isImageField ? (
                                        <ImageUpload
                                            value={value as string}
                                            onChange={(url) =>
                                                onUpdateComponent(selectedComponent.id, {
                                                    [key]: url,
                                                })
                                            }
                                        />
                                    ) : typeof value === "string" ? (
                                        <input
                                            type="text"
                                            value={value}
                                            onChange={(e) =>
                                                onUpdateComponent(selectedComponent.id, {
                                                    [key]: e.target.value,
                                                })
                                            }
                                            className="w-full px-3 py-2 rounded-lg border border-[#e2e8f0] text-sm"
                                        />
                                    ) : Array.isArray(value) ? (
                                        <div className="space-y-2">
                                            {value.map((item: any, i: number) => (
                                                <div key={i} className="flex gap-2">
                                                    <input
                                                        type="text"
                                                        value={typeof item === 'string' ? item : JSON.stringify(item)}
                                                        className="flex-1 px-3 py-2 rounded-lg border border-[#e2e8f0] text-sm bg-slate-50"
                                                        readOnly
                                                    />
                                                </div>
                                            ))}
                                            <p className="text-xs text-[#64748b]">
                                                (List editing coming soon - switch to manual mode if needed)
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="text-xs text-[#64748b] bg-slate-50 p-2 rounded">
                                            Unsupported type: {typeof value}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            ) : (
                <div className="text-center py-8 text-slate-400 text-sm">
                    Select a component to edit its properties
                </div>
            )}
        </div>
    );
}
