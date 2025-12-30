"use server";

import dbConnect from "@/lib/db/connect";
import User from "@/lib/db/models/User";
import Organizer from "@/lib/db/models/Organizer";
import bcrypt from "bcryptjs";
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { sendOtp } from "@/app/actions/otp";

export async function registerUser(prevState: any, formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const role = (formData.get("role") as string) || "customer";

    if (!name || !email || !password) {
        return { error: "Please provide all required fields" };
    }

    try {
        await dbConnect();

        // Check if user already exists
        const userExists = await User.findOne({ email });

        if (userExists) {
            return { error: "User already exists" };
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            isVerified: false
        });

        // Send OTP
        await sendOtp(email, 'user');

        // Return serializable object (exclude password)
        return {
            success: true,
            user: {
                _id: user._id.toString(),
                name: user.name,
                email: user.email,
                role: user.role,
            },
        };
    } catch (error: any) {
        console.error("Registration Error:", error);
        return { error: error.message || "Something went wrong" };
    }
}


export async function registerOrganizer(prevState: any, formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const organizationName = formData.get("organizationName") as string;

    if (!name || !email || !password) {
        return { error: "Please provide all required fields" };
    }

    try {
        await dbConnect();
        
        // Check if organizer already exists
        const orgExists = await Organizer.findOne({ email });
        if (orgExists) {
            return { error: "Organizer already exists" };
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create organizer
        const organizer = await Organizer.create({
            name,
            email,
            password: hashedPassword,
            organizationName,
            role: 'owner', // Default to owner
            isVerified: false
        });

        // Send OTP
        await sendOtp(email, 'organizer');

        return {
            success: true,
            user: {
                _id: organizer._id.toString(),
                name: organizer.name,
                email: organizer.email,
                role: organizer.role,
                type: 'organizer'
            },
        };
    } catch (error: any) {
        console.error("Registration Error:", error);
        return { error: error.message || "Something went wrong" };
    }
}

export async function authenticateCustomer(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        const data = Object.fromEntries(formData);
        await signIn('customer', {
            ...data,
            redirectTo: '/events'
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}

export async function authenticateOrganizer(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        const data = Object.fromEntries(formData);
        await signIn('organizer', {
            ...data,
            redirectTo: '/dashboard'
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}
