'use client';

import { Tabs } from "antd";
import TabsPanes from '@components/admin/procurement/tabitems'
import ProcurementItem from '@components/admin/procurement'
import DocumentStatus from "@components/admin/status";
import PrIdContext from '@components/admin/pr-number'
//
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