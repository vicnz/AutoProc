//libs
import { QuestionCircleOutlined, UserAddOutlined } from "@ant-design/icons";
import { Button, Divider } from "antd";
//components
import GlobalHeader from "@components/admin/header";
import Paginate from "./paginate";
import OpenAddDrawer from "./open-drawer-edit";
import AddNewForm from "./add-new";

const UserManagementHeader = function (props: { count: number }) {
    return (
        <>
            <GlobalHeader title="USER MANAGEMENT">
                <Paginate count={props.count} />
                <Divider type="vertical" />
                <OpenAddDrawer content="Add New User" btnProps={{ icon: <UserAddOutlined /> }} title="Add New User">
                    <AddNewForm />
                </OpenAddDrawer>
                <Divider type="vertical" />
                <Button icon={<QuestionCircleOutlined />} type="text" />
            </GlobalHeader>
        </>
    );
};

export default UserManagementHeader;
