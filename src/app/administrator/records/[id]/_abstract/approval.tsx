'use client';

import { Descriptions, Typography } from "antd";
import { memo, useMemo, useState } from "react";

const { Text } = Typography


const ApprovalBlock = function (props: { enduser: { name: string, department?: string } }) {

    const SampleOfficers = useMemo(() => ([
        { name: "Bryan Dave P. Revilla", office: "BAC Member", label: 'Member' },
        { name: "Randall G. Castillo", office: "BAC Member", label: 'Member' },
        { name: "Emilyn D. Alueta", office: "BAC Member", label: 'Member' },
        { name: "Emilyn D. Alueta", office: "BAC Member", label: 'Member' },
        { name: props.enduser.name, office: props.enduser.department, label: 'End-User' },
        { name: "Fortunato Philip A. Cabugao", office: "BAC Vice Chairperson", label: 'Vice-Chairperson' },
        { name: "Doreen C. Castillo", office: "BAC Chairperson", label: 'Chairperson' },
    ]), [props.enduser])

    return (
        <Descriptions layout='vertical' column={3} bordered size="small">
            {
                SampleOfficers.map((item, idx) => {
                    return (
                        <Descriptions.Item label={item.label} key={item.name}>
                            <div style={{ height: 100, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ width: '100%', borderBottom: 'solid lightgray 2px', fontWeight: 'bold', textTransform: 'uppercase', textAlign: 'center' }}>{item.name}</Text>
                                <Text style={{ width: '100%', textAlign: 'center' }}>{item.office}</Text>
                            </div>
                        </Descriptions.Item>
                    )
                })
            }
        </Descriptions>
    )
}

export default memo(ApprovalBlock);