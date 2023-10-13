import { Divider, Result, Skeleton, Space, Typography } from "antd";
import { PropsWithChildren, memo } from "react";
import Image from 'next/image';
import useSWR from "swr";
import dynamic from "next/dynamic";

const SelectionForm = dynamic(async () => await import('./form'), { loading: () => <Skeleton active /> });

//
const Tracker = function (props: PropsWithChildren<any>) {

    //FETCH OFFICES
    const { data, error, isLoading, isValidating } = useSWR('/utility/api/office')

    if (error) {
        return (
            <Result status={'error'} title="Failed Fetching Data" subTitle="Network Error, Please check your Wifi or Internet Connection" />
        )
    }

    if (!data || isLoading) {
        return <div style={{ padding: '5px 18px' }}>
            <Skeleton active />
        </div>
    }
    //TODO - GUI align items center FIXED
    return (
        <>
            <Space direction="vertical" style={{ width: '100%', padding: '0px 0px 0px 24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <br />
                    <br />
                    <Image alt="App Logo" src="/logo-small.png" height={150} width={175} style={{ transform: 'rotate(-45deg)' }} />
                    <Typography.Title level={3}>AutoProc&trade; Tracking App</Typography.Title>
                    <Typography.Paragraph style={{ textAlign: 'center' }}>
                        AutoProc&trade; Tracking App serves as the document routing utility tool for transaction, tracking which office the documents transactioned are located to be easly collocate them easily
                    </Typography.Paragraph>
                    <Divider>Select Destination Office</Divider>
                    <SelectionForm offices={data} />
                </div>
            </Space>
        </>
    )
}

export default memo(Tracker);