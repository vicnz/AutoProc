//
import { fetchUser } from "./preload";
//
import { Alert, Button, Card, Divider } from "antd";
import AvatarView from "./components/avatar-view";
import UserInfo from "./components/content";
import { DeleteOutlined } from "@ant-design/icons";
import { notFound } from "next/navigation";
import ScrollView from "@components/scrollview";
import DrawerOpener from "@components/drawer";
import EditUser from "./components/form";

async function UserInfoPage(props: { params: { id: string } }) {
    const { id } = props.params;
    const data = await fetchUser(id);
    if (data?.error) notFound();

    return (
        <Card
            title={`${data.fullname}`}
            style={{ borderRadius: 0, height: "inherit" }}
            bodyStyle={{ padding: 0, margin: 0 }}
            extra={
                <>
                    <Button style={{ pointerEvents: "none" }} type="dashed" shape="round">
                        {data.userType}
                    </Button>
                </>
            }
        >
            <ScrollView height={"calc(100vh - 170px)"}>
                <div style={{ padding: "15px 25px" }}>
                    <AvatarView profile={data.profile as string} name={data.fullname} />
                    <br />
                    <UserInfo
                        data={{
                            fname: data.fname,
                            lname: data.lname,
                            mname: data.mname,
                            suffix: data.suffix,
                            username: data.username,
                            department: data.department,
                            section: data.section,
                            email: data.email,
                            phone: data.phone,
                            link: data.link,
                        }}
                    />
                    <Divider />
                    <DrawerOpener
                        drawerProps={{ destroyOnClose: true }}
                        title="Edit User"
                        buttonChildren={<>Edit User</>}
                        buttonProps={{ type: "primary", block: true, size: "middle" }}
                    >
                        <EditUser id={props.params.id} />
                    </DrawerOpener>

                    {/* TODO section */}
                    <Divider>Danger Section</Divider>
                    <Alert
                        message="Delete User"
                        type="error"
                        description={
                            <>
                                <span>
                                    This Feature is heavily under Testing-Phase to assure proper clean data integrity
                                    and prevent unhandle system errors. We temporarily disabled this feature for the
                                    sole purpose of testing its back-end business layer.
                                </span>
                                <br />
                                <br />
                                <Button danger icon={<DeleteOutlined />} block type="primary" disabled>
                                    Delete User
                                </Button>
                            </>
                        }
                    />
                    {/* TODO Section */}
                </div>
            </ScrollView>
        </Card>
    );
}

export default UserInfoPage;
