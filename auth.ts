import Link from 'next/link';
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import dbConnect from '@/lib/db/connect';
import User from '@/lib/db/models/User';
import Organizer from '@/lib/db/models/Organizer';
import bcrypt from 'bcryptjs';


export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            id: 'customer',
            name: 'Customer Login',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                await dbConnect();
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user = await User.findOne({ email });
                    if (!user) return null;

                    const passwordsMatch = await bcrypt.compare(password, user.password);
                    if (passwordsMatch) return {
                        id: user._id.toString(),
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        // @ts-ignore
                        type: 'user'
                    };
                }

                console.log('Invalid customer credentials');
                return null;
            },
        }),
        Credentials({
            id: 'organizer',
            name: 'Organizer Login',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                await dbConnect();
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const organizer = await Organizer.findOne({ email });
                    if (!organizer) return null;

                    const passwordsMatch = await bcrypt.compare(password, organizer.password);
                    if (passwordsMatch) return {
                        id: organizer._id.toString(),
                        name: organizer.name,
                        email: organizer.email,
                        role: organizer.role,
                        // @ts-ignore
                        type: 'organizer'
                    };
                }

                console.log('Invalid organizer credentials');
                return null;
            },
        }),
    ],
});
