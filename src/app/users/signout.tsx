"use client";

import { signOut } from "next-auth/react";
import { Button } from "antd";
import React from "react";

function SignOutTemporary() {
    async function logout() {
        await signOut({ callbackUrl: "/" });
    }
    return <Button onClick={logout}>Sign Out</Button>;
}

export default SignOutTemporary;
