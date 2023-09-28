'use client';
import { App, Table, TableColumnsType } from 'antd';
import { ForwardedRef, forwardRef } from 'react';
//components
import PriceQuotationPreview from './price-quotation-preview';
import RecieptPreview from './receipt-preview';
//configs


//
const RequestForQuotationPreview = forwardRef(function (props: { data: any, reciept?: boolean, supplier?: string }, ref: ForwardedRef<any>) {
    return (
        <div ref={ref} style={{ minWidth: 'inherit', backgroundColor: 'white', borderRadius: 8, color: 'darkslategray', display: 'grid', gridTemplateRows: 'auto auto 1fr auto' }}>
            {
                props.reciept === true ?
                    <RecieptPreview data={props.data} />
                    :
                    <PriceQuotationPreview data={props.data} supplier={props.supplier} />
            }
            <br />
        </div>
    )
})


export default RequestForQuotationPreview;