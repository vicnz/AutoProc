import { Tabs } from 'antd';
//components
import Dashboard from '@components/admin/dashboard'
import TabItems from '@components/admin/dashboard/tabs'
//confg
const Base = function () {
    return (
        <Dashboard>
            <Tabs items={TabItems} tabPosition='left' />
        </Dashboard>
    )
}

export default Base;