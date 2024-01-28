'use client';

import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Result } from "antd";
import { useRouter } from 'next/navigation'
import { Template } from '@components/content'

export default function NotFound() {
    const { back } = useRouter()
    return (
        <Template>
            <div style={{ display: 'grid', placeItems: 'center', width: '100%', height: '100%' }}>
                <Result
                    title="Purchase Request Not Found"
                    subTitle="The Purchase Request Record You Are Trying To Find Does Not Exist"
                    status={'404'}
                    extra={
                        <div>
                            <Button onClick={() => back()} icon={<ArrowLeftOutlined />}>Go Back</Button>
                        </div>
                    }
                />
            </div>
        </Template>
    )
}