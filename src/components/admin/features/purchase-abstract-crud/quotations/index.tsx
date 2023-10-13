"use client";

/**
 * * - ABSTRACT QUOTATION FEATURE CRUD (RENDER QUOTATIONS)
 * * - FORM LIST RENDERED
 */

import { FolderOpenOutlined, FolderOutlined } from "@ant-design/icons";
import { Collapse, FormListFieldData } from "antd";
import { forwardRef, memo, useMemo } from "react";

//QUOTATION ITEM COMPONENT
import QuotationItem from "./item";
//types
interface QuotationManagerProps {
    quotations: any[] //TODO : genuine type
    fields: FormListFieldData[]
}
//
const QuotationsManager = forwardRef(function QuotationManagerWrapper(
    props: QuotationManagerProps,
    ref
) {
    //destructure
    const { quotations, fields, ...rest } = props;

    //Render Items
    const renderItems = useMemo(() => {
        const items = fields.map(({ key: RowKey, name, ...restFields }) => {
            return {
                key: RowKey,
                label: <span>{quotations[RowKey].supplier}</span>,
                children: (
                    <>
                        <QuotationItem RowKey={RowKey} quotations={quotations} restFields={restFields} name={name} />
                    </>
                )
            }
        })
        return items;

    }, [fields, quotations])

    ///
    return (
        <Collapse
            {...rest}
            ref={ref as any}
            accordion
            expandIconPosition="end"
            expandIcon={({ isActive }) =>
                isActive ? <FolderOpenOutlined /> : <FolderOutlined />
            }
            items={renderItems}
        />
    );
});

export default memo(QuotationsManager);
