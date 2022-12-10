import GlobalStyles from "../global-styles";
import {Button, Headline, Text} from "react-native-paper";
import {StyleSheet, View} from "react-native";
import Colors from "../constants/colors";
import KlikPaymentInfo from "../components/transfer/KlikPaymentInfo";
import {KLIK_PAYMENT_TIME, REST_PATH_TRANSFER} from "../constants/constants";
import KlikProgressBar from "../components/KlikProgressBar";
import {useContext, useEffect, useState} from "react";
import {KlikTransactionContext} from "../store/context/klik-transaction-context";
import {useNavigation} from "@react-navigation/native";
import useFetch, {RequestConfig} from "../hook/use-fetch";
import {AlertState} from "../components/alert/AlertSnackBar";
import { MaterialIcons } from '@expo/vector-icons';

const KlikPaymentScreen = () => {
    let klikTransactionCtx = useContext(KlikTransactionContext);
    const navigation = useNavigation();
    const [showTransactionInvalidScreen, setShowTransactionInvalidScreen] = useState(false);

    const {
        isLoading: isConfirmKlikPaymentLoading,
        error: confirmKlikPaymentError,
        sendRequest: sendConfirmKlikPaymentRequest
    } = useFetch();

    if (!klikTransactionCtx.klikTransaction && !showTransactionInvalidScreen) {
        console.log("Wracamy..." + showTransactionInvalidScreen);
        // @ts-ignore
        navigation.navigate("TabsMain");
    }

    useEffect(() => {
        if (showTransactionInvalidScreen) {
            klikTransactionCtx.clearKlikTransaction();
        }
    }, [showTransactionInvalidScreen]);

    const handleConfirmKlikPaymentSuccessResponse = () => {
        const alertState: AlertState = {
            color: Colors.SNACKBAR_SUCCESS,
            isOpen: true,
            message: "Klik payment successful."
        }

        klikTransactionCtx.clearKlikTransaction();

        // @ts-ignore
        navigation.navigate("TabsMain", {
            screen: 'Transfers', params: {
                alertState: alertState
            }
        });
    }

    const confirmKlikPaymentHandler = () => {
        const sendConfirmKlikPaymentRequestContent: RequestConfig = {
            url: REST_PATH_TRANSFER + "/klik/payment/confirm",
            method: "POST"
        };

        sendConfirmKlikPaymentRequest(sendConfirmKlikPaymentRequestContent, handleConfirmKlikPaymentSuccessResponse);
    }

    const getKlikConfirmTransactionTimeLeft = () => {
        const oneHourInMilliseconds = 3_600_000;
        const convertToSeconds = 1000;

        const timeDifference = ((Date.now() + oneHourInMilliseconds)
            - new Date(klikTransactionCtx.klikTransaction!.dateCreated).getTime()) / convertToSeconds;

        return KLIK_PAYMENT_TIME - timeDifference;
    }

    const klikConfirmTransactionTimeLeft = klikTransactionCtx.klikTransaction ? Math.floor(getKlikConfirmTransactionTimeLeft()) : 0;

    return (
        <View style={GlobalStyles.container}>
            {!!klikTransactionCtx.klikTransaction &&
                <>
                <Headline style={GlobalStyles.headline}>KLIK payment</Headline>
                <Text style={styles.textInfo}>The KLIK payment is awaiting for your confirmation</Text>
                <KlikPaymentInfo klikTransactionData={klikTransactionCtx.klikTransaction!}/>
                <KlikProgressBar marginTop={40} timeLeft={klikConfirmTransactionTimeLeft} duration={KLIK_PAYMENT_TIME}
                                 klikToggle={{state: showTransactionInvalidScreen, setState: setShowTransactionInvalidScreen}}/>
                <Button onPress={confirmKlikPaymentHandler} mode='contained' style={styles.confirmButton}
                        labelStyle={GlobalStyles.buttonLabel}>CONFIRM PAYMENT</Button>
                </>
            }
            {!klikTransactionCtx.klikTransaction &&
                <>
                    <Headline style={GlobalStyles.headline}>KLIK payment</Headline>
                    <MaterialIcons name="cancel" size={24} color="red" />
                    <Text style={styles.textInfo}>Klik payment expired</Text>
                </>
            }
        </View>
    );
}

export default KlikPaymentScreen;

const styles = StyleSheet.create({
    textInfo: {
        color: Colors.SECONDARY,
        textAlign: 'center'
    },
    confirmButton: {
        marginTop: 10
    }
});