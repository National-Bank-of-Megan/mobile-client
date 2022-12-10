import GlobalStyles from "../global-styles";
import {Button, Headline} from "react-native-paper";
import {StyleSheet, View} from "react-native";
import KlikCode from "../components/transfer/KlikCode";
import {useCallback, useEffect, useState} from "react";
import {useFocusEffect} from "@react-navigation/native";
import useFetch, {RequestConfig} from "../hook/use-fetch";
import {KLIK_CODE_TIME, KLIK_PAYMENT_TIME, REST_PATH_TRANSFER} from "../constants/constants";

type KlikCode = {
    klikCode: string | null;
    generateDate: Date | null
};

const KlikCodeScreen = () => {
    const [klik, setKlik] = useState<KlikCode>({
        klikCode: null,
        generateDate: null
    })

    const [timeLeft, setTimeLeft] = useState<number>(-1);
    const {isLoading, error, sendRequest: fetchKlik} = useFetch();

    const getKlikCodeTimeLeft = (k: KlikCode) => {
        const oneHourInMilliseconds = 3_600_000;
        const convertToSeconds = 1000;

        const timeDifference = ((Date.now() + oneHourInMilliseconds)
            - new Date(k.generateDate!).getTime()) / convertToSeconds;

        return KLIK_CODE_TIME - timeDifference;
    }

    useFocusEffect(useCallback(() => {
        const fetchKlikRequest: RequestConfig = {
            url: REST_PATH_TRANSFER + '/klik'
        };

        const handleReceivedKlikCode = (k: KlikCode) => {
            console.log(k)
            setKlik({
                klikCode: k.klikCode,
                generateDate: k.generateDate
            });

            const klikCodeTimeLeft = Math.floor(getKlikCodeTimeLeft(k));
            setTimeLeft(klikCodeTimeLeft - 1);
        }
        if (timeLeft == -1) {
            fetchKlik(fetchKlikRequest, handleReceivedKlikCode);
        }
    }, [timeLeft]));

    useEffect(() => {
        let interval: NodeJS.Timer;

        if (timeLeft >= 0) {
            interval = setInterval(() => {
                setTimeLeft(previousTimeLeft => previousTimeLeft - 1)
            }, 1000);
        }

        return () => {
            clearInterval(interval);
        }
    }, [timeLeft]);

    return (

        <>
            {!error &&
                <View style={GlobalStyles.container}>
                    <Headline style={GlobalStyles.headline}>KLIK code</Headline>
                    <KlikCode
                        code={klik.klikCode || ''}
                        isLoading={isLoading}
                        timeLeft={timeLeft}
                    />
                    <Button mode='contained' icon="content-copy" contentStyle={styles.copyButtonContent}
                            style={styles.copyButton}
                            labelStyle={GlobalStyles.buttonLabel}>Copy code</Button>
                </View>}
            {error &&
                <View style={GlobalStyles.container}>
                    <Headline style={GlobalStyles.headline}>Klik currently unavailable. Try again later.</Headline>
                </View>}
        </>
    );
}

export default KlikCodeScreen;

const styles = StyleSheet.create({
    copyButton: {
        marginTop: 30
    },
    copyButtonContent: {
        flexDirection: 'row-reverse'
    }
});