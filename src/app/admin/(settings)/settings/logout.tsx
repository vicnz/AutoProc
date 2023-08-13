'use client';
import { Button, Switch } from "antd";
import { pb_client } from '@lib/state/pb/client.config'
import { logoutUser } from '@lib/state/user/user'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { useToggleTheme } from '@lib/theme/theme.context'
import { BgColorsOutlined } from "@ant-design/icons";

export default function LogoutBtn() {
    const { mode, setMode } = useToggleTheme()
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const handleLogout = () => {
        setLoading(true)
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
            <Button onClick={() => handleLogout()} loading={loading} danger type='default'>
                {
                    loading ? 'Logging Out' : "Log Out"
                }
            </Button>
            <br />
            <br />
            Dark Mode &nbsp;
            <Switch checked={mode === 'dark'} onChange={() => mode === "dark" ? setMode('default') : setMode('dark')} title="Toggle Theme" />
        </>
    )
}