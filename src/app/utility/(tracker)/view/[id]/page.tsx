import { Divider, Drawer, Flex, Space } from "antd";
import Image from "next/image";
import ScannerLogo from "@media/scanner-logo.svg";
import { preload } from "./server";
import DrawerView from "./preview";
import { getServerSession } from "next-auth";
import { options } from "@lib/auth/options";
import { redirect } from "next/navigation";

type PageProps = {
    params: {
        id: string;
    };
    searchParams?: {
        officeId: string;
        timestamp: string;
    };
};

const Page = async function (props: PageProps) {
    const session = await getServerSession(options);
    if (session?.user.role !== "TRACKER") {
        //Only Allow Tracker User Type
        redirect("/utility");
    }

    const data = await preload(
        props.params.id,
        props.searchParams?.officeId as string,
        props.searchParams?.timestamp as string
    );
    return (
        <Space direction="vertical" style={{ width: "100%", padding: "0px 0px 0px 24px" }}>
            <Flex vertical align="center" style={{ width: "100%" }}>
                <br />
                <br />
                <Image alt="App Logo" src={ScannerLogo} height={150} width={175} />
                <br />
                <Image alt="App Logo" src="/logo-medium.png" height={38} width={300} />
                <Divider>Select Destination Office</Divider>
                <p style={{ textAlign: "center" }}>
                    AutoProc Utility App (QRCODE SCANNER), Point the Scanner Camera onto an AutoProc Generated QR Code
                    to Display Document Information
                </p>
            </Flex>
            <DrawerView data={data?.tracking} number={data?.number as string} />
        </Space>
    );
};

export default Page;
