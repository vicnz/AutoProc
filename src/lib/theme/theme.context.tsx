'use client';


//TODO create a Performance Centric Theme Updater Pattern

import { PropsWithChildren, useContext, createContext, useState, useEffect } from 'react';

export type IThemeMode = 'dark' | 'default'
const Theme = createContext<IThemeMode>('default')
const ToggleTheme = createContext<(mode: IThemeMode) => void>(() => { })

export default function ThemeContext(props: PropsWithChildren<any>) {
    const [mode, setMode] = useState<IThemeMode>('default')

    useEffect(() => {
        if (localStorage.getItem('theme')) {
            // setMode(localStorage.getItem('theme') as IThemeMode) //untoggle this on production
        }
    }, [])

    return (
        <>
            <ToggleTheme.Provider value={(value: IThemeMode) => { setMode(value) }}>
                <Theme.Provider value={mode}>
                    {props.children}
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

