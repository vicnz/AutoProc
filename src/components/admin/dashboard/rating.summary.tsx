'use client'
import { GoogleCircleFilled } from '@ant-design/icons';
import { Avatar, Descriptions, DescriptionsProps, Rate } from 'antd'
import Image from 'next/image';

const items = [
    {
        key: '1',
        label: 'UserName',
        children: <p>Zhou Maomao</p>,
    },
    {
        key: '2',
        label: 'Telephone',
        children: <p>1810000000</p>,
    },
    {
        key: '3',
        label: 'Live',
        children: <p>Hangzhou, Zhejiang</p>,
    },
    {
        key: '4',
        label: 'Remark',
        children: <p>empty</p>,
    },
    {
        key: '5',
        label: 'Address',
        children: <p>No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China</p>,
    },
];

const RatingContent = function () {
    return (
        <>
            <Descriptions title="BEN INC. CO" colon layout='vertical'>
                <Descriptions.Item label="Trademark">
                    <Image alt="" src="/vercel.svg" height={50} width={60} />
                </Descriptions.Item>
                <Descriptions.Item label="Owner">BENJAMIN TABILO</Descriptions.Item>
                <Descriptions.Item label="Representative(s)">John Doe, Apple Seed</Descriptions.Item>
                <Descriptions.Item label="User Rating">
                    <Rate count={5} value={4} disabled />
                </Descriptions.Item>
                <Descriptions.Item label="Total">45,000,453</Descriptions.Item>
                <Descriptions.Item label="Quantity">790</Descriptions.Item>
                <Descriptions.Item label="Top End User">
                    Jennie Ortega
                </Descriptions.Item>
                <Descriptions.Item label="Description">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo, quod inventore! Animi consectetur aperiam, delectus accusamus natus numquam ipsum odio sit qui illo ad! Numquam.
                </Descriptions.Item>
            </Descriptions>
        </>
    )
}

export default RatingContent;