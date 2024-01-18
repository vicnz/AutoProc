"use client";

/**
 * * - ABSTRACT QUOTATION CRUD FEATURE
 * * - Manage Abstract Quotation Items
 */

/**
 * !NOTE: Abstract Quotation Data are static in NATURE
 * !    - That's why it requires the need to mark the [PR] and
 * !    - [Request For Quotation] to be FINAL and free of
 * !    - Uneccessary Modification
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
//Type
interface AbstractQuotationEditProps {
    data: any; //TODO : create a genuine type for this
}

//
const AbstractQuotationEdit = function (props: AbstractQuotationEditProps) {
    const { lowestBidder, location, quotations, date, suppliers, id, final, calculatedQuotations } =
        props.data;

    const [open, setOpen] = useState(false); //OPEN DRAWER

    //CLOSE DRAWER
    const onClose = () => {
        setOpen(false);
        mutate(`/administrator/api/procurement/abstract?_id=${encodeURIComponent(id)}`);
    };

    //
    return (
        <>
            <Button
                onClick={() => setOpen(true)}
                icon={<EditOutlined />}
                type="primary"
                disabled={final}
            >
                Edit Abstract
            </Button>
            {" "}
            <Drawer
                destroyOnClose
                open={open}
                onClose={onClose}
                title="Edit Abstract of Quotation"
            >
                <FormEdit
                    data={{ lowestBidder, location, quotations, date, suppliers, id }}
                    close={() => setOpen(false)}
                />
            </Drawer>
        </>
    );
};

export default memo(AbstractQuotationEdit);
