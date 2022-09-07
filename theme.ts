import { DefaultTheme } from 'react-native-paper';
import Colors from "./constants/colors";

const theme = {
    ...DefaultTheme,
    dark: true,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        background: Colors.MAIN_BACKGROUND
    },
}

export default theme;