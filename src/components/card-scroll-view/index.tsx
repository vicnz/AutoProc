import { Card, CardProps } from "antd";
import { CSSProperties, memo } from "react";

const BodyStyle: CSSProperties = {
    padding: 0,
    margin: 0,
    position: "relative",
    width: "100%",
    overflow: "auto",
};

const OverFlowStyle: CSSProperties = {
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    padding: "15px 25px",
};

function ScollViewCard(props: CardProps & { height: number | string }) {
    const { height, children, ...rest } = props;
    return (
        <Card {...rest} bodyStyle={{ ...BodyStyle, height }}>
            <div style={{ ...OverFlowStyle, height }}>{children}</div>
        </Card>
    );
}

export default memo(ScollViewCard);
