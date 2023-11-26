import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Card, Collapse, Divider, Flex, Skeleton, Space } from "antd";
import Link from "next/link";
import { preload } from "./preload";
import { notFound } from "next/navigation";
import PODetails from "./components/po-details";
import { getServerSession } from "next-auth";
import { options } from "@lib/auth/options";
import DeliveryItems from "./components/form";
import Top from "./components/topbar";

async function Page(props: { searchParams: { id: string } }) {
    const session = await getServerSession(options);
    const data: any = await preload(props.searchParams.id as string);
    //@ts-ignore
    if (data?.error) notFound();
    // ─────────────────────────────────────────────────────────────────────
    return (
        <>
            <Top />
            <br />
            <PODetails
                data={{
                    id: data?.id,
                    progress: data.progress,
                    status: data.status,
                    startDate: data.startDate,
                    endDate: data.endDate,
                    number: data.number,
                    supplier: { name: data.supplier.name, address: data.supplier.address },
                }}
            />
            <br />
            <Divider>Items</Divider>
            <DeliveryItems final={data.final} id={data.id} userId={session?.user.id as string} data={data.parcels} />
            <br />
        </>
    );
}

export default Page;
