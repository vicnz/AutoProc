'use client'

//libs
import { Button, Divider, Tag } from 'antd'
import { PropsWithChildren, createContext, useMemo, useState } from 'react'
import { usePathname, useRouter, useParams } from 'next/navigation'
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons'
//components
import ContentWrapper from '../_components/shared/content-wrapper'
import { HeaderWithBack, Header } from '../_components/shared/header-wrapper'
import useSWR from 'swr'
//components
import AddPr from './_components/add-record'
import PrintQRCode from './qrcode'
import HelpRecords from './_components/help-records'
import { PAGINATION_SIZE } from '@lib/contants'
//config
export const RecordTypeContext = createContext<any>({})
//
const RecordsLayout = function (props: PropsWithChildren<any>) {
    const pathname = usePathname()
    const params = useParams()
    const router = useRouter()
    const [page, setPage] = useState(0)

    const swrContext = useSWR(`/administrator/api/records?page=${page}&size=${PAGINATION_SIZE}`, (...args) => fetch(...args).then(res => res.json()))
    //Add an Add Back Button
    const hasBack = useMemo(() => {
        if (!pathname.endsWith('/records')) {
            return true
        }
    }, [pathname])

    //Set PreviousPage
    const prevPage = () => {
        if (page >= PAGINATION_SIZE) {
            setPage(page - PAGINATION_SIZE)
        }
    }

    //Set NextPage
    const nextPage = () => {
        if ((swrContext?.data.length !== 0)) {
            setPage(page + PAGINATION_SIZE)
        }
    }

    return (
        <ContentWrapper
            header={
                (typeof hasBack === 'undefined') ?
                    <Header title={"RECORDS"}>
                        <AddPr /> {/*Add New PR*/}
                        <Divider type='vertical' />
                        <Button onClick={() => prevPage()} icon={<ArrowLeftOutlined />} type='text'>Prev</Button>
                        <Button onClick={() => nextPage()} icon={<ArrowRightOutlined />} type='text'>Next</Button>
                        <Divider type='vertical' />
                        <HelpRecords />
                    </Header> :
                    <HeaderWithBack title={<>Record : <Tag>{params?.id}</Tag></>} back={<Button onClick={() => router.back()} type='text' icon={<ArrowLeftOutlined />}>Back</Button>}>
                        <PrintQRCode id={params?.id as string} />
                        <Divider type='vertical' />
                        <HelpRecords />
                    </HeaderWithBack>
            }
        >
            {
                (typeof hasBack === 'undefined') ?
                    <RecordTypeContext.Provider value={swrContext}>
                        {props.children}
                    </RecordTypeContext.Provider> :
                    <>
                        {props.children}
                    </>
            }
        </ContentWrapper>
    )
}

//
export default RecordsLayout;