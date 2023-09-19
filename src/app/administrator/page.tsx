//libs
import { Tabs } from 'antd';
//components
import DashboardLayout from './_dashboard/layout'
import TabItems from './_dashboard/tabs'
//confg
const Base = function () {
    return (
        <DashboardLayout>
            <Tabs items={TabItems} tabPosition='left' />
        </DashboardLayout>
    )
}

export default Base;