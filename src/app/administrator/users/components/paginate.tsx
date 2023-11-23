"use client";

import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
// ─── Component Base ──────────────────────────────────────────────────────────
function Paginate(props: { count: number; size: number }) {
    const searchParams = useSearchParams();
    const router = useRouter();
    // ─────────────────────────────────────────────────────────────────────
    const page = Math.abs(Math.floor(Number.parseInt(searchParams.get("page") as string) || 0)); //TODO make sure the type is number
    const pageSize = Math.floor(props.size);
    // ─── Previous Page ───────────────────────────────────────────────────
    const prevPage = () => {
        if (page >= pageSize) {
            router.push(`/administrator/users?page=${page - pageSize}`); //fixed size
        }
    };
    // ─── Next Page ───────────────────────────────────────────────────────
    const nextPage = () => {
        if (props.count > 0) {
            router.push(`/administrator/users?page=${page + pageSize}`); //TODO limit call when there is no data
        }
    };
    // ─────────────────────────────────────────────────────────────────────
    return (
        <>
            <Button icon={<ArrowLeftOutlined />} type="text" onClick={() => prevPage()}>
                Prev
            </Button>
            <Button icon={<ArrowRightOutlined />} type="text" onClick={() => nextPage()}>
                Next
            </Button>
        </>
    );
}

export default Paginate;
