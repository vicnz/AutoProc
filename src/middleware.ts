import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getNextjsCookie } from "@lib/state/utils/server.cookies";
import { pb_server } from '@lib/state/pb/server.config'
import AdminMiddleWare from '@/lib/state/middleware/admin.middleware'
import clientsMiddleware from "@/lib/state/middleware/clients.middleware";

const middlewares = [AdminMiddleWare, clientsMiddleware]

export async function middleware(request: NextRequest) {
    const response = NextResponse.next();
    const request_cookie = request.cookies.get("pb_auth")
    const cookie = await getNextjsCookie(request_cookie)

    //!DEBUG
    try {
        pb_server.authStore.loadFromCookie(cookie)
    } catch (error) {
        pb_server.authStore.clear();
        response.headers.set(
            "set-cookie",
            pb_server.authStore.exportToCookie({ httpOnly: false })
        );
    }

    //!DEBUG
    try {
        // get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
        pb_server.authStore.isValid
            && (await pb_server.collection('clients').authRefresh());
    } catch (err) {
        // clear the auth store on failed refresh
        pb_server.authStore.clear();
        response.headers.set(
            "set-cookie",
            pb_server.authStore.exportToCookie({ httpOnly: false })
        );
    }

    //check if logged in
    if (!pb_server.authStore.model && !request.nextUrl.pathname.startsWith("/auth")) {
        const redirect_to = new URL("/auth", request.url);
        if (request.nextUrl.pathname) {
            redirect_to.search = new URLSearchParams({
                next: request.nextUrl.pathname,
            }).toString();
        } else {
            redirect_to.search = new URLSearchParams({
                next: '/auth',
            }).toString();
        }
        return NextResponse.redirect(redirect_to);
    }

    for (let fn of middlewares) {
        const res = await fn({ request, response })
        if (res) return res;
    }

    // return response;
}

export const config = {
    matcher: ["/admin/:path*", "/auth:path*", "/clients/:path*", "/util/:path*"],
};
