"use client";
/**
 * * INITIALIZED BACKEND MONITORING
 * * Undocumented section
 */

import React, { memo, useEffect } from "react";

function InitMonitoring() {
    useEffect(() => {
        setTimeout(() => {
            fetch("/administrator/api?monitor=true"); //start monitoring deliveries
        }, 3000);
    }, []);
    return <>{/* THIS COMPONENT WILL ONLY REINITIALIZED ON STARTUP */}</>;
}

export default memo(InitMonitoring);
