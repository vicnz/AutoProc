import { fetchDepartmentsWithSection } from "@state/utility/preload";
import { Affix, Cascader, Divider, Flex, Select, Space, Typography } from "antd";
import Image from "next/image";
import ScannerLogo from "@media/scanner-logo.svg";
import ScannerInput from "./components/form";

const Page = async function () {
    const data = await fetchDepartmentsWithSection();
    return (
        <Space direction="vertical" style={{ width: "100%", padding: "0px 0px 0px 24px" }}>
            <Flex vertical align="center" style={{ width: "100%" }}>
                <br />
                <br />
                <Image alt="App Logo" src={ScannerLogo} height={150} width={175} />
                <br />
                <Image alt="App Logo" src="/logo-medium.png" height={38} width={300} />
                <Divider />
                <p style={{ textAlign: "center" }}>
                    AutoProc Utility App (QRCODE SCANNER), Point the Scanner Camera onto an AutoProc Generated QR Code
                    to Display Document Information
                </p>
            </Flex>
            <Divider>Select Destination Office</Divider>
            <ScannerInput data={data} />
        </Space>
    );
};

export default Page;
