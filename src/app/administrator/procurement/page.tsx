// export const 
import React from 'react'
import { Skeleton, Table } from 'antd';
import ContentWrapper from '@components/content'
import Header from './components/header'
import Columns from './components/columns'
import PageController from './components/page-controller'

import { preload, fetchSetting } from './preload'

type PageProps = {
    params: { slug: string };
    searchParams?: {
        page: number;
    };
};

async function RootPage(props: PageProps) {

    let page = props.searchParams?.page || "0";
    page = Math.abs(Number.parseInt(page as string));
    page = Number.isNaN(page) ? 0 : page;

    const settings = await fetchSetting();
    const data = await preload({ page: page * settings.size, size: settings.size });
    return (
        <ContentWrapper
            header={
                <Header>
                    <PageController page={page} count={data.length} />
                </Header>
            }
        >
            <Table columns={Columns as any} pagination={false} bordered dataSource={data} sticky />
        </ContentWrapper>
    )
}

export default RootPage