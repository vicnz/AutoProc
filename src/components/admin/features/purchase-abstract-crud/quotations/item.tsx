"use client";

/**
 * * - Abstract Quotation Sub-Feature Abstract Item
 * * - Quotation Editing
 */

import { Form, Input, InputNumber } from "antd";
import { forwardRef, memo } from "react";

//types
interface QuotationItemProps {
    quotations: any[]; //TODO requied genuine type
    restFields: any;
    RowKey: any;
    name: any;
}

///
const QuotationItem = forwardRef(function QuotationItemWrapper(
    props: QuotationItemProps,
    ref
) {
    // distructure
    const { quotations, restFields, RowKey, name } = props;

    return (
        <div ref={ref as any}>
            <Form.Item hidden name="supplier" key="supplier">
                <Input hidden />
            </Form.Item>
            <Form.Item hidden name="id" key="id">
                <Input hidden />
            </Form.Item>
            <Form.List name={[name, "particulars"]} {...restFields}>
                {(fields) => (
                    <>
                        {fields.map(({ key: ColKey, name, ...restFields }) => (
                            <Form.Item
                                {...restFields}
                                name={[name, "total"]}
                                key={ColKey + "-column-item"}
                                label={
                                    <span>
                                        {quotations[RowKey].particulars[ColKey].description}
                                    </span>
                                }
                            >
                                <InputNumber
                                    min={0}
                                    style={{ width: "100%" }}
                                    addonBefore={<>&#8369;</>}
                                />
                            </Form.Item>
                        ))}
                    </>
                )}
            </Form.List>
        </div>
    );
});

export default memo(QuotationItem);
