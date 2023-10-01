'use client'

import { ArrowLeftOutlined } from '@ant-design/icons';
import Header from '@components/admin/header'
import { Button } from 'antd';
import { useRouter } from 'next/navigation'
import EditPR from '@components/admin/features/purchase-crud'
import { usePRId } from '@components/admin/procurement/record-id'

const ProcurementItemHeader = function () {
    const prId = usePRId()
    const { back } = useRouter()
    return (
        <>
            <Header title={'Item'} back={<Button icon={<ArrowLeftOutlined />} onClick={() => back()} type='text'>Records</Button>}>
                <EditPR type='edit' prId={prId} />
            </Header>
        </>
    )
}

export default ProcurementItemHeader;