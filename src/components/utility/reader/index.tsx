"use client";

/**
 * * QR SCANNER FEATURE
 * * due Browser Security this feature is only loaded
 * * Either in `localhost` or `https`
 */

//libs
import React, { CSSProperties, memo } from "react";
import QRScanner from "react-qr-scanner";

type PropTypes = {
    constraints?: any;
    onError: any;
    onLoad: any;
    onScan: any;
    resolution?: any;
    qrArea?: any;
};

//
function Scanner(props: PropTypes & { style?: CSSProperties }) {
    const defaultValues = {
        constraints: {
            facingMode: { exact: "environment" },
            audio: false,
            video: { facingMode: "environment" },
        },
        resolution: 100,
    };
    const PassedProps = { ...defaultValues, ...props }; //overload default
    return (
        <div>
            <QRScanner {...PassedProps} />
        </div>
    );
}

export default memo(Scanner);
