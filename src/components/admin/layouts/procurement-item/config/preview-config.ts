import { ThemeConfig } from "antd";

export const DocumentPreviewThemeConfig: ThemeConfig = {
    token: {
        colorPrimary: '#C0252A',
        colorBorder: 'darkslategray',
        colorBorderBg: 'darkgray',
        fontFamily: 'arial narrow',
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