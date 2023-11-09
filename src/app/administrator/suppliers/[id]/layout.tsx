import { PropsWithChildren } from "react";
import SharedContainer from "@components/admin/content/container";
function SupplierItemLayout(props: PropsWithChildren<any>) {
    return <SharedContainer>{props.children}</SharedContainer>;
}

export default SupplierItemLayout;
