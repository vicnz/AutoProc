"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "antd";
import { EyeOutlined } from "@ant-design/icons";

//VIEW ITEM
const ViewUser = function (props: { id: string }) {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        return () => {
            setLoading(false);
        };
    }, []);

    return (
        <>
            <Link href={`/administrator/users/${encodeURIComponent(props.id)}`} passHref>
                <Button type="text" icon={<EyeOutlined />} loading={loading} onClick={() => setLoading(true)}>
                    Details
                </Button>
            </Link>
        </>
    );
};

export default ViewUser;
