import React from "react";
import { Empty, Result } from "antd";
import SignOut from "./signout";

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
                            <SignOut />
                        </>
                    }
                />
            </div>
        </div>
    );
}

export default UsersPage;
