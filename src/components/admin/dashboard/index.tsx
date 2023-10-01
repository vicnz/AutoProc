
import { PropsWithChildren } from 'react';
import { Button } from 'antd';
//components
import ContentWrapper from '@components/admin/content';
import Header from '@components/admin/header';
//configs
//
const DashboardLayout = function (props: PropsWithChildren<any>) {

    return (
        <ContentWrapper
            header={
                <Header title={<div style={{ textTransform: 'uppercase' }}>dashboard</div>}>
                    {/* <Button icon={<MoreOutlined />} type='text' /> */}
                </Header>
            }
        >
            {props.children}
        </ContentWrapper>
    )
}

export default DashboardLayout;