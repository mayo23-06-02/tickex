"use server";

import { auth } from "@/auth";
import dbConnect from "@/lib/db/connect";
import Event from "@/lib/db/models/Event";

export async function checkOrganizerHasEvents(): Promise<boolean> {
    const session = await auth();
    if (!session?.user?.id) return false;

    try {
        await dbConnect();
        const count = await Event.countDocuments({ organizerId: session.user.id });
        return count > 0;
    } catch (error) {
        console.error("Failed to check organizer events:", error);
        return false;
    }
}
