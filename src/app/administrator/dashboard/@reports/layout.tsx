import React, { PropsWithChildren } from "react";

function Layout(props: PropsWithChildren<any>) {
    return <div>{props.children}</div>;
}

export default Layout;
