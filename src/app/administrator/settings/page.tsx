import { SettingOutlined, SmileOutlined, TeamOutlined } from "@ant-design/icons";
import { Alert, Card, Flex, Result } from "antd";
import { options } from "@lib/auth/options";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
// import AccountView from "./_components/account.old";
// import PasswordReset from "./_components/password.old";
import PasswordChange from "./components/password-change";
import SecurityQuestions from "./components/security-questions";
import Profile from "./components/profile";
import Options from "./components/settings";
import { getAdminInfo, getSettingsInfo } from "./preload";

const Page = async function () {
    const session = await getServerSession(options);
    if (!session?.user.id) {
        notFound();
    }
    //
    const accountInfo = await getAdminInfo(session.user.id);
    const settingsInfo = await getSettingsInfo();
    if (accountInfo.error || settingsInfo.error) throw new Error("An Error Occured " + accountInfo.message);

    return (
        <Flex vertical align="center">
            <Flex style={{ width: "600px", padding: "15px 0" }} gap={15} vertical>
                <Flex align="center" justify="space-between">
                    <span style={{ fontSize: "1.5em" }}>
                        <SettingOutlined /> Settings
                    </span>
                </Flex>
                <Profile account={accountInfo.profile} />
                <Card
                    title={
                        <>
                            <TeamOutlined /> Password Setting
                        </>
                    }
                >
                    <Flex vertical gap={20}>
                        <PasswordChange account={accountInfo.profile} />
                        <SecurityQuestions />
                    </Flex>
                </Card>
                <Options data={settingsInfo.settings} />
                <Card
                    title={
                        <>
                            <TeamOutlined /> Multiple Administrator
                        </>
                    }
                >
                    <Result
                        status="warning"
                        title="TODO"
                        subTitle="Multiple Administrators is yet to be implemented. Once the End-User Accounts feature is stable-this feature will also follow through."
                    />
                </Card>
                <Card
                    title={
                        <>
                            <SmileOutlined /> Global Theme
                        </>
                    }
                >
                    <Result
                        status="warning"
                        title="TODO"
                        subTitle="Multiple Administrators is yet to be implemented. Once the End-User Accounts feature is stable-this feature will also follow through."
                    />
                </Card>
                <Card title="Backup & Scheduling">
                    <Alert
                        type="info"
                        message="In Development"
                        description={
                            <>
                                Backup & Schedule usually is handle by the <strong>SUPER ADMIN</strong> although an
                                intended implementation for setting an automatic scheduled backup will be integrated.
                                For now this settings is still in it&apos;s infancy phase and it&apos;s intentionally
                                disabled for that matter.
                            </>
                        }
                    />
                </Card>
            </Flex>
        </Flex>
    );
};

export default Page;
