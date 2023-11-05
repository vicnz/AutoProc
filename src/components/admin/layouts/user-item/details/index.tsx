/**
 * * DETAILS PREVIEW OF USER
 */
import { Card, Descriptions, Divider, Flex, Segmented } from "antd";
import { memo } from "react";
import { PrismaModels } from "@lib/db";
import Avatar from "@components/admin/features/users-crud/avatar";
import EditUser from "@components/admin/features/users-crud";
import { CheckCircleOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import OpenLink from "@components/shared/open-link";

type UserDetailsProps = PrismaModels["users"] & { fullname: string; department: string | null; section: string | null };
function UserDetails(props: { data: UserDetailsProps }) {
    const { data } = props;
    return (
        <>
            <Card
                title={`${data.fullname || ""}`}
                style={{ borderRadius: 0, height: "inherit" }}
                bodyStyle={{ padding: 0 }}
                extra={
                    <>
                        {/* OPEN USER EDITOR */}
                        <EditUser edit id={data.id} />
                    </>
                }
            >
                <div
                    style={{
                        position: "relative",
                        overflowY: "auto",
                        height: "calc(100vh - 168px)",
                        width: "100%",
                    }}
                >
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            height: "100%",
                            width: "100%",
                            padding: "15px 25px",
                        }}
                    >
                        <Flex
                            align="center"
                            justify="center"
                            vertical
                            style={{ textAlign: "center", padding: "25px 25px" }}
                        >
                            <Avatar src={data.profile as unknown as Blob} readOnly />
                        </Flex>
                        <Flex justify="center" align="center">
                            <Segmented
                                options={[
                                    { label: "User", value: "USER", icon: <UserOutlined /> },
                                    { label: "Tracker", value: "TRACKER", icon: <SettingOutlined /> },
                                    { label: "Checker", value: "CHECKER", icon: <CheckCircleOutlined /> },
                                ]}
                                value={data.userType}
                                readOnly={true}
                            />
                        </Flex>
                        <Divider />
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
                        <Descriptions
                            title="Contact Information"
                            column={1}
                            bordered
                            size={"small"}
                            layout="horizontal"
                        >
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
                                {data.link && data.link.length < 1 && (
                                    <OpenLink text={data.link} type="url">
                                        <span>{data.link}</span>
                                    </OpenLink>
                                )}
                            </Descriptions.Item>
                        </Descriptions>
                        <br />
                        <br />
                    </div>
                </div>
            </Card>
        </>
    );
}

export default memo(UserDetails);
