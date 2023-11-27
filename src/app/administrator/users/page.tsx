// ─────────────────────────────────────────────────────────────────────────────
import { Table } from "antd";
import ContentWrapper from "@components/content";
import Header from "./components/header";
import Columns from "./components/column";
import PageControl from "./components/page-control";
import { fetchAllUsers, fetchSetting } from "./preload";
// ─── Prop Type ───────────────────────────────────────────────────────────────
type PageProps = {
    params: { slug: string };
    searchParams?: {
        page: number;
    };
};
// ─── Base Component ──────────────────────────────────────────────────────────
async function Page(props: PageProps) {
    let page = props.searchParams?.page || "0";
    page = Math.abs(Number.parseInt(page as string));
    page = Number.isNaN(page) ? 0 : page;
    // ─────────────────────────────────────────────────────────────────────
    const settings = await fetchSetting();
    const data = await fetchAllUsers(`${page * settings.size}`, settings.size);
    return (
        <ContentWrapper
            header={
                <Header>
                    <PageControl page={Number(page)} count={data.length} />
                </Header>
            }
        >
            <Table columns={Columns as any} dataSource={data} pagination={false} bordered />
        </ContentWrapper>
    );
}

export default Page;
