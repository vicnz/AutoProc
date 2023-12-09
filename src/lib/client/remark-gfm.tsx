import { THEME_COLORS } from "@lib/theme/constant";
import { Divider, Typography } from "antd";
import { MDXProps } from "mdx/types";
import Image from "next/image";

export const options: MDXProps = {
    components: {
        h1: ({ children }) => <Typography.Title level={1}>{children}</Typography.Title>,
        h2: ({ children }) => <Typography.Title level={2}>{children}</Typography.Title>,
        h3: ({ children }) => <Typography.Title level={3}>{children}</Typography.Title>,
        h4: ({ children }) => <Typography.Title level={4}>{children}</Typography.Title>,
        h5: ({ children }) => <Typography.Title level={5}>{children}</Typography.Title>,
        p: ({ children }) => <Typography.Paragraph>{children}</Typography.Paragraph>,
        blockquote: ({ children }) => (
            <Typography.Paragraph
                style={{
                    backgroundColor: `${THEME_COLORS.ACCENT}20`,
                    padding: 10,
                    borderRadius: 4,
                }}
            >
                {children}
            </Typography.Paragraph>
        ),
        hr: () => <Divider />,
        code: ({ children }) => <Typography.Text code>{children}</Typography.Text>,
        img: (props) => (
            <div style={{ maxWidth: "100%", overflow: "auto" }}>
                <Image src={props.src as string} style={{ height: "100%", width: "100%" }} alt="something" />
            </div>
        ),
        a: (props) => (
            <Typography.Link {...(props as any)} title={props.title} href={props.href} target={props.target}>
                {props.children}
            </Typography.Link>
        ),
    },
};
