import StyleComponentRegistry from '@lib/Ant-Design'
import AuthListener from '@lib/state/hooks/AuthListener'
import './globals.css'
import { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Auto | Proc',
  description: 'Auto Procurement System',
  themeColor: '#C0252A',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body>
        <AuthListener>
          <StyleComponentRegistry>
            {children}
          </StyleComponentRegistry>
        </AuthListener>
      </body>
    </html>
  )
}
