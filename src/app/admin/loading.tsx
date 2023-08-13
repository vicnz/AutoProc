'use client'
import { Skeleton } from "antd"
import Landing from "./_components/landing"

export default function RootLoader() {
    return (
        <Landing>
            <Skeleton loading paragraph />
            <Skeleton loading paragraph />
        </Landing>
    )
}