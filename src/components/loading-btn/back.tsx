"use client";

import { Button, ButtonProps } from "antd";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect, useState } from "react";

const Index = function (props: PropsWithChildren<ButtonProps & { onClose?: () => void }>) {
    const { back } = useRouter();
    const [loading, setLoading] = useState(false);
    //
    useEffect(() => {
        return () => setLoading(false);
    }, []);

    const onClick = () => {
        setLoading(true);
        back();
        props.onClose && props.onClose();
    };
    return (
        <Button {...props} onClick={onClick} loading={loading}>
            {props.children}
        </Button>
    );
};

export default Index;
