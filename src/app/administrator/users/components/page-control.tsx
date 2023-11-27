import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Link from "next/link";

function PageControl(props: { count: number; page: number }) {
    let page = Math.abs(Math.floor(props.page || 0));
    return (
        <>
            {page > 0 ? (
                <Link href={`/administrator/users?page=${Math.floor(Math.abs(page - 1))}`} passHref>
                    <Button icon={<ArrowLeftOutlined />} type="text">
                        Prev
                    </Button>
                </Link>
            ) : (
                <Button icon={<ArrowLeftOutlined />} type="text" disabled>
                    Prev
                </Button>
            )}
            {props.count > 0 ? (
                <Link href={`/administrator/users?page=${page + 1}`} passHref>
                    <Button icon={<ArrowRightOutlined />} type="text">
                        Next
                    </Button>
                </Link>
            ) : (
                <Button icon={<ArrowRightOutlined />} type="text" disabled>
                    Next
                </Button>
            )}
        </>
    );
}

export default PageControl;
