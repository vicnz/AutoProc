'use client';

import { Steps, StepsProps } from "antd";
import { useMemo } from "react";
import OfficeList from './timeline'

type PropType = {
    tracking: Array<{ id: string, name: string, timestamp: string }>,
    name: string,
    final: boolean
}
const Stepper = function (props: { data: PropType[] }) {
    //
    const StepItems: StepsProps["items"] = useMemo(() => {
        return props.data.map((item, idx) => {
            const status = (props.data[--idx]?.final || false) &&
                !props.data[idx++]?.final;

            return {
                status: status ? "process" : item.final ? "finish" : "wait",
                title: item.name,
                description: (
                    <>
                        <br />
                        {
                            item?.tracking?.length > 0 ?
                                <OfficeList data={item.tracking} /> :
                                "No Tracking Yet..."
                        }
                    </>
                )
            }
        })
    }, [props.data])

    return (
        <>
            <Steps direction="vertical" items={StepItems} />
        </>
    )
}

export default Stepper;