import { SettingOutlined, TeamOutlined } from "@ant-design/icons";
import { Alert, Card, Flex, Result } from "antd";
import { fetchAccountInfo } from "./_server/account";
import { fetchSettings } from "./_server/settings";
import { options } from "@lib/auth/options";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
//components
import AccountView from "./_components/account";
import PasswordReset from "./_components/password";
import Options from "./_components/settings";

const Page = async function () {
    const session = await getServerSession(options);
    if (!session?.user.id) {
        notFound();
    }
    const account = await fetchAccountInfo(session.user.id);
    const settings = await fetchSettings();
    return (
        <Flex vertical align="center">
            <div style={{ width: "600px", padding: "15px 0" }}>
                <Flex align="center" justify="space-between">
                    <span style={{ fontSize: "1.5em" }}>
                        <SettingOutlined /> Settings
                    </span>
                </Flex>
                <br />
                <AccountView account={account.profile} />
                <br />
                <PasswordReset account={account.profile} />
                <br />
                <Card
                    title={
                        <>
                            <TeamOutlined /> Administrator Management
                        </>
                    }
                >
                    <Result
                        status="warning"
                        title="TODO"
                        subTitle="Multiple Administrators is yet to be implemented. Once the End-User Accounts feature is stable-this feature will also follow through."
                    />
                </Card>
                <br />
                <Options data={settings.settings} />
                <br />
                <Card title="Backup & Scheduling">
                    <Alert
                        type="info"
                        message="In Development"
                        description={
                            <>
                                Backup & Schedule usually is handle by the <strong>SUPER ADMIN</strong> although an
                                intended implementation for setting an automatic scheduled backup will be integrated.
                                For now this settings is still in it's infancy phase and it's intentionally disabled for
                                that matter.
                            </>
                        }
                    />
                </Card>
            </div>
        </Flex>
    );
};

export default Page;
