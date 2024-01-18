import React, { Fragment } from "react";
import { fetchUser } from "./preload";
import Form from "./form";
import { fetchOfficeDesignation } from "./preload";

async function PreloadFormData(props: { id: string }) {
    const user = await fetchUser(props.id);
    const officeSelection = await fetchOfficeDesignation();
    return (
        <Fragment>
            <Form data={officeSelection as any} userData={user} />
        </Fragment>
    );
}

export default PreloadFormData;
