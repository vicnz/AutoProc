"use client";

import OpenLink from "@components/shared/open-link";
import { Descriptions } from "antd";
import React from "react";

function UserDetailsContent(props: { data: any }) {
    const { data } = props;
    return (
        <>
            <Descriptions
                title="Personal Information"
                column={1}
                size="small"
                bordered
                layout="horizontal"
                labelStyle={{ maxWidth: 50 }}
            >
                <Descriptions.Item label={"First Name"}>{data.fname}</Descriptions.Item>
                <Descriptions.Item label="Middle Name">{data.mname || "-"}</Descriptions.Item>
                <Descriptions.Item label="Last Name">{data.lname}</Descriptions.Item>
                <Descriptions.Item label="Suffix">{data.suffix || "-"}</Descriptions.Item>
            </Descriptions>
            <br />
            <Descriptions title="Office Designation" column={1} bordered size={"small"} layout="horizontal">
                <Descriptions.Item label="Department">{data.department || "-"}</Descriptions.Item>
                <Descriptions.Item label="Section">{data.section || "-"}</Descriptions.Item>
            </Descriptions>
            <br />
            <Descriptions title="Contact Information" column={1} bordered size={"small"} layout="horizontal">
                <Descriptions.Item label="Email">
                    {data.email && (
                        <OpenLink text={data.email} type="email">
                            <span>{data.email}</span>
                        </OpenLink>
                    )}
                </Descriptions.Item>
                <Descriptions.Item label="Phone">
                    {data.phone && (
                        <OpenLink text={data.phone} type="phone">
                            <span>{data.phone}</span>
                        </OpenLink>
                    )}
                </Descriptions.Item>
                <Descriptions.Item label="Social Link">
                    {data.link && (
                        <OpenLink text={data.link} type="url">
                            <span>{data.link}</span>
                        </OpenLink>
                    )}
                </Descriptions.Item>
            </Descriptions>
        </>
    );
}

export default UserDetailsContent;
