'use client'

//libs
import { Button, Divider, Progress } from 'antd'
import { PropsWithChildren, createContext, useMemo, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { ArrowLeftOutlined, ArrowRightOutlined, FolderOpenOutlined, MoreOutlined, QrcodeOutlined, QuestionCircleOutlined } from '@ant-design/icons'
//components
import ContentWrapper from '../_components/shared/content-wrapper'
import { HeaderWithBack, Header } from '../_components/shared/header-wrapper'
import useSWR from 'swr'
import AddPr from './_components/add-record'
//config
export const RecordTypeContext = createContext<any>({})
//
const RecordsLayout = function (props: PropsWithChildren<any>) {
    const pathname = usePathname()
    const router = useRouter()
    const [page, setPage] = useState(1)

    const swrContext = useSWR(`/administrator/api/records?page=${page}`, (...args) => fetch(...args).then(res => res.json()))

    //Add an Add Back Button
    const hasBack = useMemo(() => {
        if (!pathname.endsWith('/records')) {
            return true
        }
    }, [pathname])

    //Set PreviousPage
    const prevPage = () => {
        if (page > 10) {
            setPage(page - 10)
        }
    }

    //Set NextPage
    const nextPage = () => {
        if (!(swrContext.data.length === 0)) {
            setPage(page + 10)
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
                        <Button type='text' icon={<QuestionCircleOutlined />} />
                    </Header> :
                    <HeaderWithBack title={"PURCHASE REQUEST"} back={<Button onClick={() => router.back()} type='text' icon={<ArrowLeftOutlined />}>Back</Button>}>
                        <Progress percent={10} style={{ width: '200px' }} strokeColor={'#c0252a'} />
                        <Divider type='vertical' />
                        <Button icon={<QrcodeOutlined />} type='text'>Tracking</Button>
                        <Divider type='vertical' />
                        <Button type='text' icon={<MoreOutlined />} />
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