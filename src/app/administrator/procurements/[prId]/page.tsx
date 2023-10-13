'use client'; //TODO check the issue of TABS resettings back to PR

import { Tabs } from "antd";
import TabsPanes from '@components/admin/procurement/tabitems'
import ProcurementItem from '@components/admin/procurement'
import DocumentStatus from "@components/admin/status";
import PrIdContext from '@components/admin/PRId'
//
const Page = function (props: { params: { prId: string } }) {
    return (
        <PrIdContext id={props.params.prId}>
            <ProcurementItem>
                <Tabs tabPosition="left" items={TabsPanes} defaultActiveKey='pr' />
                <DocumentStatus prId={props.params.prId} />
            </ProcurementItem>
        </PrIdContext>
    )
}

export default Page;