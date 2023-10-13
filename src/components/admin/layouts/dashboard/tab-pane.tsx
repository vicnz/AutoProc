import { PropsWithChildren, memo } from "react"

const TabPaneWrapper = function (props: PropsWithChildren<any>) {
    return (
        <div style={{ height: 'calc(100vh - 112px)', width: '100%', position: 'relative', overflowY: 'auto' }}>
            <div style={{ height: 'auto', width: 'inherit', position: 'absolute', top: 0, left: 0, paddingRight: '20px' }}>
                {props.children}
            </div>
        </div>
    )
}

export default memo(TabPaneWrapper);