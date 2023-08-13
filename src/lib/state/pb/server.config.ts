import PocketBase from "pocketbase";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getNextjsCookie } from "../utils/server.cookies";

const HOST = process.env.PB_URL

export const pb_server = new PocketBase(HOST);
export type PB_SERVER = typeof pb_server;

/**Route Handler */
export async function route_handlers_pb(req: NextRequest, res: NextResponse) {
    const cookie = await getNextjsCookie();
    const response = NextResponse.next();
    // load the auth store data from the request cookie string
    pb_server.authStore.loadFromCookie(cookie || "");
    // send back the default 'pb_auth' cookie to the client with the latest store state
    pb_server.authStore.onChange(() => {
        response.headers.set("set-cookie", pb_server.authStore.exportToCookie());
    });
    try {
        // get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
        pb_server.authStore.isValid && (await pb_server.collection('clients').authRefresh());
    } catch (_) {
        // clear the auth store on failed refresh
        pb_server.authStore.clear();
        response.headers.set('set-cookie', pb_server.authStore.exportToCookie({ httpOnly: false }))
    }

    return pb_server;
}
