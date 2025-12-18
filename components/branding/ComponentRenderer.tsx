"use client";

import { useRef } from "react";
import { WebsiteComponent } from "./types";

interface ComponentRendererProps {
    component: WebsiteComponent;
    globalStyles: {
        primaryColor: string;
        secondaryColor: string;
        fontFamily: string;
        backgroundColor: string;
    };
}

export function ComponentRenderer({ component, globalStyles }: ComponentRendererProps) {
    // Use Merriweather for headings if Montserrat is selected for body
    const headingFont = globalStyles.fontFamily === "Montserrat" ? "Merriweather" : globalStyles.fontFamily;
    const bodyFont = globalStyles.fontFamily;

    const commonStyle = {
        fontFamily: bodyFont,
    };

    const headingStyle = {
        fontFamily: headingFont,
    };

    const lineupRef = useRef<HTMLDivElement | null>(null);

    switch (component.type) {
        case "hero":
            return (
                <div
                    className="relative min-h-[400px] flex items-center justify-center text-center px-8 py-16"
                    style={{
                        backgroundImage: component.props.backgroundImage
                            ? `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${component.props.backgroundImage})`
                            : `linear-gradient(135deg, ${globalStyles.primaryColor}, ${globalStyles.secondaryColor})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        ...commonStyle,
                    }}
                >
                    <div className="max-w-4xl">
                        <h1
                            className="text-5xl font-bold text-white mb-4"
                            style={commonStyle}
                        >
                            {component.props.title || "Your Event Title"}
                        </h1>
                        <p className="text-xl text-white/90 mb-8">
                            {component.props.subtitle || "Event subtitle goes here"}
                        </p>
                        <button
                            className="px-8 py-3 rounded-lg text-white font-bold text-lg hover:opacity-90 transition-opacity"
                            style={{ backgroundColor: globalStyles.primaryColor }}
                        >
                            {component.props.ctaText || "Get Tickets"}
                        </button>
                    </div>
                </div>
            );

        case "about":
            return (
                <div className="py-16 px-8 bg-muted/30">
                    <div className="max-w-4xl mx-auto">
                        <h2
                            className="text-4xl font-bold mb-6"
                            style={{ color: globalStyles.secondaryColor, ...commonStyle }}
                        >
                            {component.props.title || "About"}
                        </h2>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            {component.props.description || "Tell your story here..."}
                        </p>
                    </div>
                </div>
            );

        case "lineup":
            return (
                <div className="py-16 px-8 bg-card">
                    <div className="max-w-6xl mx-auto">
                        <h2
                            className="text-4xl font-bold text-center mb-6"
                            style={{ color: globalStyles.secondaryColor, ...commonStyle }}
                        >
                            {component.props.title || "Lineup"}
                        </h2>
                        <div className="relative">
                            <div
                                ref={lineupRef}
                                className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4"
                            >
                                {(component.props.artists && component.props.artists.length > 0
                                    ? component.props.artists
                                    : [
                                        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600",
                                        "https://images.unsplash.com/photo-1485579149621-3123dd979885?w=600",
                                        "https://images.unsplash.com/photo-1507878866276-a9473f0b3345?w=600",
                                    ]
                                ).map((item: any, idx: number) => {
                                    const imageUrl = typeof item === "string" ? item : item?.image || "";
                                    const name = typeof item === "string" ? `Artist ${idx + 1}` : item?.name || `Artist ${idx + 1}`;
                                    return (
                                        <div
                                            key={idx}
                                            className="min-w-[240px] snap-start p-6 rounded-xl shadow-lg bg-white"
                                            style={{ borderTop: `4px solid ${globalStyles.primaryColor}` }}
                                        >
                                            <div className="w-full h-40 rounded-lg overflow-hidden mb-4 bg-slate-100">
                                                {imageUrl ? (
                                                    <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                                                )}
                                            </div>
                                            <h3 className="text-xl font-bold mb-2">{name}</h3>
                                            <p className="text-gray-600">Performance time TBA</p>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="flex justify-between mt-2">
                                <button
                                    onClick={() => lineupRef.current?.scrollBy({ left: -300, behavior: "smooth" })}
                                    className="px-3 py-2 rounded-lg border border-[#e2e8f0] bg-white text-sm"
                                >
                                    Prev
                                </button>
                                <button
                                    onClick={() => lineupRef.current?.scrollBy({ left: 300, behavior: "smooth" })}
                                    className="px-3 py-2 rounded-lg border border-[#e2e8f0] bg-white text-sm"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );

        case "tickets":
            return (
                <div className="py-16 px-8 bg-muted/30">
                    <div className="max-w-6xl mx-auto">
                        <h2
                            className="text-4xl font-bold text-center mb-12"
                            style={{ color: globalStyles.secondaryColor, ...commonStyle }}
                        >
                            {component.props.title || "Tickets"}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {["General", "VIP", "Early Bird"].map((tier, i) => (
                                <div
                                    key={tier}
                                    className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
                                    style={{
                                        border: i === 1 ? `2px solid ${globalStyles.primaryColor}` : "2px solid #e5e7eb",
                                    }}
                                >
                                    {i === 1 && (
                                        <div
                                            className="inline-block px-3 py-1 rounded-full text-xs font-bold text-white mb-4"
                                            style={{ backgroundColor: globalStyles.primaryColor }}
                                        >
                                            POPULAR
                                        </div>
                                    )}
                                    <h3 className="text-2xl font-bold mb-2">{tier}</h3>
                                    <p
                                        className="text-4xl font-bold mb-6"
                                        style={{ color: globalStyles.primaryColor }}
                                    >
                                        ${(i + 1) * 50}
                                    </p>
                                    <button
                                        className="w-full py-3 rounded-lg font-bold transition-colors"
                                        style={{
                                            backgroundColor: i === 1 ? globalStyles.primaryColor : "white",
                                            color: i === 1 ? "white" : globalStyles.primaryColor,
                                            border: `2px solid ${globalStyles.primaryColor}`,
                                        }}
                                    >
                                        Buy Now
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            );

        case "gallery":
            return (
                <div className="py-16 px-8 bg-card">
                    <div className="max-w-6xl mx-auto">
                        <h2
                            className="text-4xl font-bold text-center mb-6"
                            style={{ color: globalStyles.secondaryColor, ...commonStyle }}
                        >
                            {component.props.title || "Gallery"}
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {(component.props.images && component.props.images.length > 0
                                ? component.props.images
                                : [
                                    "https://images.unsplash.com/photo-1546500840-ae38253aba9b?w=600",
                                    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600",
                                    "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=600",
                                    "https://images.unsplash.com/photo-1509099836639-7f3cda0ea89b?w=600",
                                ]
                            ).map((url: string, idx: number) => (
                                <div key={idx} className="aspect-square rounded-lg overflow-hidden bg-slate-100">
                                    {url ? (
                                        <img src={url} alt="" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            );

        case "faq":
            return (
                <div className="py-16 px-8 bg-muted/30">
                    <div className="max-w-3xl mx-auto">
                        <h2
                            className="text-4xl font-bold text-center mb-12"
                            style={{ color: globalStyles.secondaryColor, ...commonStyle }}
                        >
                            {component.props.title || "FAQ"}
                        </h2>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="bg-white p-6 rounded-lg shadow">
                                    <h3 className="font-bold mb-2">Question {i}?</h3>
                                    <p className="text-gray-600">Answer to question {i} goes here.</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            );

        case "footer":
            return (
                <div
                    className="py-12 px-8 text-center"
                    style={{ backgroundColor: globalStyles.secondaryColor }}
                >
                    <p className="text-white/80">
                        {component.props.copyright || "© 2025 Your Event. All rights reserved."}
                    </p>
                </div>
            );

        default:
            return null;
    }
}
