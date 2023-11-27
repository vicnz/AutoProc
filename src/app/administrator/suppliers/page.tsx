import RenderList from "./components/render-items";
import { preload } from "./preload";

async function SupplierPage() {
    const data = await preload();
    if (data.error || typeof data.data === "undefined") throw new Error("Server Error");
    return (
        <div style={{ padding: 10 }}>
            <RenderList data={data.data} />
        </div>
    );
}

export default SupplierPage;
