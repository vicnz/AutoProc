import { useEffect } from "react";
import { pb_client } from "../pb/client.config";
import { useDebugValue } from 'react'

export function usePbAuthListener() {
    useEffect(() => {

        pb_client.authStore.loadFromCookie(document?.cookie ?? "");
        // useDebugValue(`Auth Listener : ${pb_client.authStore.isValid}`)
        console.log("Auth Listener : ", pb_client.authStore.isValid);
        const authChange = pb_client.authStore.onChange(() => {
            document.cookie = pb_client.authStore.exportToCookie({ httpOnly: false });
        });
        return () => {
            authChange();
        };
    }, []);
    return pb_client.authStore.model;
}
