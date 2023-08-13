import { NextRequest, NextResponse } from "next/server";
import { pb_server } from "../pb/server.config";

export default function ClientMiddlware({ request, response }: { request: NextRequest, response: NextResponse }) {
    if (pb_server.authStore.model?.type === 'client' && request.nextUrl.pathname.startsWith("/auth")) {
        const next_url = request.headers.get("next-url") as string
        if (next_url) {
            const redirect_to = new URL(next_url, request.url);
            return NextResponse.redirect(redirect_to);
        } else {
            const redirect_to = new URL(`/clients`, request.url);
            return NextResponse.redirect(redirect_to);
        }
    }

    if (pb_server.authStore.model?.type === 'client' && !request.nextUrl.pathname.startsWith("/clients")) {
        return NextResponse.redirect(new URL('/clients', request.url))
    }
}