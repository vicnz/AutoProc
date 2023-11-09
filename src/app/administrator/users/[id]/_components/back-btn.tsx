import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Link from "next/link";

function BackButton() {
    return (
        <Link href={`/administrator/users`} passHref>
            <Button icon={<ArrowLeftOutlined />} type="text">
                Users
            </Button>
        </Link>
    );
}

export default BackButton;
