import {ProgressBar, Text} from "react-native-paper";
import {StyleSheet, View} from "react-native";
import Colors from "../constants/colors";
import {SetStateAction, useCallback, useEffect, useState} from "react";
import {useFocusEffect} from "@react-navigation/native";
import {KLIK_DURATION} from "../constants/constants";
import {UseStateType} from "../model/UseStateType";

const KlikProgressBar: React.FC<{
    marginTop?: number,
    klikToggle: UseStateType<boolean>
}> = (props) => {
    const [timeLeft, setTimeLeft] = useState(KLIK_DURATION);

    useEffect(() => {
        let interval: NodeJS.Timer;

        if (timeLeft > -1) {
            interval = setInterval(() => {
                setTimeLeft(previousTimeLeft => previousTimeLeft - 1)
            }, 1000);
        }else{
            console.log("time's up")
            props.klikToggle.setState(!props.klikToggle.state)
            console.log('setting time left')
            setTimeLeft(KLIK_DURATION)
        }

        return () => {
            clearInterval(interval);
        }
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