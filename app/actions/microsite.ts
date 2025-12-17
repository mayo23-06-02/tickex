"use server";

import { auth } from "@/auth";
import dbConnect from "@/lib/db/connect";
import Microsite from "@/lib/db/models/Microsite";
import Event from "@/lib/db/models/Event";
import { revalidatePath } from "next/cache";

export async function getMicrosite(eventId: string) {
    try {
        await dbConnect();
        const microsite = await Microsite.findOne({ eventId });
        if (!microsite) return null;
        return JSON.parse(JSON.stringify(microsite));
    } catch (error) {
        console.error("Error fetching microsite:", error);
        return null;
    }
}

export async function saveMicrosite(eventId: string, data: { pages: any[]; globalStyles: any }) {
    try {
        await dbConnect();
        const session = await auth();

        if (!session?.user?.id) {
            return { error: "Unauthorized" };
        }

        const event = await Event.findById(eventId);
        if (!event) {
            return { error: "Event not found" };
        }

        if (event.organizerId.toString() !== session.user.id) {
            return { error: "Unauthorized: You do not own this event" };
        }

        const microsite = await Microsite.findOneAndUpdate(
            { eventId },
            {
                eventId,
                pages: data.pages,
                globalStyles: data.globalStyles,
            },
            { upsert: true, new: true }
        );

        revalidatePath(`/events/${event.slug}`);
        revalidatePath(`/sites/${event.slug}`);

        return { success: true, microsite: JSON.parse(JSON.stringify(microsite)) };
    } catch (error) {
        console.error("Error saving microsite:", error);
        return { error: "Failed to save microsite" };
    }
}

export async function publishMicrosite(eventId: string) {
    try {
        await dbConnect();
        const session = await auth();

        if (!session?.user?.id) {
            return { error: "Unauthorized" };
        }

        const event = await Event.findById(eventId);
        if (!event) {
            return { error: "Event not found" };
        }

        if (event.organizerId.toString() !== session.user.id) {
            return { error: "Unauthorized" };
        }

        const microsite = await Microsite.findOneAndUpdate(
            { eventId },
            {
                isPublished: true,
                publishedAt: new Date()
            },
            { new: true }
        );

        return { success: true, url: `/sites/${event.slug || eventId}` };
    } catch (error) {
        console.error("Error publishing microsite:", error);
        return { error: "Failed to publish microsite" };
    }
}

export async function getOrganizerEvents() {
    try {
        await dbConnect();
        const session = await auth();
        if (!session?.user?.id) return [];

        const events = await Event.find({ organizerId: session.user.id })
            .select("_id title slug imageUrl startDate status")
            .sort({ createdAt: -1 });

        return JSON.parse(JSON.stringify(events));
    } catch (error) {
        console.error("Error fetching organizer events:", error);
        return [];
    }
}

export async function getMicrositeBySlug(slug: string) {
    try {
        await dbConnect();
        // first find event by slug
        const event = await Event.findOne({ slug });
        if (!event) return null;

        const microsite = await Microsite.findOne({ eventId: event._id });
        if (!microsite) return null;

        return JSON.parse(JSON.stringify({ microsite, event }));
    } catch (error) {
        console.error("Error fetching microsite by slug:", error);
        return null;
    }
}
