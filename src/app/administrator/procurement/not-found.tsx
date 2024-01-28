'use client';

import ShadedContainer from '@components/content/template';
import { Button, Flex, Typography } from 'antd';
import { useRouter } from 'next/navigation';
import React from 'react'

function PageNotFound() {
    const router = useRouter()
    return (
        <ShadedContainer>
            <div style={{ height: '100%', width: '100%', display: 'grid', placeItems: 'center' }}>
                <Flex vertical align="center">
                    <Typography.Title style={{ margin: 0 }}>404</Typography.Title>
                    <p>Page Content Not Found</p>
                    <Button onClick={() => router.back()} type='dashed' danger>Go Back</Button>
                </Flex>
            </div>
        </ShadedContainer>
    )
}

export default PageNotFound