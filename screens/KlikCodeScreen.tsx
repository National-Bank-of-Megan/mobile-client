import GlobalStyles from "../global-styles";
import {Button, Headline} from "react-native-paper";
import {StyleSheet, View} from "react-native";
import KlikCode from "../components/transfer/KlikCode";
import {useCallback, useState} from "react";
import {useFocusEffect} from "@react-navigation/native";
import useFetch, {RequestConfig} from "../hook/use-fetch";
import {KLIK_CODE_TIME, REST_PATH_TRANSFER} from "../constants/constants";

type KlikCode = {
    klikCode: string | null;
    generateDate: Date | null
};

const KlikCodeScreen = () => {
    const [klik, setKlik] = useState<KlikCode>({
        klikCode: null,
        generateDate: null
    })
    const [klikToggle, setKlikToggle] = useState<boolean>(false)
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const {isLoading, error, sendRequest: fetchKlik} = useFetch();

    useFocusEffect(useCallback(() => {
        const fetchKlikRequest: RequestConfig = {
            url: REST_PATH_TRANSFER + '/klik'
        };

        const handleReceivedKlikCode = (k: KlikCode) => {
            console.log(k)
            setKlik({
                klikCode: k.klikCode,
                generateDate: k.generateDate
            })
            setTimeLeft((new Date(klik.generateDate!).getUTCDate()-new Date().getUTCDate()) +KLIK_CODE_TIME)
        }
        fetchKlik(fetchKlikRequest, handleReceivedKlikCode);
    }, [klikToggle]))

    return (

        <>
            {!error &&
                <View style={GlobalStyles.container}>
                    <Headline style={GlobalStyles.headline}>KLIK code</Headline>
                    <Headline style={GlobalStyles.headline}>{klikToggle ? 'true' : 'false'}</Headline>
                    <KlikCode
                        code={klik.klikCode || ''}
                        klikToggle={{state: klikToggle, setState: setKlikToggle}}
                        isLoading={isLoading}
                        timeLeft={{state: timeLeft, setState: setTimeLeft}}
                    />
                    <Button mode='contained' icon="content-copy" contentStyle={styles.copyButtonContent}
                            style={styles.copyButton}
                            labelStyle={GlobalStyles.buttonLabel}>Copy code</Button>
                    <Button mode='contained' icon="content-copy" contentStyle={styles.copyButtonContent}
                            style={styles.copyButton}
                            labelStyle={GlobalStyles.buttonLabel}>Subscribe to klik</Button>
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