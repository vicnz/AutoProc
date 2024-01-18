import { PlusCircleOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { memo } from "react";
import GlobalHeader from "@components/global-header";
import OpenDrawer from "@components/drawer";
import AddForm from "./add";
import Manual from "@components/shared/manual";
import { Divider } from "antd";
//types
interface UserManagementHeaderProps { }
//
const SupplierManagementHeader = function (props: UserManagementHeaderProps) {
    return (
        <>
            <GlobalHeader title="SUPPLIERS">
                <OpenDrawer
                    buttonChildren={<>Add Supplier</>}
                    buttonProps={{ icon: <PlusCircleOutlined /> }}
                    title="Add New Supplier"
                    drawerProps={{ destroyOnClose: true }}
                >
                    <AddForm />
                </OpenDrawer>
                <Divider type="vertical" />
                <Manual
                    icon={<QuestionCircleOutlined />}
                    buttonProps={{ type: "text" }}
                    drawerProps={{ title: "Supplier Management Manual" }}
                    pageProp={{ id: "", name: "Supplier Management" }}
                />
            </GlobalHeader>
        </>
    );
};

export default memo(SupplierManagementHeader);
