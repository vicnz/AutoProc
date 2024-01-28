'use client';

import { Button, Flex, Modal, Typography, theme } from 'antd'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import BoringAvatar from 'boring-avatars'
import { THEME_COLORS } from '@lib/theme/constant'


function Page() {

    const { token } = theme.useToken()
    const router = useRouter()
    const [open, setOpen] = useState(false)
    useEffect(() => {
        setOpen(true)
    }, [])

    const contentStyle: React.CSSProperties = {
        lineHeight: "75px",
        textAlign: "center",
        color: token.colorTextTertiary,
        backgroundColor: `${token.colorPrimary}15`,
        borderRadius: token.borderRadiusLG,
        border: `1px dashed ${token.colorPrimary}`,
        marginTop: 16,
        width: '100%',
        height: '100%',
        display: 'grid',
        placeItems: 'center'
    };

    return (
        <Modal open={open} onCancel={() => router.replace('/')} centered destroyOnClose title="Default Admin" maskClosable={false} footer={null}>
            <Flex align='flex-start' style={{ height: '250px', marginBottom: 10 }} gap={10}>
                <Flex vertical style={{ height: 'inherit' }}>
                    <Typography.Title level={4}>Create Default Administrator</Typography.Title>
                    <Typography.Paragraph>
                        Initialize AutoProc Administrator By Adding First the Administrator Account
                    </Typography.Paragraph>
                    <div style={{ flexGrow: 1 }} />
                    <div>AutoProc Setup</div>
                </Flex>
                <div style={{ ...contentStyle }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 15 }}>
                        <BoringAvatar
                            variant="beam"
                            name="login"
                            size={75}
                            colors={[THEME_COLORS.PRIMARY, THEME_COLORS.ACCENT]}
                        />
                        <Button type='primary'>Create Admin</Button>
                    </div>
                </div>
            </Flex>
        </Modal>
    )
}

export default Page