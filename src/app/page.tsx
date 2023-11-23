"use client";

import {
    ArrowRightOutlined,
    CodeOutlined,
    ShoppingCartOutlined,
    VerticalLeftOutlined,
    VerticalRightOutlined,
} from "@ant-design/icons";
import { PRIMARY_COLOR } from "@lib/contants";
import { Button, ConfigProvider, Typography } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./page.module.css";

const { Title, Text, Paragraph } = Typography;
export default function Index() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    return (
        <ConfigProvider theme={{ token: { fontFamily: "Poppins", colorPrimary: PRIMARY_COLOR, colorText: "#38424F" } }}>
            <div className={styles["page-pattern-wrapper"]}>
                <div className={styles["page-pattern-opacity"]} />
                <div className={styles["page-content"]}>
                    <div
                        style={{
                            height: "100%",
                            width: "100%",
                            position: "relative",
                            overflow: "hidden",
                        }}
                        className={styles["image-figure"]}
                    >
                        <img
                            src="/acad.jpg"
                            style={{
                                height: "100vh",
                                width: "150%",
                                position: "absolute",
                                top: 0,
                                left: 0,
                            }}
                        />
                        <div
                            style={{
                                position: "absolute",
                                bottom: 0,
                                width: "100%",
                                left: 0,
                                zIndex: 1,
                                color: "white",
                                textAlign: "center",
                                height: 50,
                                paddingBottom: 10,
                                display: "grid",
                                placeItems: "center",
                                background: "linear-gradient(0deg, rgba(255, 255, 255, 0.5), transparent)",
                            }}
                        >
                            <span>
                                <CodeOutlined />
                                &nbsp;
                                <span>BUILD BY NEONZONE</span>
                            </span>
                        </div>
                    </div>

                    <div>
                        <div className={styles["border-top"]} style={{ background: PRIMARY_COLOR }}></div>
                        <div className={styles["page-texts"]}>
                            <div className={styles["logo-banner"]}>
                                <Image height={50} width={58} alt="page-logo" src={"/logo-small.png"} />
                                <Image height={30} width={220} alt="page-logo" src={"/logo-medium.png"} />
                                <Text style={{ fontSize: "1.5em", fontWeight: "bold" }}>V0.80.2023</Text>
                            </div>
                            <br />
                            <br />
                            <Text
                                style={{ fontWeight: "bold", lineHeight: 1.2, color: "#38424F" }}
                                className={styles.lead}
                            >
                                SUPER-CHARGE YOUR <span style={{ color: PRIMARY_COLOR }}>PROCUREMENT WORKFLOWS</span>.
                            </Text>
                            <br />
                            <p className={styles.caption}>
                                <VerticalLeftOutlined /> Elevate your{" "}
                                <strong style={{ color: PRIMARY_COLOR }}>Procurement Workflow</strong> with our
                                intuitive{" "}
                                <strong style={{ color: PRIMARY_COLOR, textDecoration: "underline" }}>
                                    Procurement Management System
                                </strong>
                                . From seamless requisitions to automated generations, our platform streamlines every
                                step, ensuring efficiency and precision in your procurement process.
                                <VerticalRightOutlined />
                            </p>
                            <Button
                                size="large"
                                type="primary"
                                onClick={() => {
                                    setLoading(true);
                                    router.push("/api/auth/signin");
                                }}
                                icon={<ShoppingCartOutlined />}
                                loading={loading}
                            >
                                OPEN AUTOPROC APP <ArrowRightOutlined />
                            </Button>
                            <br />
                        </div>
                    </div>
                </div>
            </div>
        </ConfigProvider>
    );
}
