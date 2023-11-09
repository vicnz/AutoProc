import ContentWrapper from "@components/admin/content";
import Header from "./components/header";
import { Table } from "antd";
import Columns from "./components/column";
import { fetchAllUsers } from "@state/users/preload";

type PageProps = {
    params: { slug: string };
    searchParams?: {
        page: number;
        size: number;
    };
};

export const revalidate = 5;
async function Page(props: PageProps) {
    //TODO fix conditional page size
    const page = props.searchParams?.page || "0";

    const data = await fetchAllUsers(page as unknown as string); //fixed size 8
    return (
        <ContentWrapper header={<Header count={data.length} />}>
            <Table columns={Columns as any} dataSource={data} pagination={false} bordered />
        </ContentWrapper>
    );
}

export default Page;
