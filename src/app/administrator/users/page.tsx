import { Table } from "antd";
// ─────────────────────────────────────────────────────────────────────────────
import ContentWrapper from "@components/admin/content";
import Header from "./components/header";
import Columns from "./components/column";
import { fetchAllUsers } from "@state/users/preload";
import { fetchSetting } from "@state/users/settings";
// ─── Prop Type ───────────────────────────────────────────────────────────────
type PageProps = {
    params: { slug: string };
    searchParams?: {
        page: number;
    };
};
// ─── Route Config ────────────────────────────────────────────────────────────
export const revalidate = 5;
// ─── Base Component ──────────────────────────────────────────────────────────
async function Page(props: PageProps) {
    const page = props.searchParams?.page || "0";
    // ─────────────────────────────────────────────────────────────────────
    const settings = await fetchSetting();
    const data = await fetchAllUsers(page as unknown as string, settings.size); //fixed size 8
    return (
        <ContentWrapper header={<Header count={data.length} size={settings.size} />}>
            <Table columns={Columns as any} dataSource={data} pagination={false} bordered />
        </ContentWrapper>
    );
}

export default Page;
