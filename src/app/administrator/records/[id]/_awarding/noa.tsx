'use client';

import { Descriptions, List } from "antd";
import Previewheader from "../_components/previewheader";

const NoticeOfAward = function (props: { data: any }) {
    console.log(props.data)
    return (
        <>
            <Previewheader height={200}>
                <div style={{ textAlign: 'center' }}>
                    <br />
                    <span style={{}}>Bids & Awards Committee</span> <br />
                    <span style={{ fontSize: '1.5em', fontWeight: 'bold' }}>
                        LETTER OF NOTICE
                    </span>
                </div>
            </Previewheader>
            <div style={{ padding: '5px 25px' }}>
                <div>
                    <p>Owner or Authorized Representative</p>
                    <p>Position</p>
                    <p>Name of Lowest Calculated Bidder</p>
                    <p>Address</p>
                </div>
                <div>
                    <p>Madam/Sir</p>
                    <p>  We are happy to notify you that your quotation dated +date of quotation+ for the +purpose+., with PR # +PR number+ for the contract price equivalent to +total amount of quotation+ ONLY (Php +numerical value+) is hereby accepted.</p>
                    <p>You are hereby required to provide within Ten (10) days a certified photocopy of the following requirements:</p>
                    <List>
                        <List.Item key={'mayors"permit'}>1. Updated Mayor's Permit/Business Permit.</List.Item>
                        <List.Item key={'philgeps"reg'}>2. PhilGEPS Registration no.</List.Item>
                        <List.Item key={'latestincome'}>3. Latest Income/Business Tax Return</List.Item>
                        <List.Item key={'notarize'}>4. Duly Notarized Omnibus Sworn Statement</List.Item>
                        <List.Item key={'cert-reg'}>5. Certificate of Registration (BRI 2307)</List.Item>
                        <List.Item key={'lb-details'}>6. Land Bank Account Details</List.Item>
                    </List>
                    <p>However, If you already have a maintaining and updated file of the above-mentioned requirements in the BAC Office you may no longer require its re-submission (Annex "H", Appendix "A" Section III)</p>
                    <p>*For individuals engaged under Sec. 53.6, 53.7, and 53.9 of the IRR of RA 9184, only the BIR Certificate of Registration shall be submitted in lieu of DTI Registration and Mayor’s Permit.</p>
                </div>
            </div>
        </>
    )
}

export default NoticeOfAward;