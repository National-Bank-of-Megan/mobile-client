import {Text} from "react-native-paper";
import {StyleSheet, View} from "react-native";
import Colors from "../../constants/colors";
import KlikProgressBar from "../KlikProgressBar";
import {useCallback, useState} from "react";
import {useFocusEffect} from "@react-navigation/native";

const KlikCode: React.FC<{ code: string }> = (props) => {
    const [shouldRestartCountdown, setShouldRestartCountdown] = useState(false);

    useFocusEffect(
        useCallback(() => {
            setShouldRestartCountdown(!shouldRestartCountdown)
        }, [props.code])
    );

    return (
        <View style={styles.container}>
            <KlikProgressBar shouldRestartCountdown={shouldRestartCountdown}/>
            <View style={styles.codeContainer}>
                <Text style={styles.codeTextStyle}>{props.code}</Text>
            </View>
        </View>
    );
}

export default KlikCode;

const styles = StyleSheet.create({
    container: {
        marginTop: 40
    },
    codeContainer: {
        marginTop: 25,
        backgroundColor: Colors.COMPONENT_BACKGROUND,
        padding: 20,
        borderRadius: 3
    },
    codeTextStyle: {
        fontSize: 48,
        letterSpacing: 18,
        color: Colors.SECONDARY,
        textAlign: 'center'
    }
});
