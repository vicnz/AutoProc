import React from "react";
import { fetchOffices } from "./preload";
import { Alert } from "antd";
import AddUserForm from "./form";

async function AddNewUser() {
    const offices = await fetchOffices();
    return (
        <>
            {/* TODO Seperate Profile Image Updater */}
            <AddUserForm offices={offices} />
            <br />
            <Alert
                message="Data Privacy"
                description="Data collection and usage are strictly in adhere with the Data Privacy Agreement Produced for this Software"
            />
        </>
    );
}

export default AddNewUser;
