'use client'

import { AuditOutlined, CheckCircleOutlined, ClearOutlined, CloseOutlined, EyeOutlined, LikeOutlined, SearchOutlined, SolutionOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Divider, Empty, Input, Modal, Space, Tag, theme } from "antd";
import { ReactNode, useEffect, useRef, useState } from "react";

const { useToken } = theme

const SearchBar = () => {
    const [isShown, showModal] = useState(false)
    // const token = useToken();
    return (
        <>
            <Input
                style={{ width: '25%' }}
                placeholder="Search Records, User, Suppliers, and Offices"
                onClick={() => showModal(!isShown)}
                readOnly
            />
            <Modal open={isShown} onCancel={() => showModal(false)} footer={null} style={{ top: '56px' }} closeIcon={null}>
                <SearchBarModal />
            </Modal>
        </>
    )
}


const SearchBarModal = () => {
    const token = useToken()
    const [active, setActive] = useState<{ name: string } | null>(null)
    const [query, setQuery] = useState('')

    return (
        <Space direction="vertical" style={{ width: '100%' }}>
            <Input
                style={{ width: '100%' }}
                prefix={
                    <Tag icon={<EyeOutlined />} closable onClose={() => setActive(null)} style={{ display: `${active !== null ? 'block' : 'none'}` }}>{active?.name}</Tag>
                }
                placeholder={`Search ${active === null ? 'All Sections...' : `for ${active.name}...`}`}
                onChange={(e) => setQuery(e.target.value)}
                addonBefore={
                    <SearchOutlined />
                }
                autoFocus
            />

            <Space wrap>
                <span>Search For : </span>
                <Button icon={<AuditOutlined />} onClick={() => { setActive({ ...active, name: 'Records' }); }}>Records</Button>
                <Button icon={<TeamOutlined />} onClick={() => { setActive({ ...active, name: 'Users' }); }}>Users</Button>
                <Button icon={<SolutionOutlined />} onClick={() => { setActive({ ...active, name: 'Suppliers' }); }}>Suppliers</Button>
            </Space>

            <Divider>Searching <span style={{ color: token.token.colorPrimary }}>{`"${query}"`}</span></Divider>
            <div style={{ position: 'relative', height: '40vh', width: '100%', overflow: 'auto', display: 'grid', placeItems: 'center', }}>
                {
                    true ?
                        <Empty description='Not Found' /> :
                        <Space style={{ position: 'absolute', top: 0, left: 0, height: 'auto', width: 'inherit' }}>
                        </Space>
                }
            </div>
        </Space>
    )
}

export default SearchBar;
