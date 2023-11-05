"use client";

/**
 * * - REQUEST FOR PRICE QUOTATION CRUD
 * * - Manage Request For Price Quotation
 * * - Select Suppliers
 */

import { EditOutlined } from "@ant-design/icons";
import { Button, Drawer, Skeleton } from "antd";
import { memo, useState } from "react";
import { mutate } from "swr";
import dynamic from "next/dynamic";

//FORM EDIT CONTROL
const FormEdit = dynamic(async () => await import("./form"), {
    loading: () => <Skeleton active />,
});

//props
interface ProceQuotationFormProps {
    data: any; //TODO : Create a valid Type for this
}

const PriceQuotationForm = function (props: ProceQuotationFormProps) {
    const { final, id } = props.data;

    const [open, setOpen] = useState(false); //OPEN DRAWER

    //Close Drawer
    const onClose = () => {
        setOpen(false);
        mutate(`/administrator/api/procurement/rfq?_id=${encodeURIComponent(id)}`);
    };

    //
    return (
        <>
            <Button onClick={() => setOpen(true)} icon={<EditOutlined />} type="primary" disabled={final}>
                Edit RFQ
            </Button>
            <Drawer destroyOnClose open={open} onClose={onClose} title="Edit">
                <FormEdit data={props.data} close={() => setOpen(false)} />
            </Drawer>
        </>
    );
};

export default memo(PriceQuotationForm);
