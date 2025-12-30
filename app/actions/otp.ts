"use server";

import dbConnect from "@/lib/db/connect";
import User from "@/lib/db/models/User";
import Organizer from "@/lib/db/models/Organizer";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function sendOtp(email: string, type: 'user' | 'organizer') {
    try {
        await dbConnect();
        const otp = generateOtp();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        const Model = type === 'organizer' ? Organizer : User;
        
        // Find user first to make sure they exist, or if this is registration verification?
        // Prompt says "confirm auth via otp". Usually for login or registration.
        // Assuming this is for verifying email during registration/login.
        
        let entity = await Model.findOne({ email });

        // If entity not found in login flow, we can't send OTP unless it's registration.
        // But for registration, we might create the user first as unverified.
        
        if (!entity) {
            // For security, maybe don't reveal? But for now let's return error.
            // Or if this is called AFTER registration creation (which sets isVerified: false)
            return { error: "User not found" };
        }

        entity.otp = { code: otp, expiresAt };
        await entity.save();

        const { data, error } = await resend.emails.send({
            from: "Tickex <onboarding@resend.dev>", // specific domain needed? Using default for test.
            to: [email],
            subject: "Your Verification Code",
            html: `<p>Your verification code is: <strong>${otp}</strong></p><p>It expires in 10 minutes.</p>`,
        });

        if (error) {
            console.error(error);
            return { error: "Failed to send email" };
        }

        return { success: true };
    } catch (error) {
        console.error(error);
        return { error: "Something went wrong" };
    }
}

export async function verifyOtp(email: string, code: string, type: 'user' | 'organizer') {
    try {
        await dbConnect();
        const Model = type === 'organizer' ? Organizer : User;
        const entity = await Model.findOne({ email });

        if (!entity) {
            return { error: "User not found" };
        }

        if (!entity.otp || !entity.otp.code) {
             return { error: "No OTP found" };
        }

        if (entity.otp.code !== code) {
            return { error: "Invalid OTP" };
        }

        if (new Date() > entity.otp.expiresAt) {
            return { error: "OTP expired" };
        }

        // Verify user
        entity.isVerified = true;
        entity.otp = undefined;
        await entity.save();

        return { success: true };
    } catch (error) {
         console.error(error);
         return { error: "Something went wrong" };
    }
}
