'use client';
import { App, Table, TableColumnsType } from 'antd';
import { ForwardedRef, forwardRef } from 'react';
//components
import Previewheader from '../_components/previewheader';
import NoticeOfAward from './noa';
//configs


//
const AwardingPreview = forwardRef(function (props: { data: any, active?: "noa" | "recommend" | "approve", supplier?: any[] }, ref: ForwardedRef<any>) {
    return (
        <div ref={ref} style={{ minWidth: 'inherit', backgroundColor: 'white', borderRadius: 8, color: 'darkslategray', display: 'grid', gridTemplateRows: 'auto auto 1fr auto' }}>
            {
                (() => {
                    switch (props.active) {
                        case 'noa':
                            return <><NoticeOfAward data={props.data} /></>
                        case 'recommend':
                            return <></>
                        case 'approve':
                            return <></>
                        default:
                            return <></>
                    }
                })()
            }
            <br />
        </div>
    )
})


export default AwardingPreview;