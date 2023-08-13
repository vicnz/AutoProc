'use client';

import { Line, Bar } from 'react-chartjs-2'
import { ChartData } from 'chart.js'
import { DatePicker, Space } from 'antd';

const data: ChartData = {
    labels: ["GPM", "JPM", "EBL", "T-TRADING",
        "SHPNSV", "TELMO", "AT&T", "ALVA",
        "BEN", "ONE-T-TRADING"],
    datasets: [
        {
            label: 'Procured',
            data: [500, 50, 2424, 14040, 14141, 4111, 4544, 47, 5555, 6811],
            fill: true,
            borderColor: '#C0252A',
            backgroundColor: '#C0252A50',
            borderWidth: 2,
            tension: .3,
        },
        {
            label: 'Discontinued',
            data: [3423, 322, 786, 98, 9897, 231, 980, 999, 343, 122],
            fill: true,
            borderColor: '#C0252A',
            backgroundColor: '#C0252A80',
            borderWidth: 2,
            tension: .3,
        },
        {
            label: 'Unspecified',
            data: [3423, 322, 786, 98, 9897, 231, 980, 999, 343, 122].reverse(),
            fill: true,
            borderColor: '#C0252A80',
            backgroundColor: '#C0252A15',
            borderWidth: 2,
            tension: .3,
        },
    ],

}
export default function ActivityTab() {
    return (
        <>
            <Space size='large'>
                <p>PORTIFIED</p>
                <DatePicker picker='week' />
            </Space>
            <Line datasetIdKey='line1' data={data as any} style={{ maxHeight: '50vh' }} />
            <Bar datasetIdKey='var1' data={data as any} style={{ maxHeight: '50vh' }} />
        </>
    )
}