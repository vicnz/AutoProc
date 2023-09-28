'use client';
//libs
import { CheckCircleOutlined, LockOutlined, MinusCircleOutlined, PaperClipOutlined, PlusCircleOutlined, PrinterOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { App, Button, Divider, Result, Segmented, Skeleton, Space, Tag, theme } from "antd";
import { useRef, useState } from "react";
import { useReactToPrint } from 'react-to-print';
import useSWR, { mutate } from "swr";
import { SegmentedValue } from "antd/es/segmented";
//componets
import PreviewPane from './preview';
import Pattern from '../_components/pattern';
import { usePrId } from '../pr-id-context';
import AddNewDocument from './addnew'
import NeedFinal from '../_components/document-need-final'
//configs
const { useToken } = theme
//

const Awarding = function () {
    const prId = usePrId()
    const { token } = useToken()
    const [activePane, setActivePane] = useState<"noa" | "recommend" | "approve">('noa')
    const printableComponent = useRef(null)
    const handlePrint = useReactToPrint({
        content: () => printableComponent.current
    })

    const { error, data, isLoading } = useSWR(`/administrator/api/records/award?_id=${prId}`, (...params) => fetch(...params).then(res => res.json()))
    if (error) {
        return <Result status={'500'} title="Network Error" subTitle="Please Try Again Later or Refresh the Page" />
    }
    if (!data || isLoading) {
        return <Skeleton active />
    } else {
        if (!(data.final as Array<{ final: boolean }>).every(item => item.final === true)) {
            return (
                <NeedFinal title="Complete Abstract of Quotation" subTitle="Purchase Request first needs to be completed" />
            )
        }
        else {
            if (data.result === null) {
                return <AddNewDocument data={data} id={prId} />
            }
            return (
                <div style={{ display: 'grid', gridTemplateRows: '56px 1fr', width: '100%', height: 'calc(100vh - 112px)' }}>
                    <div style={{ height: '56px', borderBottom: 'solid lightgray 1px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <p>BAC Resolution Recommendation</p>
                        <Space>
                            <Tag color='success'>Approved</Tag>
                            <Divider type="vertical" />
                            <Segmented defaultValue={'noa'} options={[{ icon: <PaperClipOutlined />, label: 'Notice', value: 'noa' }, { icon: <TeamOutlined />, label: "Recommend", value: "recommend" }, { icon: <UserOutlined />, label: "Approve", value: "approve" }]} onChange={(e) => setActivePane(e as "noa" | "recommend" | "approve")} />
                            <Button icon={<PrinterOutlined />} onClick={handlePrint}>Print</Button>
                        </Space>
                    </div>
                    <Pattern>
                        <PreviewPane ref={printableComponent} data={data.result} active={activePane} /> :
                    </Pattern>
                </div>
            )
        }
    }
}

export default Awarding;