import {configureFonts, DefaultTheme} from 'react-native-paper';
import Colors from "./constants/colors";
import {Theme} from "react-native-paper/lib/typescript/types";

const fontConfig = {
    web: {
        regular: {
            fontFamily: 'roboto',
            fontWeight: 'normal',
        },
        medium: {
            fontFamily: 'roboto-medium',
            fontWeight: 'normal',
        },
        light: {
            fontFamily: 'roboto-light',
            fontWeight: 'normal',
        },
        thin: {
            fontFamily: 'roboto-thin',
            fontWeight: 'normal',
        },
    },
    ios: {
        regular: {
            fontFamily: 'sans-serif',
            fontWeight: 'normal',
        },
        medium: {
            fontFamily: 'sans-serif-medium',
            fontWeight: 'normal',
        },
        light: {
            fontFamily: 'sans-serif-light',
            fontWeight: 'normal',
        },
        thin: {
            fontFamily: 'sans-serif-thin',
            fontWeight: 'normal',
        },
    },
    android: {
        regular: {
            fontFamily: 'roboto',
            fontWeight: 'normal',
        },
        medium: {
            fontFamily: 'roboto-medium',
            fontWeight: 'normal',
        },
        light: {
            fontFamily: 'roboto-light',
            fontWeight: 'normal',
        },
        thin: {
            fontFamily: 'roboto-thin',
            fontWeight: 'normal',
        },
    }
};

const theme: Theme = {
    ...DefaultTheme,
    dark: true,
    mode: 'adaptive',
    roundness: 2,
    fonts: {
        ...DefaultTheme.fonts,
        // @ts-ignore
        fonts: configureFonts(fontConfig)
    },
    colors: {
        ...DefaultTheme.colors,
        primary: Colors.PRIMARY,
        text: Colors.PRIMARY,
        accent: Colors.SECONDARY,
        disabled: Colors.NAVIGATION_INACTIVE_TEXT,
        background: Colors.MAIN_BACKGROUND,
        surface: Colors.COMPONENT_BACKGROUND
    },
}

export default theme;