import { fetchDepartmentsWithSection } from "@state/entities/preload";
import RenderTable from "./components/render-table";
async function Departments() {
    const data = await fetchDepartmentsWithSection();
    return (
        <div>
            <RenderTable data={data as any} />
        </div>
    );
}

export default Departments;
