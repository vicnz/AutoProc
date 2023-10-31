'use client';

import { Tabs } from "antd";
import TabsPanes from '@components/admin/layouts/procurement-item/tabs'
import ProcurementItem from '@components/admin/layouts/procurement-item'
import DocumentStatus from "@components/admin/procurement/document-status";
import PrIdContext from '@components/admin/pr-number'
//
//TODO check if PR exists or not
//FIXME manually entering url params triggers error -> sould be rendered by not-found

const Page = function (props: { params: { prId: string } }) {
    return (
        <PrIdContext id={props.params.prId}>
            <ProcurementItem>
                <Tabs tabPosition="left" items={TabsPanes} defaultActiveKey='pr' />
                <DocumentStatus />
            </ProcurementItem>
        </PrIdContext>
    )
}

export default Page;