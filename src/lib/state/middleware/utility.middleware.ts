import { pb_server } from '@lib/state/pb/server.config'
import { NextRequest, NextResponse } from 'next/server';

export default function UtilityMiddleware({ request, response }: { request: NextRequest, response: NextResponse }) {
    // auth model is Valid and Request for /auth redirect to /admin
    if (pb_server.authStore.model?.type === 'util' && request.nextUrl.pathname.startsWith("/auth")) {
        const next_url = request.headers.get("next-url") as string
        if (next_url) {
            const redirect_to = new URL(next_url, request.url);
            return NextResponse.redirect(redirect_to);
        } else {
            const redirect_to = new URL(`/util`, request.url);
            return NextResponse.redirect(redirect_to);
        }
    }

    if (pb_server.authStore.model?.type === 'util' && !request.nextUrl.pathname.startsWith("/util")) {
        return NextResponse.redirect(new URL('/util', request.url))
    }
}