import type { NextAuthOptions } from 'next-auth'
import CredentialProvider from 'next-auth/providers/credentials'
import db from '@lib/db'
import { compare } from 'bcryptjs'

export const options: NextAuthOptions = {
    providers: [
        CredentialProvider({
            name: "Login With Your Username & Password",
            credentials: {
                username: {
                    label: "username or email",
                    placeholder: "appleseed123",
                    type: 'text'
                },
                password: {
                    label: "password",
                    placeholder: "password",
                    type: 'password'
                }
            },
            async authorize(credentials) {
                const response = await db.users.findFirst({
                    where: {
                        OR: [
                            { username: credentials?.username },
                            { email: credentials?.username }
                        ],
                        isDeleted: false
                    },
                })

                if (response) {
                    const isPasswordValid = await compare(credentials?.password as string, response.password)
                    if (isPasswordValid) {
                        return { username: response.username, userType: response.userType, id: response.id }
                    } else {
                        throw new Error("Password Invalid")
                    }
                }
                return null;
            }
        })
    ],
}