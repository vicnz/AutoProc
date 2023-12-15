import { DeleteOutlined } from "@ant-design/icons";
import { App, Button, Popconfirm } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteSupplier } from "./action";

function DeleteSupplier(props: { id: string }) {
    const { message } = App.useApp();
    const { back } = useRouter();
    const [loading, setLoading] = useState(false);

    const onRemoveSupplier = async () => {
        setLoading(true);
        const result = await deleteSupplier(props.id);

        if (result.error) {
            setLoading(false);
            message.error("Error Occured");
        } else {
            setLoading(false);
            back();
        }
    };

    return (
        <Popconfirm
            title="Are You Sure You Want To Disable this Supplier?"
            onCancel={() => {
                setLoading(false);
            }}
            onConfirm={() => {
                onRemoveSupplier();
            }}
        >
            <Button danger icon={<DeleteOutlined />} block type="dashed" loading={loading}>
                Disable Supplier
            </Button>
        </Popconfirm>
    );
}

export default DeleteSupplier;
