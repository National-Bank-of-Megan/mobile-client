import {ProgressBar, Text} from "react-native-paper";
import {StyleSheet, View} from "react-native";
import Colors from "../constants/colors";
import {useCallback, useEffect, useState} from "react";
import {useFocusEffect} from "@react-navigation/native";
import {KLIK_DURATION} from "../constants/constants";

const KlikProgressBar: React.FC<{
    marginTop?: number,
    shouldRestartCountdown: boolean
}> = (props) => {
    const [timeLeft, setTimeLeft] = useState(KLIK_DURATION);
    // const[current,setCurrent] = useState(props.x)

    useFocusEffect(
        useCallback(() => {
            setTimeLeft(KLIK_DURATION)
        }, [props.shouldRestartCountdown])
    );

    useEffect(() => {
        let interval: NodeJS.Timer;

        if (timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(previousTimeLeft => previousTimeLeft - 1)
            }, 1000);
        }

        return () => clearInterval(interval);
    });

    return (
        <View style={{...styles.container, marginTop: props.marginTop}}>
            <Text style={styles.validText}>Valid for the next: {timeLeft}s</Text>
            <ProgressBar progress={timeLeft / KLIK_DURATION} style={styles.progressBar}/>
        </View>
    );
}

export default KlikProgressBar;

const styles = StyleSheet.create({
    container: {},
    validText: {
        fontSize: 16,
        color: Colors.SECONDARY
    },
    progressBar: {
        marginTop: 10
    }
});