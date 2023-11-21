//SIGN OUT BUTTON

"use client";

import Link from "next/link";
import { LogoutOutlined } from "@ant-design/icons";
import { Button, ButtonProps } from "antd";
import { useState } from "react";

function SignOut(props: ButtonProps) {
    const { children, ...rest } = props;
    const [loading, setLoading] = useState(false);

    return (
        <Link href="/auth/signout" passHref>
            <Button
                icon={<LogoutOutlined />}
                block
                type="primary"
                {...rest}
                onClick={() => setLoading(true)}
                loading={loading}
            >
                {children || "Sign Out"}
            </Button>
        </Link>
    );
}

export default SignOut;
