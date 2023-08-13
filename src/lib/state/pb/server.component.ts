import { cookies, headers } from "next/headers";
import PocketBase from "pocketbase";
import { getNextjsCookie } from "../utils/server.cookies";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

const HOST = process.env.PB_URL
const COL_CLIENTS = process.env.PB_USER_COLLECTION || 'clients'

const pb_server_component = new PocketBase(HOST)

export async function server_component_pb(serverCookie: RequestCookie | undefined) {
    const cookie = await getNextjsCookie(serverCookie);
    pb_server_component.authStore.loadFromCookie(cookie);
    // send back the default 'pb_auth' cookie to the client with the latest store state

    // ! DEBUG 
    try {
        // get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
        pb_server_component.authStore.isValid && (await pb_server_component.collection(COL_CLIENTS).authRefresh());
    } catch (_) {
        // clear the auth store on failed refresh
        pb_server_component.authStore.clear();
    }

    return { pb: pb_server_component, cookies, headers };
}
