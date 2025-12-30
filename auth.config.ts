import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/auth/customer/login', // Redirect users here if not logged in
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
            const isOnAuth = nextUrl.pathname.startsWith('/auth') || nextUrl.pathname.startsWith('/signup-organizer');

            if (isOnDashboard) {
                if (isLoggedIn) {
                    // @ts-ignore
                    if (auth.user?.type === 'organizer') return true;
                    // Redirect customers to events page if they try to access dashboard
                    return Response.redirect(new URL('/events', nextUrl));
                }
                return false; // Redirect unauthenticated users to login page
            }
            
            // Optional: Redirect logged-in users away from auth pages
            if (isOnAuth && isLoggedIn) {
                 // @ts-ignore
                if (auth.user?.type === 'organizer') {
                     return Response.redirect(new URL('/dashboard', nextUrl));
                }
                 // @ts-ignore
                if (auth.user?.type === 'user') {
                     return Response.redirect(new URL('/events', nextUrl));
                }
            }

            return true;
        },
        jwt({ token, user }: any) {
            if (user) {
                token.role = user.role;
                token.id = user.id;
                token.type = user.type;
            }
            return token;
        },
        session({ session, token }: any) {
            if (token && session.user) {
                session.user.role = token.role;
                session.user.id = token.id;
                // @ts-ignore
                session.user.type = token.type;
            }
            return session;
        }
    },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
