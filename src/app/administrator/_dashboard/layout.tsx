'use client';

//libs
import { PropsWithChildren, useEffect } from 'react';
import { Button } from 'antd';
import { Chart as ChartJs, registerables } from 'chart.js'
//components
import ContentWrapper from '../_components/shared/content-wrapper';
import { Header } from '../_components/shared/header-wrapper';
import { MoreOutlined } from '@ant-design/icons';
//configs
//
const DashboardLayout = function (props: PropsWithChildren<any>) {

    useEffect(() => {
        ChartJs.register(...registerables)
    }, [])

    return (
        <ContentWrapper
            header={
                <Header title={<div style={{ textTransform: 'uppercase' }}>dashboard</div>}>
                    <Button icon={<MoreOutlined />} type='text' />
                </Header>
            }
        >
            {props.children}
        </ContentWrapper>
    )
}

export default DashboardLayout;