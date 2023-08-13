import { theme, type ThemeConfig } from 'antd';
const { darkAlgorithm, compactAlgorithm, defaultAlgorithm } = theme
const ThemeProvider: ThemeConfig = {
    "token": {
        "colorPrimary": "#C0252A",
    },
    algorithm: defaultAlgorithm
}
export default ThemeProvider;