import { Descriptions, Typography } from "antd"
import { memo, useState } from "react"

import type { IAPIReturnType } from './types'
const { Paragraph, Text } = Typography

//APPROVAL BLOCK
const ApprovalBlock = function (props: { data: IAPIReturnType }) {
    const [approval, setApproval] = useState('Dr. Djovi Durante Regala')
    const [office, setOffice] = useState('College President')

    return (
        <>
            <Descriptions layout='vertical' bordered size='small' colon>
                {/* END USER FIELD */}
                <Descriptions.Item label="Reviewed By">
                    <div style={{ height: 100, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', }}>
                        <Text style={{ width: '100%', borderBottom: 'solid lightgray 2px', fontWeight: 'bold', textTransform: 'uppercase', textAlign: 'center' }}>{props.data.enduser}</Text>
                        <Text style={{ width: '100%', textAlign: 'center' }}>{props?.data?.department}</Text>
                    </div>
                </Descriptions.Item>
                {/* END USER FIELD */}
                {/* HEAD OF PROCURING OFFICE */}
                <Descriptions.Item label="Approved By">
                    <div style={{ height: 100, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', }}>
                        <Text style={{ width: '100%', borderBottom: 'solid lightgray 2px', fontWeight: 'bold', textTransform: 'uppercase', textAlign: 'center' }} editable={{ text: approval, triggerType: ['text'], onChange(value) { setApproval(value) }, }}>{approval}</Text>
                        <Text style={{ width: '100%', textAlign: 'center' }} editable={{ text: office, triggerType: ['text'], onChange(value) { setOffice(value) }, }}>{office}</Text>
                    </div>
                </Descriptions.Item>
                {/* HEAD OF PROCURING OFFICE */}
            </Descriptions>
        </>
    )
}

export default memo(ApprovalBlock);