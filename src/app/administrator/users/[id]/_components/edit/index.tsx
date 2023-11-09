import React, { Fragment } from "react";
import { fetchUser } from "@state/users/preload";
import Form from "./form";
import { fetchOfficeDesignation } from "@state/users/preload";

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
