"use client";

import { useState } from "react";
import DashboardLayout from "@/components/shared/layout/DashboardLayout";
import { GalleryHeader } from "@/components/gallery/GalleryHeader";
import { GalleryFilters } from "@/components/gallery/GalleryFilters";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { UploadModal } from "@/components/gallery/UploadModal";

export interface GalleryItem {
  id: string;
  name: string;
  size: number;
  type: "image" | "video" | "document";
  url: string;
  uploadedAt: Date;
  thumbnail?: string;
}

const mockGalleryItems: GalleryItem[] = [
  {
    id: "1",
    name: "Image 1.jpg",
    size: 2.4,
    type: "image",
    url: "/gallery/1.jpg",
    uploadedAt: new Date("2025-02-15"),
  },
  {
    id: "2",
    name: "Image 2.jpg",
    size: 2.4,
    type: "image",
    url: "/gallery/2.jpg",
    uploadedAt: new Date("2025-02-14"),
  },
  {
    id: "3",
    name: "Image 3.jpg",
    size: 2.4,
    type: "image",
    url: "/gallery/3.jpg",
    uploadedAt: new Date("2025-02-13"),
  },
  {
    id: "4",
    name: "Image 4.jpg",
    size: 2.4,
    type: "image",
    url: "/gallery/4.jpg",
    uploadedAt: new Date("2025-02-12"),
  },
  {
    id: "5",
    name: "Promo Video.mp4",
    size: 15.2,
    type: "video",
    url: "/gallery/video1.mp4",
    uploadedAt: new Date("2025-02-11"),
  },
  {
    id: "6",
    name: "Event Poster.jpg",
    size: 3.1,
    type: "image",
    url: "/gallery/6.jpg",
    uploadedAt: new Date("2025-02-10"),
  },
  {
    id: "7",
    name: "Contract.pdf",
    size: 0.8,
    type: "document",
    url: "/gallery/contract.pdf",
    uploadedAt: new Date("2025-02-09"),
  },
  {
    id: "8",
    name: "Lineup Graphic.jpg",
    size: 4.2,
    type: "image",
    url: "/gallery/8.jpg",
    uploadedAt: new Date("2025-02-08"),
  },
];

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>(mockGalleryItems);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filterType, setFilterType] = useState<
    "all" | "image" | "video" | "document"
  >("all");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  const filteredItems = items.filter((item) =>
    filterType === "all" ? true : item.type === filterType
  );

  const totalStorage = items.reduce((acc, item) => acc + item.size, 0);

  const handleUpload = (files: File[]) => {
    const newItems: GalleryItem[] = files.map((file, index) => ({
      id: Date.now().toString() + index,
      name: file.name,
      size: file.size / (1024 * 1024), // Convert to MB
      type: file.type.startsWith("image/")
        ? "image"
        : file.type.startsWith("video/")
        ? "video"
        : "document",
      url: URL.createObjectURL(file),
      uploadedAt: new Date(),
    }));

    setItems([...newItems, ...items]);
    setIsUploadModalOpen(false);
  };

  const handleDelete = (ids: string[]) => {
    setItems(items.filter((item) => !ids.includes(item.id)));
    setSelectedItems(new Set());
  };

  const toggleSelection = (id: string) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedItems(newSelected);
  };

  return (
    <DashboardLayout>
      <GalleryHeader
        onUploadClick={() => setIsUploadModalOpen(true)}
        totalStorage={totalStorage}
      />

      <GalleryFilters
        viewMode={viewMode}
        setViewMode={setViewMode}
        filterType={filterType}
        setFilterType={setFilterType}
        selectedCount={selectedItems.size}
        onDeleteSelected={() => handleDelete(Array.from(selectedItems))}
      />

      <GalleryGrid
        items={filteredItems}
        viewMode={viewMode}
        selectedItems={selectedItems}
        onToggleSelection={toggleSelection}
        onDelete={handleDelete}
      />

      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleUpload}
      />
    </DashboardLayout>
  );
}
