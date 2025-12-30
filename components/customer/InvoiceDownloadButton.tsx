"use client";

import React, { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import { InvoicePDF } from "./InvoiceTemplate";
import bwipjs from "bwip-js";
import { Download, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface InvoiceDownloadButtonProps {
  customer: {
    name: string;
    email: string;
  };
  purchase: {
    id: string;
    event: string;
    date: string;
    amount: number;
    tickets: number;
    items?: {
      type: string;
      quantity: number;
      price: number;
    }[];
  };
}

export function InvoiceDownloadButton({
  customer,
  purchase,
}: InvoiceDownloadButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateInvoice = async () => {
    setIsGenerating(true);
    try {
      // 1. Generate Barcode as Data URL
      const canvas = document.createElement("canvas");
      bwipjs.toCanvas(canvas, {
        bcid: "code128", // Barcode type
        text: purchase.id, // Text to encode
        scale: 3, // 3x scaling factor
        height: 10, // Bar height, in millimeters
        includetext: true, // Show human-readable text
        textxalign: "center", // Always good to set this
      });
      const barcodeUrl = canvas.toDataURL("image/png");

      // 2. Fetch Logo and convert to PNG for PDF compatibility (gradients/fonts)
      const logoRes = await fetch("/logo.svg");
      const logoText = await logoRes.text();
      const logoBlob = new Blob([logoText], { type: "image/svg+xml" });
      const logoSvgUrl = URL.createObjectURL(logoBlob);

      const logoImg = new Image();
      const logoUrl = await new Promise<string>((resolve) => {
        logoImg.onload = () => {
          const canvas = document.createElement("canvas");
          // Scale up for high quality
          const scale = 2;
          canvas.width = logoImg.width * scale;
          canvas.height = logoImg.height * scale;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(logoImg, 0, 0, canvas.width, canvas.height);
            resolve(canvas.toDataURL("image/png"));
          } else {
            resolve(logoSvgUrl);
          }
        };
        logoImg.onerror = () => resolve(logoSvgUrl);
        logoImg.src = logoSvgUrl;
      });

      // 3. Prepare Order Data
      const items =
        purchase.items && purchase.items.length > 0
          ? purchase.items.map((item) => ({
              description: `${purchase.event} (${item.type})`,
              quantity: item.quantity,
              unitPrice: item.price,
              total: item.price * item.quantity,
            }))
          : Array.from({ length: purchase.tickets }).map((_, i) => ({
              description: `${purchase.event} - Ticket ${i + 1}`,
              quantity: 1,
              unitPrice: purchase.amount / purchase.tickets,
              total: purchase.amount / purchase.tickets,
            }));

      // 4. Generate PDF
      const blob = await pdf(
        <InvoicePDF
          customer={customer}
          order={{
            id: purchase.id,
            date: purchase.date,
            totalAmount: purchase.amount,
            items: items,
          }}
          barcodeUrl={barcodeUrl}
          logoUrl={logoUrl}
        />
      ).toBlob();

      // 5. Trigger Download
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Invoice-${purchase.id}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success("Invoice downloaded successfully");
    } catch (error) {
      console.error("PDF generation failed:", error);
      toast.error("Failed to generate invoice");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      onClick={generateInvoice}
      disabled={isGenerating}
      className="flex-1 py-1.5 text-xs font-semibold text-[#64748b] hover:text-[#0f172a] hover:bg-slate-50 rounded-lg transition-colors text-center flex items-center justify-center gap-2"
    >
      {isGenerating ? (
        <>
          <Loader2 className="w-3 h-3 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Download className="w-3 h-3" />
          Download Invoice
        </>
      )}
    </button>
  );
}
