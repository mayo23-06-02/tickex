"use client";

import { useState } from "react";
import DashboardLayout from "@/components/shared/layout/DashboardLayout";
import { ChannelList } from "@/components/communications/ChannelList";
import { CampaignHub } from "@/components/communications/CampaignHub";
import { CampaignAnalytics } from "@/components/communications/CampaignAnalytics";
import { CreateCampaignModal } from "@/components/communications/CreateCampaignModal";

export default function CommunicationsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState("email");

  const handleCreateCampaign = (channelId?: string) => {
    if (channelId) {
      setSelectedChannel(channelId);
    }
    setIsModalOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="flex h-[calc(100vh-140px)] overflow-hidden bg-white rounded-xl border border-[#e2e8f0] -m-8">
        <ChannelList onCreateCampaign={handleCreateCampaign} />
        <CampaignHub onCreateCampaign={() => handleCreateCampaign()} />
        <CampaignAnalytics />
      </div>

      <CreateCampaignModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        channelType={selectedChannel}
      />
    </DashboardLayout>
  );
}
