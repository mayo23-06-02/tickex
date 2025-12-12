"use server";

import dbConnect from "@/lib/db/connect";
import Event from "@/lib/db/models/Event";
import TicketType from "@/lib/db/models/TicketType";
import { uploadImage } from "@/lib/services/cloudinary";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function createEvent(formData: FormData) {
    try {
        const session = await auth();
        if (!session || !session.user || session.user.role !== "organizer") {
            // For demo purposes, we might allow any user or handle this carefully
            if (!session?.user) return { error: "Unauthorized" };
        }

        await dbConnect();

        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const locationName = formData.get("locationName") as string;
        const locationAddress = formData.get("locationAddress") as string;
        const startDate = formData.get("startDate") as string;
        const endDate = formData.get("endDate") as string;
        const category = formData.get("category") as string;

        // Image Upload
        let imageUrl = "";
        const imageFile = formData.get("image") as File;
        if (imageFile && imageFile.size > 0) {
            imageUrl = await uploadImage(imageFile);
        } else {
            // Default placeholders based on category could go here
            imageUrl = "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1200";
        }

        // Create Event
        const newEvent = await Event.create({
            organizerId: session?.user.id,
            title,
            description,
            location: {
                name: locationName,
                address: locationAddress,
            },
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            imageUrl,
            category,
            status: "published", // Direct publish for now
        });

        // Handle Tickets (Assuming they are sent as JSON string in 'tickets' field)
        const ticketsJson = formData.get("tickets") as string;
        if (ticketsJson) {
            const tickets = JSON.parse(ticketsJson);

            // Process each ticket and upload designs if present
            const ticketDocs = await Promise.all(tickets.map(async (t: any, index: number) => {
                let ticketDesignUrl = '';

                // Check if there's a design file for this ticket
                const designFile = formData.get(`ticketDesign_${index}`) as File;
                if (designFile && designFile.size > 0) {
                    try {
                        ticketDesignUrl = await uploadImage(designFile);
                    } catch (error) {
                        console.error(`Failed to upload ticket design for ${t.name}:`, error);
                    }
                }

                return {
                    event: newEvent._id,
                    name: t.name,
                    price: Number(t.price),
                    quantityTotal: Number(t.quantity),
                    description: t.description || '',
                    ticketDesignUrl: ticketDesignUrl || undefined
                };
            }));

            await TicketType.insertMany(ticketDocs);
        }

        revalidatePath("/dashboard");
        revalidatePath("/events");
        revalidatePath("/"); // Revalidate landing page to show new event
        return { success: true, eventId: newEvent._id.toString() };

    } catch (error: any) {
        console.error("Create Event Error:", error);
        return { error: error.message || "Failed to create event" };
    }
}
