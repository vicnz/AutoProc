'use client';

/**
 * * GEN QRCODE FEATURE
 * * this will generate a QR Code used for Tracking This Document
 */

import { theme, Descriptions, QRCode } from "antd";
import { memo } from "react";

const RenderQR = memo(function ShowQR(props: {
    number: string;
    code: string
}) {
    const { token } = theme.useToken();

    return (
        <Descriptions layout="vertical" bordered column={4} size="small" title="Purchase Request Document Tracker">
            <Descriptions.Item label={props.number} span={2}>
                <QRCode
                    value={props.code}
                    size={300}
                    bordered={false}
                    color={token.colorPrimary}
                />
            </Descriptions.Item>
            <Descriptions.Item label="Note" span={2}>
                When Scanning QRCode using the AutoProc Utility App™️, select the
                option for specifying which <strong>Document</strong> is being currently tracked, which <strong>Office & Section</strong> it is being delivered to, and the type of <strong>Document Action</strong> [IN, OUT].
            </Descriptions.Item>
        </Descriptions>
    );
});

export default RenderQR;