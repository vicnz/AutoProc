'use client';


import { StepProps, Steps } from "antd";

const Items: StepProps[] = [
    {
        title: "Purchase Request",
        description: "Approved",
        status: 'finish',
    },
    {
        status: 'finish',
        title: "BAC Resolution",
        description: "Approved"
    },
    {
        status: 'finish',
        title: "Request for Quotation",
        description: "Approved"
    },
    {
        status: 'process',
        title: "Abstract of Quotation",
        description: "Nothing"
    },
    {
        title: "Notice of Award",
        description: "Pending"
    },
    {
        title: "BAC Resolution",
        description: "Pending"
    },
    {
        title: "Purchase Order",
        description: "Pending"
    },
    {
        title: "Delivery",
        description: "Pending"
    },
]

const DocumentStatus = function () {
    return (
        <Steps direction='vertical' items={Items} />
    )
}

export default DocumentStatus;