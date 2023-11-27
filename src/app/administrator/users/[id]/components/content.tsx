"use client";

import OpenLink from "@components/shared/open-link";
import { Descriptions } from "antd";
import React from "react";

function UserDetailsContent(props: { data: any }) {
    const { fname, mname, lname, suffix, department, section, email, phone, link } = props.data;
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
                <Descriptions.Item label={"First Name"}>{fname}</Descriptions.Item>
                <Descriptions.Item label="Middle Name">{mname || "-"}</Descriptions.Item>
                <Descriptions.Item label="Last Name">{lname}</Descriptions.Item>
                <Descriptions.Item label="Suffix">{suffix || "-"}</Descriptions.Item>
            </Descriptions>
            <br />
            <Descriptions title="Office Designation" column={1} bordered size={"small"} layout="horizontal">
                <Descriptions.Item label="Department">{department || "-"}</Descriptions.Item>
                <Descriptions.Item label="Section">{section || "-"}</Descriptions.Item>
            </Descriptions>
            <br />
            <Descriptions title="Contact Information" column={1} bordered size={"small"} layout="horizontal">
                <Descriptions.Item label="Email">
                    {email && (
                        <OpenLink text={email} type="email">
                            <span>{email}</span>
                        </OpenLink>
                    )}
                </Descriptions.Item>
                <Descriptions.Item label="Phone">
                    {phone && (
                        <OpenLink text={phone} type="phone">
                            <span>{phone}</span>
                        </OpenLink>
                    )}
                </Descriptions.Item>
                <Descriptions.Item label="Social Link">
                    {link && (
                        <OpenLink text={link} type="url">
                            <span>{link}</span>
                        </OpenLink>
                    )}
                </Descriptions.Item>
            </Descriptions>
        </>
    );
}

export default UserDetailsContent;
