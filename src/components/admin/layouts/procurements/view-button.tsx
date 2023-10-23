"use client";
//View Button On Datatable

import { EyeOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Link from "next/link";
import { memo, useEffect, useState } from "react";

const ViewButton = function ({ id }: { id: string }) {
    const [loading, isLoading] = useState(false);
    //
    useEffect(() => {
        return () => {
            isLoading(false);
        };
    }, []);
    //
    return (
        <span>
            <Link href={`/administrator/procurements/${encodeURI(id)}`} passHref>
                <Button
                    loading={loading}
                    onClick={() => {
                        isLoading(true);
                    }}
                    type="text"
                    icon={<EyeOutlined />}
                >
                    Details
                </Button>
            </Link>
        </span>
    );
};

export default memo(ViewButton);
