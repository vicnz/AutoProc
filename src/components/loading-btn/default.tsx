"use client";

import { Button, ButtonProps } from "antd";
import { PropsWithChildren, useEffect, useState } from "react";

const Index = function (props: PropsWithChildren<ButtonProps & { onClose?: () => void }>) {
    const [loading, setLoading] = useState(false);
    //
    useEffect(() => {
        return () => setLoading(false);
    }, []);

    const onClick = () => {
        setLoading(true);
        props.onClose && props.onClose();
    };
    return (
        <Button {...props} onClick={onClick} loading={loading}>
            {props.children}
        </Button>
    );
};

export default Index;
