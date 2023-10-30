import { Space, Tag } from "antd"
import Image from 'next/image'
import Link from 'next/link'

//medias
import Logo from '@media/small.png'
import PageName from '@media/medium.png'
import { memo } from "react"

const PageLogo = function () {
    return (
        <Link href={'/'} passHref>
            <Space>
                <Image
                    src={Logo}
                    alt="Auto Proc Logo"
                    height={25}
                    width={25}
                    style={{ objectFit: "contain" }}
                />
                <div />
                <Image
                    src={PageName}
                    alt="Auto Proc"
                    height={15}
                    width={100}
                    style={{ objectFit: "contain" }}
                />
                <Tag color="red">ALPHA</Tag>
            </Space>
        </Link>
    )
}

export default memo(PageLogo)