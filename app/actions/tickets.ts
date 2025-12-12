"use server";

import { auth } from "@/auth";
import dbConnect from "@/lib/db/connect";
import TicketType from "@/lib/db/models/TicketType";
import Event from "@/lib/db/models/Event";
import { revalidatePath } from "next/cache";

export async function upsertTicketType(data: any) {
    const session = await auth();
    if (!session?.user || session.user.role !== "organizer") {
        return { error: "Unauthorized" };
    }

    if (!data.eventId) {
        return { error: "Event ID is required" };
    }

    try {
        await dbConnect();

        // Verify organizer owns the event
        const event = await Event.findOne({
            _id: data.eventId,
            organizerId: session.user.id
        });

        if (!event) {
            return { error: "Event not found or unauthorized" };
        }

        const ticketData = {
            event: data.eventId,
            name: data.ticketType, // Mapping client 'ticketType' to model 'name'
            price: data.price,
            quantityTotal: data.quantity,
            description: data.description,
            saleStart: data.saleStart,
            saleEnd: data.saleEnd,

            // Advanced Config
            perks: data.perks,
            accessRules: data.accessRules,
            designConfig: data.designConfig,
            transferSettings: data.transferSettings,
        };

        let result;
        if (data.id && data.id !== 'new') {
            // Update existing
            result = await TicketType.findByIdAndUpdate(
                data.id,
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
