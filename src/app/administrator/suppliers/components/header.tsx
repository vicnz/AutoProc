"use client";
//libs
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Divider } from "antd";
import { memo } from "react";
//components
import GlobalHeader from "@components/admin/header";
import Manual from "@components/shared/manual";
//types
interface UserManagementHeaderProps {}
//
const SupplierManagementHeader = function (props: UserManagementHeaderProps) {
    return (
        <>
            <GlobalHeader title="SUPPLIERS">
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
