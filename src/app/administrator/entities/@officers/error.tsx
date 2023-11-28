"use client";

import React from "react";
import ErrorPage from "@components/error-page";

function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    return (
        <>
            <ErrorPage reload={reset} error={error} />
        </>
    );
}

export default Error;
