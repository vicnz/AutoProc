'use client';

import { ReactNode, useMemo } from "react";
import Contents from "../../_components/contents";
import { usePathname, useRouter } from "next/navigation";
import { Badge, Button, Divider, Tag } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined, FileOutlined, MoreOutlined, PlusCircleOutlined } from "@ant-design/icons";
import BackButton from '@/app/admin/_components/back.button';

export default function POLayout({ children, ...props }: { children: ReactNode }) {
    const path = usePathname()
    const router = useRouter()
    const isHome: boolean = useMemo(() => { return path.split('/').length > 3 }, [path])

    return (
        <Contents
            title={<Badge>{Intl.NumberFormat('en').format(5643).toString()} Items</Badge>}
            hasBack={isHome ? <BackButton onClick={() => { router.back() }} /> : null}
            actions={
                <>
                    {
                        !path.startsWith('/admin/pr/') ?
                            <>
                                <Button icon={<ArrowLeftOutlined />} type="text">Prev</Button>
                                <Tag>PAGE 1</Tag>
                                <Button icon={<ArrowRightOutlined />} type="text">Next</Button>
                                <Divider type='vertical' />
                            </>
                            : null
                    }
                    {
                        !path.startsWith('/admin/pr/') ?
                            <>
                                <Button icon={<PlusCircleOutlined />} type="text">Add</Button>
                                <Button icon={<PlusCircleOutlined />} type="text">Requests</Button>
                                <Divider type='vertical' />
                            </>
                            : null
                    }
                    <Button icon={<MoreOutlined />} type="text"></Button>
                </>
            }
        >
            {children}
        </Contents >
    )
}