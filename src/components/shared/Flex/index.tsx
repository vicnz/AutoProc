/**
 * * Container With Flex Properties
 */

import { CSSProperties, PropsWithChildren, forwardRef, memo } from "react";
type FlexContainerProps = Pick<
    CSSProperties,
    | "flexBasis"
    | "flexGrow"
    | "flexShrink"
    | "flexDirection"
    | "justifyContent"
    | "justifyItems"
    | "alignItems"
    | "alignContent"
    | "gap"
    | "flexWrap"
    | "flexFlow"
>;

const FlexContainer = forwardRef(function FlexContainerWrapper(props: PropsWithChildren<FlexContainerProps & { styles?: CSSProperties }>, ref) {
    const { styles, ...rest } = props;
    return (
        <div ref={ref as any} style={{ ...styles, ...rest, display: 'flex' }}>
            {props.children}
        </div>
    );
});

export default memo(FlexContainer);
