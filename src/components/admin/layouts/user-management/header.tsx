"use client";
//libs
import {
    ArrowLeftOutlined,
    ArrowRightOutlined,
    QuestionCircleOutlined,
} from "@ant-design/icons";
import { Button, Divider } from "antd";
import { Dispatch, memo } from "react";
//components
import GlobalHeader from "@components/admin/header";
//types
interface UserManagementHeaderProps {
    count: number;
    setCurrentPage: Dispatch<number>;
    currentPage: number;
    size: number;
}
//
const UserManagementHeader = function (props: UserManagementHeaderProps) {
    //Go Back To Previous Data Set
    const prevPage = () => {
        if (props.currentPage >= props.size) {
            props.setCurrentPage(props.currentPage - props.size);
        }
    };

    //Next Data Set
    const nextPage = () => {
        if (props?.count > 0) {
            props.setCurrentPage(props.currentPage + props.size);
        }
    };

    return (
        <>
            <GlobalHeader title="USER MANAGEMENT">
                <Button
                    icon={<ArrowLeftOutlined />}
                    type="text"
                    onClick={() => prevPage()}
                >
                    Prev
                </Button>
                <Button
                    icon={<ArrowRightOutlined />}
                    type="text"
                    onClick={() => nextPage()}
                >
                    Next
                </Button>
                <Divider type="vertical" />
                <Button icon={<QuestionCircleOutlined />} type="text" />
            </GlobalHeader>
        </>
    );
};

export default memo(UserManagementHeader);
