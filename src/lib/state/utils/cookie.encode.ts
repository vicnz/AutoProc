/**
 * COOKIE ENCODING
 */
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

/**
 * @name Encode Cookie
 * @param cookie {[key : string] : string}
 * @returns string
 */
export function encodeCookie(cookie: { [key: string]: string }): string {
    let encodedCookie = "";
    for (const [key, value] of Object.entries(cookie)) {
        encodedCookie += `${encodeURIComponent(key)}=${encodeURIComponent(value)}; `;
    }
    return encodedCookie.trimEnd();
}

/**
 * @name Encode Next Cookie
 * @param next_cookie RequestCookie
 * @returns string
 */
export function encodeNextPBCookie(next_cookie: RequestCookie | undefined) {
    /*If Cookie Does Not Exists Return Empty String*/
    if (!next_cookie) {
        return "";
    }

    const cookie = { pb_auth: next_cookie.value }; /*Fetch Next Cookie */
    let encodedCookie = "";
    for (const [key, value] of Object.entries(cookie)) {
        encodedCookie += `${encodeURIComponent(key)}=${encodeURIComponent(value)}; `;
    }

    return encodedCookie.trimEnd();
}

