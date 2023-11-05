"use client";

import { EyeOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Link from "next/link";
import { memo, useEffect, useState } from "react";

function LinkToPR(props: { id: string }) {
    const [loading, setLoading] = useState(false);
    //
    useEffect(() => {
        return () => {
            setLoading(false);
        };
    }, [props.id]);

    return (
        <Link href={`/administrator/procurements/${encodeURIComponent(props.id)}`} passHref key={"view-pr"}>
            <Button type="text" icon={<EyeOutlined />} loading={loading} onClick={() => setLoading(true)}>
                View PR
            </Button>
        </Link>
    );
}

export default memo(LinkToPR);
