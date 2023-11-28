"use client";

import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Modal, Tabs, TabsProps } from "antd";
import { Fragment, useMemo, useState } from "react";
import DepartmentAdd from "./new-department";
import SectionAdd from "./new-section";
type PropType = {
    departmentList: Array<{ id: string; description: string }>;
};

function EditDepartments(props: PropType) {
    const [open, setOpen] = useState(false);
    const tabs: TabsProps["items"] = useMemo(
        () => [
            {
                key: "dept",
                label: "Department",
                children: (
                    <>
                        <DepartmentAdd close={() => setOpen(false)} />
                    </>
                ),
            },
            {
                key: "sect",
                label: "Section",
                children: (
                    <>
                        <SectionAdd departmentList={props.departmentList} close={() => setOpen(false)} />
                    </>
                ),
            },
        ],
        [props.departmentList]
    );

    return (
        <Fragment>
            <Button icon={<PlusCircleOutlined />} onClick={() => setOpen(true)}>
                New Office
            </Button>
            <Modal open={open} onCancel={() => setOpen(false)} footer={null} destroyOnClose maskClosable={false}>
                <Tabs items={tabs} tabPosition="top" destroyInactiveTabPane />
            </Modal>
        </Fragment>
    );
}

export default EditDepartments;
