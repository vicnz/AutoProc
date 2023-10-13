import { Result } from "antd";
import { CSSProperties, memo } from "react";
import AddNewPO from "@components/admin/features/purchase-order-crud";
const WrapperStyles: CSSProperties = {
    height: "calc(100vh - 112px)",
    width: "100%",
};

const CreateNewPurchaseOrder = function (props: { prID: string }) {
    return (
        <div style={WrapperStyles}>
            <Result
                status="404"
                title="No Purchase Order"
                subTitle="Create New Purchase Order Document"
                extra={
                    <>
                        <AddNewPO type="add" prId={props.prID} />
                    </>
                }
            />
        </div>
    );
};

export default memo(CreateNewPurchaseOrder);
