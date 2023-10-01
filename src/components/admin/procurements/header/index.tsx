'use client';
import { ArrowLeftOutlined, ArrowRightOutlined, PlusCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import Header from '@components/admin/header'
import { Button, Divider } from 'antd';
import AddNewPr from '@components/admin/features/purchase-crud'
//
const ProcurementsHeader = function (props: { data: any[], setCurrentPage: (count: number) => any, currentPage: number, size: number }) {

    //Go Back To Previous Data Set
    const prevPage = () => {
        if (props.currentPage >= props.size) {
            props.setCurrentPage(props.currentPage - props.size)
        }
    }

    //Next Data Set
    const nextPage = () => {
        if (props?.data.length > 0) {
            props.setCurrentPage(props.currentPage + props.size)
        }
    }

    return (
        <>
            <Header title="Procurements">
                <AddNewPr type='add' />
                <Divider type='vertical' />
                <Button icon={<ArrowLeftOutlined />} type='text' onClick={() => prevPage()}>Prev</Button>
                <Button icon={<ArrowRightOutlined />} type='text' onClick={() => nextPage()}>Next</Button>
                <Divider type='vertical' />
                <Button icon={<QuestionCircleOutlined />} type='text' />
            </Header>
        </>
    )
}

export default ProcurementsHeader;