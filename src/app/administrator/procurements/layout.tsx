//preload data here
//and share as global

import { PropsWithChildren } from "react";

const Layout = function (props: PropsWithChildren<any>) {
    return (<>{props.children}</>)
}

export default Layout;