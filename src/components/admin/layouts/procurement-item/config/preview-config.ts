import { ThemeConfig } from "antd";

export const DocumentPreviewThemeConfig: ThemeConfig = {
    token: {
        colorPrimary: '#C0252A',
        colorBorder: 'darkslategray',
        colorBorderBg: 'darkgray',
    },
    components: {
        Table: {
            borderColor: 'lightgray',
            rowHoverBg: 'transparent'
        },
        Descriptions: {
            colorSplit: 'lightgray',
        }
    }
}