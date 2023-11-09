import { ArrowRightOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Link from "next/link";
import { ReactNode, memo, useState } from "react";

function RedirectTo(props: { href: string; close?: () => any }) {
    const [loading, setLoading] = useState(false);
    const onClick = () => {
        setLoading(true);
        props?.close && props.close();
    };
    return (
        <Link href={props.href} passHref>
            <Button icon={<ArrowRightOutlined />} loading={loading} type="text" shape="round" onClick={onClick} />
        </Link>
    );
}

export default memo(RedirectTo);
