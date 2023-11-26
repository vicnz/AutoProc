import Description from "./components/description";
import OfficeSelector from "./components/form";
import db from "@lib/db";

const preload = async () => {
    const departments = await db.departments.findMany({
        select: {
            description: true,
            id: true,
            sections: {
                select: {
                    id: true,
                    description: true,
                },
            },
        },
        where: {
            isDeleted: false,
        },
    });
    // ─────────────────────────────────────────────────────────────────────
    const officeDesignate = await Promise.all(
        departments.map(async (item) => {
            let mapped: any[] = [];
            if (item.sections.length > 0) {
                mapped = item.sections.map((section) => {
                    return { label: section.description?.substring(0, 30) + "...", value: section.id };
                });
                //FIXME CAUSES AN ERROR NULL OFFICE TYPE
                // mapped.unshift({ label: "Default", value: "" });
            }

            return {
                label: item.description?.substring(0, 30) + "...",
                value: item.id,
                children: mapped,
            };
        })
    );

    return officeDesignate;
};

async function TrackerPage() {
    const data = await preload();
    return (
        <>
            <br />
            <Description />
            <OfficeSelector data={data} />
            <br />
            <br />
        </>
    );
}

export default TrackerPage;
