import React from "react";
import Image from "next/image";
import CheckerLogo from "@media/checker-logo.svg";
import { Divider, Flex } from "antd";

function Description() {
    return (
        <>
            <Flex align="center" justify="center">
                <Image alt="App Logo" src={CheckerLogo} height={175} width={200} />
            </Flex>
            <Divider>DELIVERY CHECKER</Divider>
        </>
    );
}

export default Description;
