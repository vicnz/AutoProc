import type { NextAuthOptions, PagesOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from "./index";

const Pages: PagesOptions = {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
    verifyRequest: "", //* EMAIL VERIFICATION : AutoProc 2
    newUser: "", //*
};

export const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username or Email",
                    placeholder: "appleseed123",
                    type: "text",
                    name: "username",
                },
                password: {
                    name: "password",
                    label: "Password",
                    placeholder: "password",
                    type: "password",
                },
            },
            async authorize(credentials) {
                const result = await loginUser({
                    username: credentials?.username as string,
                    password: credentials?.password as string,
                });
                return result;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) token.role = user.role;
            return token;
        },
        async session({ token, session }) {
            if (session?.user) session.user.role = token.role;
            return session;
        },
    },
    pages: Pages,
};
