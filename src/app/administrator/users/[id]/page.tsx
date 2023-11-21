//
import { fetchUser } from "@state/users/preload";
//
import { Alert, Button, Card, Divider, Flex, Segmented } from "antd";
import { CSSProperties } from "react";
import AvatarPreview from "./_components/details/avatar-view";
import UserType from "./_components/details/user-type";
import Content from "./_components/details/content";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import EditUser from "./_components/edit/open-drawer-edit";
import FormComponent from "./_components/edit/";

const WrapperStyle: CSSProperties = {
    position: "relative",
    overflowY: "auto",
    height: "calc(100vh - 170px)",
    width: "100%",
};

const ScrollView: CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    padding: "15px 25px",
};

async function UserInfoPage(props: { params: { id: string } }) {
    const { id } = props.params;
    const data = await fetchUser(id);
    return (
        <Card
            title={`${data.fullname}`}
            style={{ borderRadius: 0, height: "inherit" }}
            bodyStyle={{ padding: 0, margin: 0 }}
        >
            <div style={WrapperStyle}>
                <div style={ScrollView}>
                    <AvatarPreview profile={data.profile as any} name={data.fullname} />
                    <UserType userType={data.userType} />
                    <br />
                    <Content data={data} />
                    <Divider />
                    <EditUser
                        content="Edit User Info"
                        btnProps={{ icon: <EditOutlined />, block: true, type: "primary" }}
                        title="Edit User"
                    >
                        <FormComponent id={props.params.id} />
                    </EditUser>
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
                </div>
            </div>
        </Card>
    );
}

export default UserInfoPage;
