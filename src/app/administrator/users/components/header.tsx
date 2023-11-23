//libs
import { QuestionCircleOutlined, UserAddOutlined } from "@ant-design/icons";
import { Divider } from "antd";
//components
import GlobalHeader from "@components/admin/header";
import Paginate from "./paginate";
import OpenAddDrawer from "./open-drawer-edit";
import AddNewForm from "./add-new";
import Manual from "@components/shared/manual";

const UserManagementHeader = function (props: { count: number; size: number }) {
    return (
        <>
            <GlobalHeader title="USER MANAGEMENT">
                <Paginate count={props.count} size={props.size} />
                <Divider type="vertical" />
                <OpenAddDrawer content="Add New User" btnProps={{ icon: <UserAddOutlined /> }} title="Add New User">
                    <AddNewForm />
                </OpenAddDrawer>
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
