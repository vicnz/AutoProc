import StyleComponentRegistry from '@/lib/theme/antd'
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
        <StyleComponentRegistry>
          {children}
        </StyleComponentRegistry>
      </body>
    </html>
  )
}
