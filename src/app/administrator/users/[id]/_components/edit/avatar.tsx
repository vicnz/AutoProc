"use client";

import ImgCrop from "antd-img-crop"; //TODO allow cropping of image
import React, { forwardRef, useState } from "react";
import { App, Upload } from "antd";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";

type UploadImageEditorProps = {
    onSave?: (e: any) => {};
    onCancel?: () => {};
    initData?: any;
} & UploadProps;
//

const AvatarUploader = (props: UploadImageEditorProps) => {
    // console.log(props?.initData);
    const imageProps = props?.initData ? [{ url: `data:image/png;base64,${props.initData}` }] : [];
    const [fileList, setFileList] = useState<any[]>(imageProps); //prepend default data

    const onChange = (fileList: any) => {
        console.log(fileList);
        const file = fileList.file;
        if (file.status === "removed") {
            setFileList([]);
            props.onSave && props.onSave(undefined);
        } else {
            setFileList([file]);
            props.onSave && props.onSave(file);
        }
    };
    const onPreview = async (file: UploadFile) => {
        let src = file.url as string;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj as RcFile);
                reader.onload = () => resolve(reader.result as string);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };

    const beforeUpload = async (e: File) => {
        const file = e;
        //TODO limit upload file size to < 3MB
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setFileList((state: any) => [{ url: reader.result }]);
            // console.log(reader.result);
        };
        return false;
    };

    return (
        <Upload
            {...props}
            accept="image/png,image/jpeg,image/svg,image/webp"
            beforeUpload={beforeUpload}
            listType="picture-circle"
            fileList={fileList}
            onPreview={onPreview}
            onChange={onChange}
        >
            {fileList?.length < 1 && "+ Upload"}
        </Upload>
        // <ImgCrop rotationSlider onModalCancel={modalCancel} beforeCrop={modalCropOk} showReset cropShape="round">
        // </ImgCrop>
    );
};

export default AvatarUploader;
