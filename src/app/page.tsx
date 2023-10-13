"use client";

import { Typography, Carousel, Divider, Button, Space } from "antd";
import { } from "react";
import { PRIMARY_COLOR } from "@lib/contants";
import Image from "next/image";
import { LoginOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

const { Title, Text, Paragraph } = Typography;
export default function Index() {
  const router = useRouter();
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "grid",
        placeItems: "center",
      }}
    >
      <div>
        <Divider style={{ borderColor: PRIMARY_COLOR }}>
          <Image
            height={50}
            width={65}
            alt="page-logo"
            src={"/logo-small.png"}
          />
        </Divider>
        <Image
          height={100}
          width={800}
          alt="page-logo"
          src={"/logo-medium.png"}
        />
        <Divider style={{ borderColor: PRIMARY_COLOR }}>
          <p style={{ color: PRIMARY_COLOR }}>AUTOMATA PROCURARE</p>
        </Divider>
        <div style={{ textAlign: "center" }}>
          {/* //TODO */}
          <Button
            size="large"
            icon={<LoginOutlined />}
            type="text"
            onClick={() => router.push("/administrator")}
          >
            RECORDS MANAGEMENT SYSTEM
          </Button>
          {/* //TODO */}
        </div>
      </div>
    </div>
  );
}
