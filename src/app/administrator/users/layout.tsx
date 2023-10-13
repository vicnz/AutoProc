import { PropsWithChildren } from "react"

const Layout = function (props: PropsWithChildren<{}>) {
    return (
        <>
            {props.children}
        </>
    )
}

export default Layout;