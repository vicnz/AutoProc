"use client";

/**
 * AVATAR CHANGER
 */
//!FIXME FILE COMPRESSION ISSUE HIGH RESOLUTION IMAGES
//!HIGH RESOLUTION IMAGES ARE NOT COMPRESSED IN SIZE

import { CloseOutlined, UserAddOutlined } from "@ant-design/icons";
import { App, Avatar, Button, Flex, Result } from "antd";
import { memo, useCallback, useRef, useState } from "react";
import ReactProfile from "react-profile";
import { ErrorBoundary } from "react-error-boundary";
//
import fileToBase64 from "@lib/client/file-to-base64";
import blobToBase64 from "@lib/client/blob-to-base64";

//types
type AvatarEditorProps = {
    onSave?: (data: Blob) => void;
    onCancel?: () => void;
    src: Blob | null | undefined;
    readOnly?: boolean;
};
//
const AvatarEditor = function (props: AvatarEditorProps = { readOnly: false, src: undefined }) {
    const { message } = App.useApp();
    const { src, onCancel, onSave } = props; //
    const inputRef = useRef<HTMLInputElement>(null); //Input Reference
    const [showEditor, setShowEditor] = useState<{ show: boolean; base64?: string }>({ show: false }); //show editor

    //* Parse Incoming Image to Base64
    const parseSrc = useCallback((source: Blob | undefined | null) => {
        if (!(source === null || typeof source === "undefined")) {
            const imageToBase64 = blobToBase64(source as unknown as Blob);
            return `data:image/png;base64,${imageToBase64}`;
        }
    }, []);

    const [base64Image, setBase64Image] = useState<string | undefined>(parseSrc(src as unknown as Blob)); //base 64 image

    const onOpenImage = async () => {
        //trigger file image open
        inputRef?.current?.click();
    };

    const onInputChange = async (e: any) => {
        //open editor
        const file = e?.target?.files[0];
        if (file) {
            const imageString = await fileToBase64(file);
            setShowEditor({ show: true, base64: imageString as string });
        }
    };

    const onSaveImage = async (e: any) => {
        // onSave()
        const base64Image = await e.getDataURL();
        setBase64Image(base64Image);
        setShowEditor({ show: false });
        if (onSave) {
            const blob = await e.getBlob();
            onSave(blob as Blob);
        }
    };

    const onCancelImage = async () => {
        //onCancel()
        setShowEditor({ show: false });
        if (onCancel) {
            onCancel();
        }
    };

    ("use client");

    <ErrorBoundary fallback={<div>Something went wrong</div>}></ErrorBoundary>;

    return (
        <div>
            {/* IMAGE EDITOR */}
            {showEditor.show && showEditor.base64 ? (
                <div style={{ position: "fixed", height: "100vh", width: "100vw", zIndex: 5 }}>
                    <ReactProfile src={showEditor.base64} square onDone={onSaveImage} onCancel={onCancelImage} />
                </div>
            ) : null}
            {/* IMAGE EDITOR */}
            {base64Image ? (
                <>
                    {props.readOnly ? (
                        <>
                            <Avatar size={150} src={base64Image} style={{ pointerEvents: "none" }} />
                        </>
                    ) : (
                        <>
                            <Avatar size={150} src={base64Image} onClick={onOpenImage} style={{ cursor: "pointer" }} />
                            <input
                                hidden
                                ref={inputRef}
                                type="file"
                                style={{ display: "none" }}
                                onChange={onInputChange}
                                accept="image/png,image/jpeg,image/svg,image/webp"
                            />
                        </>
                    )}
                </>
            ) : (
                <>
                    {props.readOnly ? (
                        <>
                            <Avatar size={150} icon={<UserAddOutlined />} style={{ pointerEvents: "none" }} />
                        </>
                    ) : (
                        <>
                            <Avatar
                                size={150}
                                icon={<UserAddOutlined title="Maximum Image Size <30" />}
                                onClick={onOpenImage}
                                style={{ cursor: "pointer" }}
                            />
                            <input
                                hidden
                                ref={inputRef}
                                type="file"
                                style={{ display: "none" }}
                                onChange={onInputChange}
                                accept="image/png,image/jpeg,image/svg,image/webp"
                            />
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default memo(AvatarEditor);
