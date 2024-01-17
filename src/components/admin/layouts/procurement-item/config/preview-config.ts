import { ThemeConfig } from "antd";

export const DocumentPreviewThemeConfig: ThemeConfig = {
    token: {
        colorPrimary: '#C0252A',
    },
    components: {
        Table: {
            borderColor: 'dimgray',
            rowHoverBg: 'transparent'
        },
        Descriptions: {
            colorSplit: 'lightgray',
            colorBorder: 'dimgray',
            lineWidth: 2,
            lineHeight: 2,
        },
    }
}