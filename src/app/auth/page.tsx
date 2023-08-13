import { word } from '@/components/shared/logo'
import LoginAuth from './_components/client.auth'
import StyleLayout from './_styles/page.module.css'

export default function AuthenticationPage() {
    return (
        <div className={StyleLayout.contentWrapper}>
            <div className={StyleLayout.top}>
                <div>
                    <img src={word} alt="page-logo" style={{ height: '30px' }} />
                    <br />
                    <span style={{ color: 'lightgray' }}>Procurement Monitoring System</span>
                </div>
            </div>
            <div className={StyleLayout.middle}>
                <LoginAuth />
            </div>
            <div style={{ textAlign: 'center', display: 'grid', placeItems: 'center', color: 'lightgray' }}>
                <p>All Rights Reserved to &copy;AutoProc.app</p>
            </div>
        </div>
    )
}