'use client';
import { ConfigProvider, ThemeConfig, theme } from 'antd';
//TODO create a Performance Centric Theme Updater Pattern

const { defaultAlgorithm, darkAlgorithm } = theme;
import { PropsWithChildren, useContext, createContext, useState, useEffect } from 'react';
export type IThemeMode = 'dark' | 'default'
const Theme = createContext<IThemeMode>('default')
const ToggleTheme = createContext<(mode: IThemeMode) => void>(() => { })

export default function ThemeContext(props: PropsWithChildren<any>) {
    const [mode, setMode] = useState<IThemeMode>('default')

    useEffect(() => {
        //TODO make theme compliant to client side store
    }, [])

    return (
        <>
            <ToggleTheme.Provider value={(value: IThemeMode) => { setMode(value) }}>
                <Theme.Provider value={mode}>
                    <ConfigProvider theme={{ ...ThemeConfigProvider, algorithm: (mode === 'dark') ? darkAlgorithm : defaultAlgorithm }}>
                        {props.children}
                    </ConfigProvider>
                </Theme.Provider>
            </ToggleTheme.Provider>
        </>
    )
}


export const useToggleTheme = () => {
    const mode = useContext(Theme)
    const setMode = useContext(ToggleTheme)

    function update(value: IThemeMode) {
        setMode(value)
        // localStorage.setItem('theme', value) //untoggle this on production
    }
    return { mode, setMode: update }
}


export const ThemeConfigProvider: ThemeConfig = {
    "token": {
        "colorPrimary": "#C0252A",
    },
    algorithm: defaultAlgorithm
}
