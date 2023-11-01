"use client";

/**
 * * - PURCHASE ORDER CRUD
 * * - Create and Edit Purchase Order
 */

import { EditOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Drawer, Result, Skeleton } from "antd";
import { ReactNode, useState } from "react";
import dynamic from "next/dynamic";
import useSWR, { mutate } from "swr";
import { usePRId } from "@components/admin/pr-number"; //TODO
//components
const PurchaseOrderForm = dynamic(async () => await import("./form"), {
    loading: () => <Skeleton active />,
});

// types
interface AddNewPurchaseRequestProps {
    prId: string;
    type: "add" | "edit";
    final?: boolean,
    children?: ReactNode
}

const PurchaseOrderFormEdit = function (props: AddNewPurchaseRequestProps) {
    const [open, setOpen] = useState(false); //set open

    const onClose = () => {
        mutate(`/administrator/api/procurement/po?_id=${encodeURIComponent(props.prId || '')}`); //update records
        setOpen(false);
    };

    //
    return (
        <>
            {props.type === 'add' ?
                <>
                    <Button
                        icon={<PlusCircleOutlined />}
                        type="text"
                        onClick={() => setOpen(true)}
                    >
                        {props.children || 'Add PO'}
                    </Button>
                    <Drawer
                        destroyOnClose
                        open={open}
                        onClose={onClose}
                        closable={true}
                        title="Add PO"
                    >
                        <PurchaseOrderForm close={() => setOpen(false)} isEdit={false} prID={props.prId} />
                    </Drawer>
                </>
                :
                <>
                    <Button
                        icon={<EditOutlined />}
                        type="primary"
                        onClick={() => setOpen(true)}
                        disabled={props.final}
                    >
                        {props.children || 'Edit PO'}
                    </Button>
                    <Drawer
                        destroyOnClose
                        open={open}
                        onClose={onClose}
                        closable={true}
                        title="Edit PO"
                    >
                        <AddFormWithData close={setOpen} id={props?.prId as string} />
                    </Drawer>
                </>
            }
        </>
    );
};

//
const AddFormWithData = function (props: { id: string; close: any }) {
    const { data, error, isLoading, isValidating } = useSWR(
        `/administrator/api/procurement/po?_id=${encodeURIComponent(props.id)}`
    );

    if (error) {
        return (
            <>
                <Result status={"error"} title="Unable To Fetch Data" />
            </>
        );
    }

    if (!data || isLoading) {
        return <Skeleton active />
    }

    return (
        <>
            {!data || isLoading ? (
                <Skeleton active />
            ) : (
                <PurchaseOrderForm data={data} close={() => props.close(false)} isEdit={true} prID={props.id} />
            )}
        </>
    );
};

export default PurchaseOrderFormEdit;
