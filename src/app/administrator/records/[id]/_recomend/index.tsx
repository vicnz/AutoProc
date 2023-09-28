'use client';
//libs
import { PrinterOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Divider, Result, Segmented, Skeleton, Space, Switch, Tag, theme } from "antd";
import { memo, useRef, useState } from "react";
import { useReactToPrint } from 'react-to-print';
import useSWR from "swr";
import { SegmentedValue } from "antd/es/segmented";
//componets
import PreviewPane from './preview';
import Pattern from '../_components/pattern';
import { usePrId } from '../pr-id-context';
import AddNewDocument from './addnew';
import MakeSureItFinal from '../_components/document-need-final';
import SetFinal from './set-final'
//configs
const { useToken } = theme
//

const PurchaseRequest = function () {
    const prId = usePrId()
    const { token } = useToken()
    const [activePane, setActivePane] = useState<SegmentedValue>('recommend')
    const printableComponent = useRef(null)
    const handlePrint = useReactToPrint({
        content: () => printableComponent.current
    })

    const { error, data, isLoading } = useSWR(`/administrator/api/records/recommendation?_id=${prId}`, (...params) => fetch(...params).then(res => res.json()))

    if (error) {
        return <Result status={'500'} title="Network Error" subTitle="Please Try Again Later or Refresh the Page" />
    }

    if (!data || isLoading) {
        return <Skeleton active />
    } else {
        if (!(data.final as Array<{ id: string, final: boolean }>).every(item => item.final === true)) {
            return (
                <MakeSureItFinal title="Complete Purchase Request" subTitle="Purchase Request first needs to be completed">
                </MakeSureItFinal>
            )
        } else {
            if (data?.result === null) {
                return (
                    <AddNewDocument data={data.result} id={prId} />
                )
            }
            else {
                return (
                    <div style={{ display: 'grid', gridTemplateRows: '56px 1fr', width: '100%', height: 'calc(100vh - 112px)' }}>
                        <div style={{ height: '56px', borderBottom: 'solid lightgray 1px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <p>BAC Resolution Recommendation</p>
                            <Space>
                                <SetFinal id={data.result.id} final={data.result.final} />
                                <Divider type="vertical" />
                                <Segmented defaultValue={'recommend'} options={[{ icon: <TeamOutlined />, label: 'Recommend', value: 'recommend' }, { icon: <UserOutlined />, label: "Approve", value: "approve" }]} onChange={e => setActivePane(e)} />
                                <Button icon={<PrinterOutlined />} onClick={handlePrint}>Print</Button>
                            </Space>
                        </div>
                        <Pattern>
                            <PreviewPane ref={printableComponent} approval={activePane.toString() === 'approve'} data={data.result} /> :
                        </Pattern>
                    </div>
                )
            }
        }
    }


}

export default memo(PurchaseRequest);