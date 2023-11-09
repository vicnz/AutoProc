"use client";

import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useRouter, useSearchParams } from "next/navigation";

function Paginate(props: { count: number }) {
    const searchParams = useSearchParams();
    const router = useRouter();

    const page = Number.parseInt(searchParams.get("page") as string) || 0; //TODO make sure the type is number
    const size = Number.parseInt(searchParams.get("size") as string) || 8; //TODO make sure the type is number

    const prevPage = () => {
        //goto prev page
        if (page >= size) {
            router.push(`/administrator/users?page=${page - size}&size=${8}`); //fixed size
        }
    };

    const nextPage = () => {
        //goto next page
        if (props.count > 0) {
            //should not predict
            router.push(`/administrator/users?page=${page + size}&size=${8}`); //TODO limit call when there is no data
        }
    };
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
