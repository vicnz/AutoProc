import UserViewLayout from "@components/admin/layouts/user-item/layout";
import UserId from "@components/admin/layouts/user-item/context-id";
import Content from "@components/admin/layouts/user-item";

const Page = function (props: { params: { id: string } }) {
    return (
        <>
            <UserId id={props.params.id}>
                <UserViewLayout>
                    <Content />
                </UserViewLayout>
            </UserId>
        </>
    );
};

export default Page;
