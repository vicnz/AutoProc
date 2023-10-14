//TODO create a shared container JSX [for aesthetics 😂]
import { PropsWithChildren, forwardRef, memo } from "react";

const Container = forwardRef<HTMLDivElement, PropsWithChildren<any>>(function DivElement(props, ref) {
    return (
        <div>
            {props.children}
        </div>
    )
})

export default memo(Container);
