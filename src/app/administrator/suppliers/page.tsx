import AddNewSupplier from "./components/add";
import RenderList from "./components/render-items";
import { preload } from "@state/suppliers/preloads";

async function SupplierPage() {
    const data = await preload();
    return (
        <div style={{ padding: 10 }}>
            <RenderList data={data} />
            <AddNewSupplier />
        </div>
    );
}

export default SupplierPage;
