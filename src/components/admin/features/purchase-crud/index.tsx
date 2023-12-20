"use client";

/**
 * * PURCHASE REQUEST CRUD CONTROLLER
 * * This is the API that handles the CREATION and MODIFICATION of Purchase Request
 * * This Feature is still in BETA and still inquire further development
 */

//LIBRARIES
import dynamic from "next/dynamic";
import useSWR, { mutate } from "swr";
import { EditOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Drawer, Result, Skeleton } from "antd";
import { ReactNode, useState } from "react";
//COMPONENTS
const PurchaseRequestForm = dynamic(async () => await import("./form"), {
    loading: () => <Skeleton active />,
});

// types
interface PurchaseRequestEditorProps {
    prId?: string;
    type: "add" | "edit";
    final?: boolean;
    children?: ReactNode;
}

//
const PurchaseRequestEditor = function (props: PurchaseRequestEditorProps) {
    const [open, setOpen] = useState(false); //DRAWER CONTROLLER

    const onClose = () => {
        mutate("/administrator/api/records"); //TRIGGER AN UPDATE THAT WILL REFLECT ON THE CLIENT SIDE
        setOpen(false); //CLOSE DRAWER
    };

    //
    return (
        <>
            {props.type === "add" && typeof props.prId === "undefined" ? (
                <Button
                    icon={<PlusCircleOutlined />}
                    onClick={() => setOpen(true)}
                >
                    {props.children || "New Purchase Request"}
                </Button>
            ) : (
                <Button
                    icon={<EditOutlined />}
                    type="primary"
                    onClick={() => setOpen(true)}
                    disabled={props.final}
                >
                    {props.children || "Edit PR"}
                </Button>
            )}

            {/* DRAWER SECTION */}
            <Drawer
                size="large"
                destroyOnClose
                open={open}
                onClose={onClose}
                title={
                    props.type === "add" && typeof props.prId === "undefined"
                        ? "CREATE NEW PR"
                        : "EDIT PR"
                }
            >
                {props.type === "add" && typeof props.prId === "undefined" ? (
                    // ? - CREATE NEW FORM
                    <PurchaseRequestForm close={() => setOpen(false)} isEdit={false} />
                ) : (
                    //? - EDIT PR FORM
                    <FormWithData
                        close={() => setOpen(false)}
                        id={props.prId as string}
                    />
                )}
            </Drawer>
        </>
    );
};


/**
 * ? - PRELOAD FORM WITH DATA
 */

const FormWithData = function (props: { id: string; close: any }) {

    const { data, error, isLoading, isValidating } = useSWR(
        `/administrator/api/procurement/pr?_id=${encodeURIComponent(props.id)}`
    );

    //FETCHING ERROR
    if (error) {
        return (
            <>
                <Result status={"error"} title="Unable To Fetch Data" />
            </>
        );
    }

    //AWAITING DATA
    if (!data || isLoading) {
        return (
            <>
                <Skeleton active />
            </>
        );
    }
    //RENDER DATA
    return (
        <>
            <PurchaseRequestForm
                data={data}
                close={() => props.close(false)}
                isEdit={true}
                prId={props.id}
            />
        </>
    );
};

export default PurchaseRequestEditor;
