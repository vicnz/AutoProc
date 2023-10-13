
import { PropsWithChildren } from 'react';
//components
import ContentWrapper from '@components/admin/content';
import GlobalHeader from '@components/admin/header';
//configs

//Server Data
const preload = async () => {

}
//
const DashboardLayout = function (props: PropsWithChildren<any>) {

    return (
        <ContentWrapper
            header={
                <GlobalHeader title={<div style={{ textTransform: 'uppercase' }}>DASHBOARD</div>}>
                    {/* <Button icon={<MoreOutlined />} type='text' /> */}
                </GlobalHeader>
            }
        >
            {props.children}
        </ContentWrapper>
    )
}

export default DashboardLayout;