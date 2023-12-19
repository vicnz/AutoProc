"use client";

import { BugOutlined } from "@ant-design/icons";
import { Alert, Button, Descriptions, Drawer, Input, Skeleton, Upload } from "antd";
import React, { useEffect, useState } from "react";

function Feedback() {
    const [open, setOpen] = useState(false);
    const [browserInfo, setBrowserInfo] = useState({ name: "", version: "" });

    useEffect(() => {
        const browserInf = getBrowserVersion(navigator.userAgent);
        setBrowserInfo(browserInf);
    }, []);
    return (
        <>
            <Button type="text" icon={<BugOutlined />} onClick={() => setOpen(true)} />
            <Drawer title="Feedback" open={open} onClose={() => setOpen(false)}>
                <Alert
                    message="Send Feedback"
                    description="If You Encounter Any Problem in Using The AutoProc you may describe below how to reproduce the error. include screenshots if ever."
                />
                <br />
                <Descriptions layout="vertical" bordered size="small">
                    <Descriptions.Item label="Browser Name">{browserInfo.name}</Descriptions.Item>
                    <Descriptions.Item label="Browser Version">{browserInfo.version}</Descriptions.Item>
                </Descriptions>
                <br />
                <Input.TextArea></Input.TextArea>
            </Drawer>
        </>
    );
}

export default Feedback;

const getBrowserVersion = (userAgent: string) => {
    let M = userAgent.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    let tem;
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(userAgent) || [];
        return { name: "IE", version: tem[1] || "" };
    }
    if (M[1] === "Chrome") {
        tem = userAgent.match(/\bOPR\/(\d+)/);
        if (tem != null) {
            return { name: "Opera", version: tem[1] };
        }
    }

    M = M[1] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, "-?"];
    if ((tem = userAgent.match(/version\/(\d+)/i)) !== null) {
        M.splice(1, 1, tem[1]);
    }

    return {
        name: M[0],
        version: M[1],
    };
};
