'use client';

import { Card, Tabs, Segmented } from "antd";
import ViewScroll from "@components/scrollview";
import { TeamOutlined } from "@ant-design/icons";
import Head from './components/head'
import Members from './components/members'
import { useState } from "react";

type OfficerType = {
    fname: string,
    mname?: string,
    lname: string,
    suffix?: string,
    title: string,
}

type OfficeProps = {
    members: Array<any>,
    chairman: OfficerType,
    vicechairman: OfficerType,
    head: OfficerType,
}
function Officers(props: { data: OfficeProps }) {
    const [active, setActive] = useState('head')
    return (
        <Card
            title={
                <span>
                    <TeamOutlined /> BAC Organization
                </span>
            }
            style={{ height: 475 }}
            bodyStyle={{ padding: 0, margin: 0, height: "100%" }}
            extra={<><Segmented options={[{ label: 'Chair', value: 'head' }, { label: 'Members', value: 'members' }]} onChange={(e: any) => setActive(e)} /></>}
        >
            <ViewScroll height={"calc(400px - 10px)"}>
                <div style={{ padding: 10 }}>
                    {
                        {
                            'head': <Head data={[props.data.head, props.data.chairman, props.data.vicechairman]} />,
                            'members': <Members data={props.data.members} />
                        }[active]
                    }
                </div>
            </ViewScroll>
        </Card>
    );
}

export default Officers;
