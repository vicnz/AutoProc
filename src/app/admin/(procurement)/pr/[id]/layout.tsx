'use client';

//TODO Reset Layout From Parent

import { ReactNode, useMemo } from "react";
import { usePathname } from "next/navigation";
import Panes from './_component/panes'

export default function PRDynamicLayout({ children, ...props }: { children: ReactNode }) {
    return (
        <>
            <Panes>
                {children}
            </Panes>
        </>
    )
}