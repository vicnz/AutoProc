import { Descriptions, Typography } from "antd"
import { memo, useState } from "react"

const { Paragraph, Text } = Typography

//APPROVAL BLOCK
const ApprovalBlock = function (props: { data: any }) {
    const [approval, setApproval] = useState('Dr. Djovi Durante Regala')
    const [office, setOffice] = useState('College President')

    return (
        <>
            <Descriptions layout='vertical' bordered size='small' colon>
                {/* END USER FIELD */}
                <Descriptions.Item label="End-User">
                    <div style={{ height: 100, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', }}>
                        <Text style={{ width: '100%', borderBottom: 'solid lightgray 2px', fontWeight: 'bold', textTransform: 'uppercase', textAlign: 'center' }}>{`${props?.data?.enduser?.fname} ${props?.data?.enduser?.mname ? props?.data?.enduser?.mname + '. ' : ''}${props?.data?.enduser?.lname}`}</Text>
                        <Text style={{ width: '100%', textAlign: 'center' }}>{props?.data?.enduser.department.description}</Text>
                    </div>
                </Descriptions.Item>
                {/* END USER FIELD */}
                {/* HEAD OF PROCURING OFFICE */}
                <Descriptions.Item label="Approved">
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