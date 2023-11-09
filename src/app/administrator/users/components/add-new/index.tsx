import db from "@lib/db";
import React, { Fragment } from "react";
import Form from "./form";

const preload = async () => {
    const departments = await db.departments.findMany({
        select: {
            description: true,
            id: true,
        },
        where: {
            isDeleted: false,
        },
    });

    //map result
    const officeDesignate = await Promise.all(
        departments.map(async (item) => {
            const sections = await db.sections.findMany({
                select: { description: true, id: true },
                where: { departmentId: item.id, isDeleted: false },
            });
            const mapped = sections.map((section) => ({ label: section.description, value: section.id }));
            if (sections.length > 0) {
                mapped.unshift({ label: "Default", value: "" });
            }
            return {
                label: item.description,
                value: item.id,
                children: mapped,
            };
        })
    );

    return officeDesignate;
};

async function PreloadFormData() {
    const officeSelection = await preload();
    return (
        <Fragment>
            <Form data={officeSelection as any} />
        </Fragment>
    );
}

export default PreloadFormData;
