import { Descriptions } from "antd"
import dayjs from "dayjs"

const TopSection = function (props: { data: any }) {
    return (
        <div style={{ padding: '5px 25px' }}>
            <Descriptions size={'small'} bordered layout='vertical' column={5}>
                <Descriptions.Item label="Bidding Location" span={3}>
                    <p style={{ textTransform: 'capitalize' }}>
                        {props.data.location || 'N/A'}
                    </p>
                </Descriptions.Item>
                <Descriptions.Item label="Date" span={2}>
                    {
                        dayjs(props.data.date).format('MM/DD/YYYY')
                    }
                </Descriptions.Item>
                <Descriptions.Item span={4} label="Note">
                    <div style={{ fontSize: '.9em' }}>
                        {`(✅) Furnishing/delivery of supplies, and  materials or equipment`.padEnd(50)} <br></br>
                        {`(✅) Furnishing Labor, services, etc.`} <br></br>
                        {`(✅) Rental or use of transportation facilities equipment, quarters, rooms, lot or space, etc.`}
                    </div>
                </Descriptions.Item>
                <Descriptions.Item label="Furnished At">
                    {`Batanes State College`}
                </Descriptions.Item>
                <Descriptions.Item label={null} >
                    <div style={{ fontSize: '.8em' }}>
                        {`(State place or site of Office or project where articles or services be furnished or returned)`}
                    </div>
                </Descriptions.Item>
            </Descriptions>
        </div>
    )
}

export default TopSection;