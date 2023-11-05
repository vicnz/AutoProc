import { PrismaModels } from "@lib/db";
import { Descriptions, Divider } from "antd";
import { memo } from "react";

type UserDetailsFormProps = {
    data: Omit<
        Partial<PrismaModels["users"] & { fullname: string; department: string | null; section: string | null }>,
        "profile"
    >;
};

const PreviewPane = (props: UserDetailsFormProps) => {
    return (
        <>
            <Divider>PERSONAL INFORMATION</Divider>
            <Descriptions layout="vertical" bordered size="small" column={1}>
                <Descriptions.Item label="First Name">{props.data.fname || "-"}</Descriptions.Item>
                <Descriptions.Item label="Middle Name">{props.data.mname || "-"}</Descriptions.Item>
                <Descriptions.Item label="Last Name">{props.data.lname || "-"}</Descriptions.Item>
                <Descriptions.Item label="Suffix">{props.data.suffix || "-"}</Descriptions.Item>
            </Descriptions>
            <Divider>CONTACT INFO</Divider>
            <Descriptions layout="vertical" bordered size="small" column={1}>
                <Descriptions.Item label="Email">{props.data.email || "-"}</Descriptions.Item>
                <Descriptions.Item label="Phone">{props.data.phone || "-"}</Descriptions.Item>
                <Descriptions.Item label="Link">{props.data.link || "-"}</Descriptions.Item>
            </Descriptions>
        </>
    );
};

export default memo(PreviewPane);
