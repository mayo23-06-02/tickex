"use server";

import dbConnect from "@/lib/db/connect";
import User from "@/lib/db/models/User";
import bcrypt from "bcryptjs";
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

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
        });

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

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
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
