'use client';

import { SyncOutlined } from "@ant-design/icons";
import { Card, Result, Spin } from "antd";
import useSWR from "swr";
import StatusItems from './steps'

const DocumentState = function (props: { prId: string }) {
    const { data, isLoading, error, isValidating } = useSWR(`/administrator/api/status?_pr=${props.prId}`)
    return (
        <Card
            title={<span>Document Status</span>}
            style={{
                height: "calc(100vh - 112px)",
                width: "250px",
                border: "solid lightgray 1px",
                borderRadius: 0,
            }}
            bordered
            bodyStyle={{ padding: 0 }}
            headStyle={{ padding: "10px", height: "56px" }}
            extra={<SyncOutlined spin={isValidating} />}
        >
            <div
                style={{
                    height: "calc(100vh - 168px)",
                    width: "100%",
                    position: "relative",
                    overflowY: "auto",
                }}
            >
                <div
                    style={{
                        height: "auto",
                        width: "100%",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        padding: "10px",
                    }}
                >
                    {
                        error ?
                            <Result title={<span>Error Loading</span>} status={'error'} />
                            :
                            <>
                                {!data || isLoading ? (
                                    <div
                                        style={{
                                            display: "grid",
                                            placeItems: "center",
                                            height: "calc(100vh - 200px)",
                                        }}
                                    >
                                        <Spin spinning />
                                    </div>
                                ) : (
                                    <StatusItems data={data.documents} />
                                )}
                            </>

                    }
                </div>
            </div>
        </Card>
    )
}


export default DocumentState;