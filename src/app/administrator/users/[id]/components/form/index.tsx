import React from "react";
import { fetchOffices, fetchUser } from "./preload";
import { Alert, Result } from "antd";
import AddUserForm from "./form";

async function AddNewUser(props: { id: string }) {
    const offices = await fetchOffices();
    const preloadData = await fetchUser(props.id);
    return (
        <>
            {preloadData?.error ? (
                <Result status="error" title="Failed To Fetch Data" />
            ) : (
                <AddUserForm offices={offices} preloadData={preloadData as any} />
            )}
            <br />
            <Alert
                message="Data Privacy"
                description="Data collection and usage are strictly in adhere with the Data Privacy Agreement Produced for this Software"
            />
        </>
    );
}

export default AddNewUser;
