'use client';

import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Result } from "antd";
import { useRouter } from 'next/navigation'
import SectionContainer from '@components/admin/content/container'

export default function NotFound() {
    const { back } = useRouter()
    return (
        <SectionContainer>
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
        </SectionContainer>
    )
}