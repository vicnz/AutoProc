'use client';

//TODO Change This Layout to Server Component
import { ReactNode } from "react";
import Contents from "../_components/contents";
import { Button } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import BackButton from "../_components/back.button";
import { useRouter } from "next/navigation";

export default function SearchLayout({ children, ...props }: { children: ReactNode }) {
    const router = useRouter()
    return (
        <Contents title={'Dashboard'}
            hasBack={<BackButton onClick={() => router.back()} />}
            actions={
                <>
                    <Button icon={<MoreOutlined />} type='text'></Button>
                </>
            }
        >
            {children}
        </Contents >
    )
}