import { Space, Tag, Tooltip } from "antd";
import Image from "next/image";
import Link from "next/link";

//medias
import Logo from "@media/small.png";
import PageName from "@media/medium.png";
import { memo } from "react";

const PageLogo = function () {
    return (
        <Link href={"/administrator"} passHref>
            <Space>
                <Image src={Logo} alt="Auto Proc Logo" height={25} width={25} style={{ objectFit: "contain" }} />
                <div />
                <Image src={PageName} alt="Auto Proc" height={15} width={100} style={{ objectFit: "contain" }} />
                {/* APP IS STILL IN IT'S ALPHA PHASE */}
                <Tooltip title="The App is still in ALPHA Phase">
                    <Tag color="red">ALPHA</Tag>
                </Tooltip>
                {/* APP IS STILL IN IT'S ALPHA PHASE */}
            </Space>
        </Link>
    );
};

export default memo(PageLogo);
