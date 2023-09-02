'use client'

import { ChartData } from 'chart.js'
import { Bar, Line } from 'react-chartjs-2';

const randomData = new Array(10).fill(0)
//!Dummy Data
const DummyData: ChartData = {
    labels: ["GPM", "JPM", "EBL", "T-TRADING",
        "SHPNSV", "TELMO", "AT&T", "ALVA",
        "BEN", "ONE-T-TRADING"],
    datasets: [
        {
            label: 'Procured',
            data: randomData.map(item => Math.random() * 500),
            fill: true,
            borderColor: '#C0252A',
            backgroundColor: '#C0252A50',
            borderWidth: 2,
            tension: .3,
        },
    ],
}

const SummaryItems = function () {
    return (
        <>
            <Bar data={DummyData as any} options={{ responsive: true, maintainAspectRatio: false }} style={{ maxHeight: '50vh', minHeight: '50vh' }} />
        </>
    )
}

export default SummaryItems;