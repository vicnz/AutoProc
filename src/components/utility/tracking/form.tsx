"use client";

import { ScanOutlined } from "@ant-design/icons";
import {
    Space, Button,
    Select,
    Modal,
    Drawer, App,
    Result
} from "antd";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import dayjs from "dayjs";
import QRScanner from "../qr.test.scanner";
import Preview from './preview';

const Scanner = dynamic(async () => await import('@components/utility/reader'), { ssr: false })
const TrackingStatus = dynamic(async () => await import('./preview'))

type Props = {
    offices: Array<{ id: string, name: string, description: string | null }>
}
///

function EditForm(props: Props) {
    const { message } = App.useApp(); //Message
    const [office, setOffice] = useState<string>(); //SELECT OFFICE
    const [dialog, openDialog] = useState(false); //OPEN MODAL
    const [drawer, openDrawer] = useState(false); //OPEN DRAWER
    const [decodedString, setDecodedString] = useState<string>(); //DECODED SCANNER STRING
    const [result, setResult] = useState<Array<any>>() //TRACKING RESULT TEST

    //If QR is Detected Then Set ACTIVE VALUE
    const onScannerResult = (result: any) => {
        if (result) {
            setDecodedString(result?.text);
        }
    };

    //OPEN THE SCANNER
    const openScanner = () => {
        if (!office) {
            message.warning("Please Select a Destination Office");
        } else {
            openDialog(true);

            //THIS CLOSES THE MODAL
            //PURPOSE? -> TO PREVENT DATA LEAKS
            //CONTINUES RUNNING OF CAMERA IS RESOURCE WASTING

            setTimeout(() => {
                openDialog(false);
            }, 15000); //CLOSES AFTER 15 SECONDS
        }
    };

    //SUBMIT TO SERVER
    const submitData = async () => {
        //CHECK IF DECODED STRING IS SET
        if (!decodedString) {
            message.error("ERROR, Please Try Again");
        } else {
            const response = await fetch("/utility/api/tracking", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token: decodedString, //SEND DECODED STRING
                    officeId: office, //SEND SELECT OFFICE ID
                    timestamp: dayjs().toISOString(), //TIMESTAMP
                }),
            });

            if (response.ok) {
                //IF SERVER OK THEN
                const parsed = await response.json() //GET TRACKING STATUS
                setResult(parsed.tracking) //GET TRACKING

                setTimeout(() => {
                    message.info("Tracking Sent");
                    openDialog(false)
                    openDrawer(true)
                }, 1000)
            } else {
                message.error("Error, Please Try Again");
            }
        }
    };

    const options = useMemo(() => {
        return props.offices.map((item) => ({ label: item.description, value: item.id }));
    }, [props.offices]);

    return (
        <>
            <Space direction="vertical" style={{ width: "300px" }}>
                <Select
                    size="large"
                    options={options}
                    placeholder="Select Department"
                    style={{ width: "100%" }}
                    onChange={(e) => setOffice(e)}
                />
                <Button
                    type='primary'
                    icon={<ScanOutlined />}
                    block
                    size="large"
                    onClick={openScanner}
                >
                    SCAN QR CODE
                </Button>
            </Space>

            {/* MODAL */}
            <Modal
                destroyOnClose
                open={dialog}
                onCancel={() => {
                    openDialog(false)
                    setDecodedString(undefined)
                }}
                title={"Scanning Code"}
                cancelText="Close & Retry"
                cancelButtonProps={{ onClick: () => { openDialog(false); setDecodedString(undefined) } }}
                onOk={() => submitData()}
                okButtonProps={{ disabled: !decodedString }}
            >
                <i>
                    This Dialog will close in 15 seconds if it does not detect any
                    QRCode...
                </i>
                <br />
                <br />

                {/* SCANNER */}
                <Scanner
                    onError={(err: any) => message.error("Error Occured In QR Scanner")}
                    onScan={onScannerResult}
                    onLoad={() => console.log('loading scanner....')}
                    style={{ width: '100%' }}
                />
                {/* <QRScanner
                    onError={(err: any) => console.log(err)}
                    onScan={onScannerResult}
                    style={{}}
                /> */}
                {/* SCANNER */}
            </Modal>
            {/* SHOW PREVIEW DATA */}
            <Drawer
                destroyOnClose
                open={drawer}
                title="Tracking Information"
                onClose={() => {
                    openDrawer(false);
                    setResult(undefined);
                    setDecodedString(undefined);
                }}
                placement="bottom"
            >
                {
                    result ?
                        <Preview data={result} />
                        :
                        <Result status={'info'} title="No Data" />
                }
            </Drawer>
        </>
    );
}

export default EditForm;
