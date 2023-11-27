import { QuestionCircleOutlined, UserAddOutlined } from "@ant-design/icons";
import { Divider } from "antd";
import GlobalHeader from "@components/admin/header";
import Manual from "@components/shared/manual";
import OpenDrawer from "@components/drawer";
import { ReactNode } from "react";
import AddNewUser from "./add";

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
                <Manual
                    icon={<QuestionCircleOutlined />}
                    buttonProps={{ type: "text" }}
                    drawerProps={{ title: "Users Management Manual" }}
                    pageProp={{ id: "", name: "User Management" }}
                />
            </GlobalHeader>
        </>
    );
};

export default UserManagementHeader;
