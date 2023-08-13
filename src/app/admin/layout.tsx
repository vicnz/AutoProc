import Layout from './_components/layout'

import ThemeMode, { useToggleTheme } from '@lib/theme/theme.context'
export default function WelcomeLayout(props: any) {
    return (
        <ThemeMode>
            <Layout>
                {props.children}
            </Layout>
        </ThemeMode>
    )
}