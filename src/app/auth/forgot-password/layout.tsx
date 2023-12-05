"use client";
import { THEME_COLORS } from "@lib/theme/constant";
import { Modal, Flex, Tag } from "antd";
import { PropsWithChildren, useEffect, useState } from "react";
import Image from "next/image";

function Layout(props: PropsWithChildren<any>) {
    const [open, setOpen] = useState(false);
    useEffect(() => {
        setOpen(true);
    }, []);
    return (
        <Modal
            key="modal1"
            open={open}
            centered
            destroyOnClose
            closable={false}
            title={
                <>
                    <Flex align="center" justify="space-between">
                        <Flex align="center" gap={10}>
                            <Image src="/logo-small.png" alt="Page Logo" height={25} width={30} />
                            <span style={{ color: THEME_COLORS.PRIMARY }}>FORGOT PASSWORD</span>
                        </Flex>
                        <Tag color="orange">BETA</Tag>
                    </Flex>
                </>
            }
            footer={false}
            width={400}
            styles={{
                content: {
                    borderTop: `solid ${THEME_COLORS.PRIMARY} 10px`,
                },
            }}
        >
            {props.children}
        </Modal>
    );
}
export default Layout;
