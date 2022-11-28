import GlobalStyles from "../global-styles";
import {Button, Headline} from "react-native-paper";
import {StyleSheet, View} from "react-native";
import KlikCode from "../components/transfer/KlikCode";
import {useCallback, useState} from "react";
import store from "../store/store";
import {useFocusEffect} from "@react-navigation/native";


const KlikCodeScreen = () => {
    const [klik, setKlik] = useState<string>('')
    const [isKlikAvailable, setIsKlikAvailable] = useState<boolean>(true)

    useFocusEffect(useCallback(() => {
        let ws = new WebSocket('ws://10.0.2.2:8081/klik?jwt=' + store.getState().userAuthentication.authToken
        );
        ws.onopen = () => {
            console.log('WEBSOCKET CONNECTION OPENED');
        };
        ws.onmessage = (e) => {
            console.log('WEBSOCKET CONNECTION RECEIVED DATA');
            setKlik(e.data)
        };
        ws.onerror = (e) => {
            console.log('WEBSOCKET CONNECTION ERROR');
            setIsKlikAvailable(false)
        };
        ws.onclose = (e) => {
            console.log('WEBSOCKET CONNECTION CLOSED');
            setIsKlikAvailable(false)
        };
    }, []))

    return (

        <>
            {isKlikAvailable &&
                <View style={GlobalStyles.container}>
                    <Headline style={GlobalStyles.headline}>KLIK code</Headline>
                    <KlikCode code={klik}/>
                    <Button mode='contained' icon="content-copy" contentStyle={styles.copyButtonContent}
                            style={styles.copyButton}
                            labelStyle={GlobalStyles.buttonLabel}>Copy code</Button>
                    <Button mode='contained' icon="content-copy" contentStyle={styles.copyButtonContent}
                            style={styles.copyButton}
                            labelStyle={GlobalStyles.buttonLabel}>Subscribe to klik</Button>
                </View>}
            {!isKlikAvailable &&
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