"use client";
//libs
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Divider } from "antd";
import { memo } from "react";
//components
import GlobalHeader from "@components/admin/header";
//types
interface UserManagementHeaderProps {}
//
const SupplierManagementHeader = function (props: UserManagementHeaderProps) {
    return (
        <>
            <GlobalHeader title="SUPPLIERS">
                <Button icon={<QuestionCircleOutlined />} type="text" />
            </GlobalHeader>
        </>
    );
};

export default memo(SupplierManagementHeader);
