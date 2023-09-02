import { ReactNode } from "react";

export default function TabItem({ children, ...props }: { children: ReactNode }) {
    return (
        <div style={{ height: 'calc(100vh - 112px)', width: '100%', position: 'relative', overflowY: 'auto' }}>
            <div style={{ height: 'auto', width: 'inherit', position: 'absolute', top: 0, left: 0 }}>
                {children}
            </div>
        </div>
    )
}