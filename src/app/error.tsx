'use client';

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) {
    useEffect(() => {
        console.error('client-error', error)
    }, [error])

    return (
        <div style={{ height: '100vh', width: '100vw', display: 'grid', placeItems: 'center' }}>
            <h3>Error Occured</h3>
            <button onClick={() => reset()}>
                Try Again
            </button>
        </div>
    )
}
