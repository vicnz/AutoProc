import { withAuth, NextRequestWithAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
    function middleware(request: NextRequestWithAuth) {

        if (request.nextUrl.pathname.startsWith('/administrator') && request.nextauth.token?.role !== 'ADMIN') {
            //@ Available Only For ADMIN
            return NextResponse.rewrite(
                new URL("/auth/unauthorized", request.url)
            )
        }

        if (request.nextUrl.pathname.startsWith("/utility") && request.nextauth.token?.role !== 'TRACKER' && request.nextauth.token?.role !== 'CHECKER') {
            //@ Available Only For TRACKER & CHECKER USER
            return NextResponse.rewrite(
                new URL("/auth/unauthorized", request.url)
            )
        }

        if (request.nextUrl.pathname.startsWith("/users") && request.nextauth.token?.role !== 'USER') {
            //@ Available Only For USERS ONLY
            return NextResponse.rewrite(
                new URL("/auth/unauthorized", request.url)
            )
        }

        return NextResponse.next()
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token
        }
    }
)



export const config = {
    matcher: [
        "/administrator/:path*",
        "/utility/:path*",
        "/users/:path*"
    ],
}