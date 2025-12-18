"use server";

import { auth } from "@/auth";
import dbConnect from "@/lib/db/connect";
import TicketType from "@/lib/db/models/TicketType";
import Event from "@/lib/db/models/Event";
import { revalidatePath } from "next/cache";

import { uploadImage } from "@/lib/services/cloudinary";

export async function upsertTicketType(formData: FormData) {
    const session = await auth();
    if (!session?.user || session.user.role !== "organizer") {
        return { error: "Unauthorized" };
    }

    const eventId = formData.get("eventId") as string;
    if (!eventId) {
        return { error: "Event ID is required" };
    }

    try {
        await dbConnect();

        // Verify organizer owns the event
        const event = await Event.findOne({
            _id: eventId,
            organizerId: session.user.id
        });

        if (!event) {
            return { error: "Event not found or unauthorized" };
        }

        // Handle Image Upload
        let ticketDesignUrl = formData.get("ticketDesignUrl") as string;
        const designFile = formData.get("designFile") as File;
        
        if (designFile && designFile.size > 0) {
            ticketDesignUrl = await uploadImage(designFile);
        }

        const ticketData: any = {
            event: eventId,
            name: formData.get("ticketType") as string,
            price: Number(formData.get("price")),
            quantityTotal: Number(formData.get("quantity")),
            description: formData.get("description") as string,
            ticketDesignUrl,
        };

        // Handle optional dates
        const saleStart = formData.get("saleStart") as string;
        if (saleStart) ticketData.saleStart = saleStart;
        
        const saleEnd = formData.get("saleEnd") as string;
        if (saleEnd) ticketData.saleEnd = saleEnd;

        // Parse JSON fields
        const perksJson = formData.get("perks") as string;
        if (perksJson) ticketData.perks = JSON.parse(perksJson);

        const accessRulesJson = formData.get("accessRules") as string;
        if (accessRulesJson) ticketData.accessRules = JSON.parse(accessRulesJson);

        const designConfigJson = formData.get("designConfig") as string;
        if (designConfigJson) ticketData.designConfig = JSON.parse(designConfigJson);

        const transferSettingsJson = formData.get("transferSettings") as string;
        if (transferSettingsJson) ticketData.transferSettings = JSON.parse(transferSettingsJson);

        const id = formData.get("id") as string;
        let result;
        if (id && id !== 'new') {
            // Update existing
            result = await TicketType.findByIdAndUpdate(
                id,
                { $set: ticketData },
                { new: true }
            );
        } else {
            // Create new
            result = await TicketType.create(ticketData);
        }

        revalidatePath("/tickets");
        return { success: true, id: result._id.toString() };
    } catch (error: any) {
        console.error("Failed to save ticket:", error);
        return { error: error.message || "Failed to save ticket" };
    }
}

export async function deleteTicketType(ticketId: string) {
    const session = await auth();
    if (!session?.user || session.user.role !== "organizer") {
        return { error: "Unauthorized" };
    }

    try {
        await dbConnect();

        // Find ticket to ensure it belongs to an event owned by the organizer
        const ticket = await TicketType.findById(ticketId).populate('event');

        if (!ticket) {
            return { error: "Ticket not found" };
        }

        // Check ownership via the event
        if (ticket.event.organizerId.toString() !== session.user.id) {
            return { error: "Unauthorized to delete this ticket" };
        }

        // Check if tickets have been sold
        if (ticket.quantitySold > 0) {
            return { error: "Cannot delete ticket type that has sales. Archive it instead." };
        }

        await TicketType.findByIdAndDelete(ticketId);
        revalidatePath("/tickets");
        return { success: true };
    } catch (error: any) {
        return { error: error.message || "Failed to delete ticket" };
    }
}
