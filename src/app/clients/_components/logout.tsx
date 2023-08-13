'use client';

import { pb_client } from '@/lib/state/pb/client.config';
import { logoutUser } from '@/lib/state/user/user';
import { Button } from 'antd';
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';

export default function ClientLagoutButton() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const HandleLogout = () => {
        setLoading(true);
        logoutUser({ pb: pb_client })
        router.refresh()
    }
    useEffect(() => {
        return () => {
            setLoading(false)
        }
    }, [])
    return (
        <>
            <Button onClick={HandleLogout} loading={loading}> LOGOUT CLIENT </Button>
        </>
    )
}