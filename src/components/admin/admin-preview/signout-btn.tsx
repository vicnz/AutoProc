import { LogoutOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Link from "next/link";
import { useState } from "react";

function SignOut() {
    const [loading, setLoading] = useState(false);

    return (
        <Link href="/auth/signout" passHref>
            <Button
                icon={<LogoutOutlined />}
                block
                danger
                type="primary"
                onClick={() => setLoading(true)}
                loading={loading}
            >
                Sign Out
            </Button>
        </Link>
    );
}

export default SignOut;
