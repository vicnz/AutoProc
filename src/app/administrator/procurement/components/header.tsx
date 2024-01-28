import { PlusCircleOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Divider } from "antd";
import GlobalHeader from "@components/global-header";
import OpenDrawer from "@components/drawer";
import { ReactNode } from "react";
import FormData from './add'

const ProcurementRecordsLayout = function (props: { children?: ReactNode }) {
    return (
        <>
            <GlobalHeader title="Procurement Records">
                {props.children}
                <Divider type="vertical" />
                <OpenDrawer
                    title="Add New Purchase Request"
                    buttonProps={{ icon: <PlusCircleOutlined /> }}
                    buttonChildren={<>Add New PR</>}
                    drawerProps={{ destroyOnClose: true, size: 'large' }}
                >
                    <FormData />
                </OpenDrawer>
                <Divider type="vertical" />
                {/* <ManualSection /> */}
                <QuestionCircleOutlined />
            </GlobalHeader>
        </>
    );
};

export default ProcurementRecordsLayout;
