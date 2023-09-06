import { CheckOutlined, PrinterOutlined, QrcodeOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Divider, Dropdown, Popover, Switch, Tag } from "antd"
import ToggleView from "./toggleview";
import { memo } from 'react'
import { useManager } from "./manager";
import { useReactToPrint } from 'react-to-print'

const PurchaseRequestHeader = function (props: { printRef?: any }) {
    const [state, dispatch] = useManager()

    const onPrint = useReactToPrint({
        content: () => props.printRef?.current
    })
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '56px', paddingRight: '25px', }}>
            <div>
                PURCHASE REQUEST
                <Divider type='vertical' />
                <Popover title="Final" content="Document is Approved and Ready for Release">
                    <Switch />
                </Popover>
            </div>
            <ToggleView />
            <div>
                <Dropdown.Button
                    icon={<PrinterOutlined />}
                    type='primary'
                    onClick={() => { alert("Save Button Clicked") }}
                    menu={{
                        items: [
                            {
                                key: '1',
                                label: 'Tracking',
                                icon: <QrcodeOutlined />,
                                onClick: () => { }
                            },
                            {
                                key: '2',
                                label: 'Print',
                                icon: <PrinterOutlined />,
                                onClick: () => { onPrint() }
                            },
                        ],
                    }}
                >
                    Save
                </Dropdown.Button>
            </div>
        </div>
    )
}

export default memo(PurchaseRequestHeader);