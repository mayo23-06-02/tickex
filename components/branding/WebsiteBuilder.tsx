"use client";

import { useState, useEffect, useRef } from "react";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { ComponentLibrary } from "./ComponentLibrary";
import { BuilderCanvas } from "./BuilderCanvas";
import { DesignPanel } from "./DesignPanel";
import { WebsiteComponent } from "./types";

interface WebsiteBuilderProps {
    previewMode: "desktop" | "mobile";
    showCode: boolean;
    components: WebsiteComponent[];
    onUpdateComponents: (components: WebsiteComponent[]) => void;
    globalStyles: any;
    onUpdateGlobalStyles: (styles: any) => void;
}

const defaultComponents: WebsiteComponent[] = [
    {
        id: "hero-1",
        type: "hero",
        props: {
            title: "Summer Music Festival 2025",
            subtitle: "Join us for an unforgettable experience",
            backgroundImage: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1200",
            ctaText: "Get Tickets",
            ctaLink: "#tickets",
        },
    },
    {
        id: "about-1",
        type: "about",
        props: {
            title: "About The Festival",
            description: "Experience three days of incredible music, art, and culture at the most anticipated festival of the year.",
            features: ["3 Days of Music", "50+ Artists", "Multiple Stages", "Food & Drinks"],
        },
    },
];

export function WebsiteBuilder({
    previewMode,
    showCode,
    components: externalComponents,
    onUpdateComponents,
    globalStyles,
    onUpdateGlobalStyles
}: WebsiteBuilderProps) {
    // Use external components if provided and not empty, otherwise use defaults
    const initialComponents = externalComponents.length > 0 ? externalComponents : defaultComponents;
    const [components, setComponents] = useState<WebsiteComponent[]>(initialComponents);
    const [selectedComponent, setSelectedComponent] = useState<string | null>(null);

    const isInitialMount = useRef(true);

    // Sync components to parent whenever they change (but skip initial mount)
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }
        onUpdateComponents(components);
    }, [components, onUpdateComponents]);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            setComponents((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    const handleAddComponent = (type: WebsiteComponent["type"]) => {
        const newComponent: WebsiteComponent = {
            id: `${type}-${Date.now()}`,
            type,
            props: getDefaultProps(type),
        };
        setComponents([...components, newComponent]);
    };

    const handleDeleteComponent = (id: string) => {
        setComponents(components.filter((c) => c.id !== id));
        if (selectedComponent === id) {
            setSelectedComponent(null);
        }
    };

    const handleUpdateComponent = (id: string, props: Record<string, any>) => {
        setComponents(
            components.map((c) => (c.id === id ? { ...c, props: { ...c.props, ...props } } : c))
        );
    };

    return (
        <div className="grid grid-cols-12 gap-6 h-[calc(100vh-280px)]">
            {/* Component Library - Left Sidebar */}
            <div className="col-span-2">
                <ComponentLibrary onAddComponent={handleAddComponent} />
            </div>

            {/* Canvas - Center */}
            <div className="col-span-7">
                <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={components.map((c) => c.id)} strategy={verticalListSortingStrategy}>
                        <BuilderCanvas
                            components={components}
                            selectedComponent={selectedComponent}
                            onSelectComponent={setSelectedComponent}
                            onDeleteComponent={handleDeleteComponent}
                            previewMode={previewMode}
                            showCode={showCode}
                            globalStyles={globalStyles}
                        />
                    </SortableContext>
                </DndContext>
            </div>

            {/* Design Panel - Right Sidebar */}
            <div className="col-span-3">
                <DesignPanel
                    selectedComponent={components.find((c) => c.id === selectedComponent)}
                    onUpdateComponent={handleUpdateComponent}
                    globalStyles={globalStyles}
                    onUpdateGlobalStyles={onUpdateGlobalStyles}
                />
            </div>
        </div>
    );
}

function getDefaultProps(type: WebsiteComponent["type"]): Record<string, any> {
    switch (type) {
        case "hero":
            return {
                title: "Your Event Title",
                subtitle: "Event subtitle goes here",
                backgroundImage: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1200",
                ctaText: "Get Tickets",
                ctaLink: "#tickets",
            };
        case "about":
            return {
                title: "About",
                description: "Tell your story...",
                features: [],
            };
        case "lineup":
            return {
                title: "Lineup",
                artists: [],
            };
        case "tickets":
            return {
                title: "Tickets",
                tiers: [],
            };
        case "gallery":
            return {
                title: "Gallery",
                images: [],
            };
        case "faq":
            return {
                title: "FAQ",
                questions: [],
            };
        case "footer":
            return {
                copyright: "© 2025 Your Event",
                socialLinks: [],
            };
        default:
            return {};
    }
}
