"use client";
import { useSession } from "next-auth/react";
import { notFound } from "next/navigation";
import React from "react";

function ViewLayout(props: any) {
    const session = useSession();
    if (session.data && session.data?.user.role !== "TRACKER") {
        notFound();
    } else {
        return <>{props.children}</>;
    }
}

export default ViewLayout;
