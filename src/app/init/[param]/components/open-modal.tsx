'use client'
import { Modal } from 'antd'
import React, { PropsWithChildren, useEffect, useState } from 'react'

function OpenModal(props: PropsWithChildren<{ title: string }>) {
    const [open, setOpen] = useState(false)
    useEffect(() => {
        setOpen(true)
    }, [])
    return (
        <Modal title={props.title || 'Default Title'} open={open} maskClosable={false} closeIcon={null} centered>
            {props.children}
        </Modal>
    )
}

export default OpenModal