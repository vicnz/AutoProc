import db from "@lib/db";
import PreviewSupplier from "./components/modal";
import { notFound } from "next/navigation";

const preload = async (id: string) => {
    const result = await db.suppliers.findFirst({
        where: {
            id,
            isDeleted: false,
        },
    });

    if (result) {
        return result;
    } else {
        notFound();
    }
};

async function SupplierItem(props: { params: { id: string } }) {
    const data = await preload(props.params.id);
    return <PreviewSupplier data={data} />;
}

export default SupplierItem;
