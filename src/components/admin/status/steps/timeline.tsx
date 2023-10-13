'use client';


import { Tag, Timeline } from "antd"
import dayjs from "dayjs"
import { useMemo } from "react"

const TimeLine = function (props: { data: Array<{ id: string, name: string, timestamp: string }> }) {

    const data = useMemo(() => {
        return props.data.map((item) => {
            return {
                children: (
                    <span>
                        <Tag>{dayjs(item.timestamp).format("MM/DD/YY hh:mm a")}</Tag><br />
                        <span style={{ whiteSpace: 'normal', fontSize: '0.8em' }}>
                            {item.name.toUpperCase()}
                        </span>
                        <br />
                    </span>
                )
            }
        })
    }, [props.data])

    return (
        <>
            <Timeline mode="left" items={data} />
        </>
    )
}

export default TimeLine;