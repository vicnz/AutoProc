import {
    HomeOutlined,
    FolderOutlined,
    TeamOutlined,
    ShopOutlined,
    AppstoreOutlined,
    QuestionOutlined,
    SettingOutlined,
} from "@ant-design/icons";

export type INavbarItemType = {
    key: string;
    href: string;
    icon?: any;
    label?: string;
    disabled?: boolean;
    type?: "separator";
};

//Rendered Navigation Items
const NavbarRenderedItems: {
    top: INavbarItemType[];
    bottom: INavbarItemType[];
} = {
    top: [
        {
            key: "dashboard",
            href: "/administrator",
            icon: HomeOutlined,
            label: "Dashboard",
        },
        {
            key: "records",
            href: "/administrator/procurements",
            icon: FolderOutlined,
            label: "Records",
        },
        //! PENDING REMOVAL -> MIGRATE TO NEW-USER LAYOUT
        // {
        //     key: "user",
        //     href: "/administrator/users",
        //     icon: TeamOutlined,
        //     label: "End Users",
        // },
        //! PENDING REMOVAL -> MIGRATE TO NEW-USER LAYOUT
        {
            key: "users",
            href: "/administrator/users",
            icon: TeamOutlined,
            label: "End Users",
        },
        {
            key: "suppliers",
            href: "/administrator/suppliers",
            icon: ShopOutlined,
            label: "Suppliers",
        },
        { key: "separator1", type: "separator", href: "/" },
        {
            key: "entity",
            href: "/administrator/entities",
            icon: AppstoreOutlined,
            label: "Others",
        },
    ],
    bottom: [
        {
            key: "help",
            href: "/administrator/help",
            icon: QuestionOutlined,
            label: "Help & Feedback",
        },
        {
            key: "settings",
            href: "/administrator/settings",
            icon: SettingOutlined,
            label: "Settings",
        },
    ],
};

export default NavbarRenderedItems;
