import { Tabs } from 'antd';
//components
import Dashboard from '@components/admin/layouts/dashboard'
import TabItems from '@components/admin/layouts/dashboard/tabs'
//confg
const Page = function () {
    return (
        <Dashboard>
            <Tabs items={TabItems} tabPosition='left' />
        </Dashboard>
    )
}

export default Page;