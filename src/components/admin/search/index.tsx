'use client';
//TODOs
// - Build the API End Point of the Search
// - Clicking on Result Item Will Destroy the Modal Component as well
//libs
import { Dispatch, SetStateAction, useState, useEffect, useRef, memo, useDebugValue, useDeferredValue } from 'react';
import { Button, Divider, Empty, Input, List, Modal, Skeleton, Space, Tag, Tooltip, theme } from 'antd';
import { EyeOutlined, FolderOpenOutlined, MacCommandOutlined, SearchOutlined } from '@ant-design/icons';
//components

//config
const { useToken } = theme
//
const SearchBar = function () {
    const [open, setOpen] = useState<boolean>(false)

    const onKeyPress = (e: KeyboardEvent) => {
        if (e.ctrlKey && e.key === '/') {
            setOpen(true)
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', onKeyPress)
        return () => window.removeEventListener('keydown', onKeyPress)
    }, [])

    return (
        <div style={{ width: '25%' }}>
            <Input
                placeholder='Search Purchase Requests, Purchase Order, Users and etc.'
                onClick={() => setOpen(true)}
                readOnly
                addonAfter={
                    <Tooltip title="Command Or Control + /" placement='bottom'>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <MacCommandOutlined />
                            <span style={{ scale: .8 }}>+</span>
                            <span>
                                /
                            </span>
                        </div>
                    </Tooltip>
                }
            />
            <Modal open={open} onCancel={() => setOpen(false)} footer={null} style={{ top: '10px' }} closeIcon={null} destroyOnClose>
                <SearchModal closeModal={setOpen as (value: boolean) => {}} />
            </Modal>
        </div>
    )
}

/**
 * @name Search Modal Popup
 * @param props {query: string, setQuery: Dispatch<SetStateAction<string>>} 
 * @returns JSX
 */
const SearchModal = memo(function (props: { closeModal?: (value: boolean) => {} }) {
    const { token } = useToken()
    const [searchQuery, setSearchQuery] = useState("")
    const defValue = useDeferredValue(searchQuery)
    const [active, setActive] = useState<{ label: string, value: string } | null>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        inputRef?.current?.focus()
        return () => inputRef?.current?.blur()
    }, [])

    return (
        <Space direction={'vertical'} style={{ width: '100%' }}>
            <Input
                style={{ width: '100%' }}
                prefix={
                    <Tag icon={<EyeOutlined />} closable onClose={() => setActive(null)} style={{ display: `${active !== null ? 'block' : 'none'}` }} color={token.colorPrimary}>
                        {active?.label}
                    </Tag>
                }
                placeholder={`Search ${active === null ? 'All Section' : `for ${active?.label}...`}`}
                onChange={e => setSearchQuery(e.target.value)}
                value={searchQuery}
                addonBefore={
                    <SearchOutlined />
                }
                ref={inputRef as any}
            />

            <Space>
                <span>Search for </span>
                <Button icon={<EyeOutlined />} onClick={() => setActive({ ...active, label: 'Records', value: 'records' })}>Records</Button>
                <Button icon={<EyeOutlined />} onClick={() => setActive({ ...active, label: 'Users', value: 'users' })}>Users</Button>
                <Button icon={<EyeOutlined />} onClick={() => setActive({ ...active, label: 'Suppliers', value: 'suppliers' })}>Suppliers</Button>
            </Space>
            <Divider>
                <span>Searching for</span>
                <span style={{ color: token.colorPrimary }}>{`"${searchQuery}"`}</span>
            </Divider>
            {
                searchQuery.length == 0 ?
                    <Empty /> :
                    <SearchResult query={defValue} category={active?.value} closeModal={props.closeModal} />
            }
        </Space>
    )
})

/**
 * @name Search Result
 * @param props {query: string} 
 * @returns JSX
 */
const SearchResult = memo(function (props: { query: string, category?: string, closeModal?: (value: boolean) => {} }) {
    const [active, setActive] = useState(true)
    const { token } = useToken()
    let category = props.category
    useEffect(() => {
        setTimeout(() => {
            setActive(false)
        }, 2000)
    }, [props.query])

    return (
        <div style={{ height: '50vh', position: 'relative', width: 'inherit', overflowY: 'auto' }}>
            <div style={{ height: 'auto', position: 'absolute', width: '100%', top: 0, left: 0 }}>
                {
                    active ?
                        <Skeleton paragraph={{ rows: 8 }} active /> :
                        <List>
                            {
                                new Array(10).fill(0).map((item, idx) => {
                                    return (
                                        <List.Item prefix={'Result'} key={`random-str-${idx}`} onClick={() => { }}>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                                <div>
                                                    <SearchOutlined />
                                                    &nbsp;
                                                    <span style={{ color: token.colorPrimary, fontWeight: 'bold' }}>
                                                        {props.query}
                                                    </span>
                                                </div>
                                                <Tag color={token.colorPrimary}>{props.category || 'All'}</Tag> {/**This should be a value from server */}
                                                <div>
                                                    <Button icon={<FolderOpenOutlined />} type='text' onClick={() => props?.closeModal && props.closeModal(false)}>View</Button>
                                                </div>
                                            </div>
                                        </List.Item>
                                    )
                                })
                            }
                        </List>

                }
            </div>
        </div>
    )
})

export default memo(SearchBar);