"use server";

import { uploadImage } from "@/lib/services/cloudinary";
import { auth } from "@/auth";

export async function uploadFile(formData: FormData) {
    try {
        const session = await auth();
        if (!session?.user) {
            return { error: "Unauthorized" };
        }

        const file = formData.get("file") as File;
        if (!file) {
            return { error: "No file provided" };
        }

        const url = await uploadImage(file);
        return { success: true, url };
    } catch (error) {
        console.error("Upload error:", error);
        return { error: "Upload failed" };
    }
}
