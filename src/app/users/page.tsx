import { Result } from "antd";
import SignOut from "./signout";
import SignOutBtn from "@components/signout-btn";

function UsersPage() {
    return (
        <div style={{ height: "100vh", width: "100vw", display: "grid", placeItems: "center" }}>
            <div style={{ width: 400 }}>
                <Result
                    // icon={<CompassOutlined />}
                    status="500"
                    title="Under Development"
                    subTitle="End-User Account, this section is still on Heavy Development and hopefully can accumulate a PREVIEW release on AutoProc V2"
                    extra={
                        <>
                            <SignOutBtn block={false}>Sign Out</SignOutBtn>
                        </>
                    }
                />
            </div>
        </div>
    );
}

export default UsersPage;
