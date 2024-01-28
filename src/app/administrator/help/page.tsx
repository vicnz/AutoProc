'use client';
import { Empty, Flex, Result, Skeleton } from "antd";
import dynamic from 'next/dynamic'

const Manual = dynamic(async () => await import('./components/render-pdf'), { loading: () => <Skeleton loading />, ssr: false })
const Page = function () {
    return (
        <Flex align="center" justify="center">
            <Manual />
        </Flex>
    );
};

export default Page;
