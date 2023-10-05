'use client';
//libs
import { SearchOutlined, FolderOpenOutlined } from "@ant-design/icons";
import { Skeleton, List, Tag, Button, theme } from "antd";
import { useState, useEffect } from "react";

//types
interface SearchResultProps {
    query: string,
    category?: string,
    closeModal?: (val: boolean) => any
}
const SearchResult = function (props: SearchResultProps) {
    const { token } = theme.useToken();
    const [active, setActive] = useState(true);
    let category = props.category; //

    //EMULATE SEARCH
    useEffect(() => {
        setTimeout(() => {
            setActive(false);
        }, 2000);
    }, [props.query]);
    //EMULATE SEARCH

    return (
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
                {active ? (
                    <Skeleton paragraph={{ rows: 8 }} active />
                ) : (
                    <List>
                        {new Array(10).fill(0).map((item, idx) => {
                            return (
                                <List.Item
                                    prefix={"Result"}
                                    key={`random-str-${idx}`}
                                    onClick={() => { }}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            width: "100%",
                                        }}
                                    >
                                        <div>
                                            <SearchOutlined />
                                            &nbsp;
                                            <span
                                                style={{
                                                    color: token.colorPrimary,
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                {props.query}
                                            </span>
                                        </div>
                                        <Tag color={token.colorPrimary}>
                                            {props.category || "All"}
                                        </Tag>{" "}
                                        {/**This should be a value from server */}
                                        <div>
                                            <Button
                                                icon={<FolderOpenOutlined />}
                                                type="text"
                                                onClick={() =>
                                                    props?.closeModal && props.closeModal(false)
                                                }
                                            >
                                                View
                                            </Button>
                                        </div>
                                    </div>
                                </List.Item>
                            );
                        })}
                    </List>
                )}
            </div>
        </div>
    );
};

export default SearchResult;