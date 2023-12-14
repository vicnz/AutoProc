"use client";

import { EyeOutlined, SearchOutlined } from "@ant-design/icons";
import { Space, Input, Tag, Button, theme, Skeleton } from "antd";
import { useState, useRef, useEffect, useMemo, Suspense } from "react";
import RenderResult from "./render-result";
import { useDebounce } from "react-use";

const SearchModal = function (props: { closeModal?: (value: boolean) => {} }) {
    const { closeModal } = props;
    const { token } = theme.useToken();
    const [searchQuery, setSearchQuery] = useState("");
    const [query, setQuery] = useState("");
    const [active, setActive] = useState<{ label: string; value: string } | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    //DEBOUNCE RESULT
    const [, cancel] = useDebounce(
        () => {
            setQuery(searchQuery);
        },
        1000,
        [searchQuery]
    );

    useEffect(() => {
        const focusRef = inputRef?.current;
        focusRef?.focus();
        return () => focusRef?.blur();
    }, [closeModal]);

    const renderResult = useMemo(
        () => (
            <RenderResult
                query={query}
                type={active?.value}
                close={() => {
                    closeModal && closeModal(false);
                }}
            />
        ),
        [query, active, closeModal]
    );

    return (
        <Space direction={"vertical"} style={{ width: "100%" }}>
            <Input
                style={{ width: "100%" }}
                prefix={
                    <Tag
                        icon={<EyeOutlined />}
                        closable
                        onClose={() => setActive(null)}
                        style={{ display: `${active !== null ? "block" : "none"}` }}
                        color={token.colorPrimary}
                    >
                        {active?.label}
                    </Tag>
                }
                placeholder={`Search ${active === null ? "All Section" : `for ${active?.label}...`}`}
                onChange={(e) => setSearchQuery(e.target.value)}
                value={searchQuery}
                addonBefore={<SearchOutlined />}
                ref={inputRef as any}
            />

            <Space>
                <span>Search for </span>
                <Button
                    icon={<EyeOutlined />}
                    onClick={() => setActive({ ...active, label: "Records", value: "records" })}
                >
                    Records
                </Button>
                <Button icon={<EyeOutlined />} onClick={() => setActive({ ...active, label: "Users", value: "users" })}>
                    Users
                </Button>
                <Button
                    icon={<EyeOutlined />}
                    onClick={() => setActive({ ...active, label: "Suppliers", value: "suppliers" })}
                >
                    Suppliers
                </Button>
            </Space>
            <br />
            <div
                style={{
                    height: "50vh",
                    position: "relative",
                    width: "inherit",
                    overflowY: "auto",
                }}
            >
                <div
                    style={{
                        height: "auto",
                        position: "absolute",
                        width: "100%",
                        top: 0,
                        left: 0,
                    }}
                >
                    <Suspense fallback={<Skeleton active />}>{renderResult}</Suspense>
                </div>
            </div>
        </Space>
    );
};

export default SearchModal;
