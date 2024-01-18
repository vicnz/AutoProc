import { PropsWithChildren } from "react";
import { Template } from '@components/content'
function SupplierItemLayout(props: PropsWithChildren<any>) {
    return <Template>{props.children}</Template>;
}

export default SupplierItemLayout;
