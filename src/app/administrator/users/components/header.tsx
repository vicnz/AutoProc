import { UserAddOutlined } from "@ant-design/icons";
import { Divider } from "antd";
import GlobalHeader from "@components/admin/header";
import OpenDrawer from "@components/drawer";
import { ReactNode } from "react";
import AddNewUser from "./add";
import ManualSection from "./manual";

const UserManagementHeader = function (props: { children?: ReactNode }) {
    return (
        <>
            <GlobalHeader title="USER MANAGEMENT">
                {props.children}
                <Divider type="vertical" />
                <OpenDrawer
                    title="Add New User"
                    buttonProps={{ icon: <UserAddOutlined /> }}
                    buttonChildren={<>Add New User</>}
                    drawerProps={{ destroyOnClose: true }}
                >
                    {/* <AddNewForm /> */}
                    <br />
                    <AddNewUser />
                </OpenDrawer>
                <Divider type="vertical" />
                <ManualSection />
            </GlobalHeader>
        </>
    );
};

export default UserManagementHeader;
