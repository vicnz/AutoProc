'use client';

import { Button, Input, Tag, Tooltip } from 'antd'
import { ClearOutlined, CloseOutlined, SearchOutlined } from '@ant-design/icons'
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
function SearchBar() {
    const router = useRouter()
    const ref = useRef<any>(null)
    const [query, setQuery] = useState("")
    const [isActive, setActive] = useState<boolean>(false)

    const clearText = () => {
        setActive(true)
    }
    const focusSearch = (e: KeyboardEvent) => {
        if (e.key === '/' && e.ctrlKey) {
            ref.current?.focus()
        }
    }

    const onEnter = (e: KeyboardEvent) => {
        if (e.key === 'Enter' && query.length > 2) {
            const parsedQuery = encodeURI(query)
            setQuery("")
            router.push(`/admin/search?q=${parsedQuery}`)
        }
    }

    useEffect(() => {
        ref.current?.input?.addEventListener('focus', clearText)
        ref.current?.input?.addEventListener('keydown', onEnter)
        window?.addEventListener('keydown', focusSearch)
        return () => {
            ref.current?.input?.removeEventListener('focus', clearText)
            ref.current?.input?.removeEventListener('keydown', onEnter)
            window?.removeEventListener('keydown', focusSearch)
        }
    }, [])

    return (
        <>
            <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                ref={ref}
                prefix={<SearchOutlined />}
                placeholder="Search Tip: for Values you can Specify < number"
                style={{ width: '50%' }}
                addonAfter={<span style={{ fontFamily: 'aoki' }}>CTRL+/</span>}
                suffix={
                    isActive && query.length !== 0 ?
                        <Tooltip title="Clear">
                            <Button icon={<ClearOutlined />} type='text' onClick={() => setQuery('')} size='small' />
                        </Tooltip> :
                        null
                }
            />
        </>
    )
}

export default SearchBar;