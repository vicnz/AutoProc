"use client";

import { PropsWithChildren } from "react";
import { SessionProvider } from "next-auth/react";

function AuthSessionProvider(props: PropsWithChildren<any>) {
    return (
        <>
            <SessionProvider>{props.children}</SessionProvider>
        </>
    );
}

export default AuthSessionProvider;
