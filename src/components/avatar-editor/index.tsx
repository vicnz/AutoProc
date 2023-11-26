"use client";

import ImgCrop from "antd-img-crop";
import { useState } from "react";
import { Upload } from "antd";
import { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";

const AvatarEditor = (props: { onChange: (e: any) => any }) => {
    const [file, setFile] = useState<UploadFile>();

    const onChange: UploadProps["onChange"] = ({ file }) => {
        if (file.status === "removed") {
            props.onChange(undefined);
            setFile(undefined);
        } else if (file.status === "done") {
            setFile(file);
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

    const beforeUpload = (file: RcFile) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            //@ts-ignore
            setFile((prev) => ({
                ...prev,
                url: reader.result,
            }));
        };

        // then upload `file` from the argument manually
        props.onChange(file);
        return false;
    };

    return (
        <ImgCrop rotationSlider>
            <Upload
                multiple={false}
                beforeUpload={beforeUpload}
                listType="picture-circle"
                fileList={file ? [file] : []}
                onChange={onChange}
                onPreview={onPreview}
            >
                {!file && "+ Upload"}
            </Upload>
        </ImgCrop>
    );
};

export default AvatarEditor;
