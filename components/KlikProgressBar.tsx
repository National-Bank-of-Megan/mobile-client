import {ProgressBar, Text} from "react-native-paper";
import {StyleSheet, View} from "react-native";
import Colors from "../constants/colors";
import {SetStateAction, useCallback, useEffect, useState} from "react";
import {useFocusEffect} from "@react-navigation/native";

import {UseStateType} from "../model/UseStateType";
import {KLIK_CODE_TIME} from "../constants/constants";

const KlikProgressBar: React.FC<{
    marginTop?: number,
    klikToggle: UseStateType<boolean>,
    timeLeft: UseStateType<number>
}> = (props) => {

    useEffect(() => {
        let interval: NodeJS.Timer;

        if (props.timeLeft.state > -1) {
            interval = setInterval(() => {
                console.log('time left: '+props.timeLeft.state)
                console.log(props.timeLeft.state)
                props.timeLeft.setState(previousTimeLeft => previousTimeLeft - 1)
            }, 1000);
        } else {
            props.klikToggle.setState(!props.klikToggle.state)
        }
        return () => {
            clearInterval(interval);
        }
    });

    return (
        <View style={{...styles.container, marginTop: props.marginTop}}>
            <Text style={styles.validText}>Valid for the next: {props.timeLeft.state}s</Text>
            <ProgressBar progress={props.timeLeft.state / KLIK_CODE_TIME} style={styles.progressBar}/>
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