'use client';

import { Skeleton, Typography } from 'antd';
import React from 'react'
import useSWR from 'swr';

function PreparedBy() {

    const { data, error, isLoading } = useSWR("/administrator/api/profile");

    if (error) {
        <p>Prepared By: <span style={{ display: "inline-block", width: 50, borderBottom: "1px solid black" }} /></p>
    }

    if (!data || isLoading || !data.data) {
        <Skeleton.Input active />
    } else {

        const { name } = data['data'];
        return (
            <div><span style={{ fontSize: 12 }}>Prepared By:</span>
                <div style={{ height: 50, marginLeft: 75, width: 300, textAlign: 'center' }}>
                    <Typography.Text strong style={{ textTransform: 'uppercase' }}>{name}</Typography.Text>
                    <hr style={{ margin: 0 }} />
                    <Typography.Text italic>Administrator</Typography.Text>
                </div>
            </div>
        )
    }

}

export default PreparedBy