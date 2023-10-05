import { EyeOutlined, SearchOutlined } from "@ant-design/icons";
import { Space, Input, Tag, Button, Divider, Empty, theme } from "antd";
import { useState, useDeferredValue, useRef, useEffect } from "react";
import SearchResult from '@components/admin/search/result'

const SearchModal = function (props: { closeModal?: (value: boolean) => {} }) {
    const { token } = theme.useToken();
    const [searchQuery, setSearchQuery] = useState("");
    const defValue = useDeferredValue(searchQuery);
    const [active, setActive] = useState<{ label: string; value: string } | null>(
        null
    );
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef?.current?.focus();
        return () => inputRef?.current?.blur();
    }, []);

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
                placeholder={`Search ${active === null ? "All Section" : `for ${active?.label}...`
                    }`}
                onChange={(e) => setSearchQuery(e.target.value)}
                value={searchQuery}
                addonBefore={<SearchOutlined />}
                ref={inputRef as any}
            />

            <Space>
                <span>Search for </span>
                <Button
                    icon={<EyeOutlined />}
                    onClick={() =>
                        setActive({ ...active, label: "Records", value: "records" })
                    }
                >
                    Records
                </Button>
                <Button
                    icon={<EyeOutlined />}
                    onClick={() =>
                        setActive({ ...active, label: "Users", value: "users" })
                    }
                >
                    Users
                </Button>
                <Button
                    icon={<EyeOutlined />}
                    onClick={() =>
                        setActive({ ...active, label: "Suppliers", value: "suppliers" })
                    }
                >
                    Suppliers
                </Button>
            </Space>
            <Divider>
                <span>Searching for</span>
                <span style={{ color: token.colorPrimary }}>{`"${searchQuery}"`}</span>
            </Divider>
            {searchQuery.length == 0 ? (
                <Empty />
            ) : (
                <SearchResult
                    query={defValue}
                    category={active?.value}
                    closeModal={props.closeModal}
                />
            )}
        </Space>
    );
};

export default SearchModal;