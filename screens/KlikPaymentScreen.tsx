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

    const {
        isLoading: isConfirmKlikPaymentLoading,
        error: confirmKlikPaymentError,
        sendRequest: sendConfirmKlikPaymentRequest
    } = useFetch();

    const getKlikConfirmTransactionTimeLeft = () => {
        const calculateKlikConfirmTransactionTimeLeft = () => {
            const oneHourInMilliseconds = 3_600_000;
            const convertToSeconds = 1000;

            const timeDifference = ((Date.now() + oneHourInMilliseconds)
                - new Date(klikTransactionCtx.klikTransaction!.dateCreated).getTime()) / convertToSeconds;

            return KLIK_PAYMENT_TIME - timeDifference;
        }

        return klikTransactionCtx.klikTransaction ? Math.floor(calculateKlikConfirmTransactionTimeLeft()) : -1;
    }

    const [timeLeft, setTimeLeft] = useState(getKlikConfirmTransactionTimeLeft() - 1);

    useEffect(() => {
        let interval: NodeJS.Timer;

        if (timeLeft >= 0) {
            interval = setInterval(() => {
                setTimeLeft(previousTimeLeft => previousTimeLeft - 1)
            }, 1000);
        } else {
            klikTransactionCtx.clearKlikTransaction();
        }

        return () => {
            clearInterval(interval);
        }
    }, [timeLeft]);

    useEffect(() => {
        if (klikTransactionCtx.klikTransaction && timeLeft < 0) {
            console.log('wielki reset')
            setTimeLeft(getKlikConfirmTransactionTimeLeft() - 1);
        }
    }, [klikTransactionCtx.klikTransaction]);

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

    const handleNavigateToHomeScreen = () => {
        // @ts-ignore
        navigation.navigate("TabsMain", {
            screen: 'Transfers'
        });
    }

    return (
        <View style={GlobalStyles.container}>
            {!!klikTransactionCtx.klikTransaction &&
                <>
                <Headline style={GlobalStyles.headline}>KLIK payment</Headline>
                <Text style={styles.textInfo}>The KLIK payment is awaiting for your confirmation</Text>
                <KlikPaymentInfo klikTransactionData={klikTransactionCtx.klikTransaction!}/>
                <KlikProgressBar marginTop={40} timeLeft={timeLeft} duration={KLIK_PAYMENT_TIME}/>
                <Button onPress={confirmKlikPaymentHandler} mode='contained' style={styles.mainButton}
                        labelStyle={GlobalStyles.buttonLabel}>CONFIRM PAYMENT</Button>
                </>
            }
            {!klikTransactionCtx.klikTransaction &&
                <>
                    <Headline style={GlobalStyles.headline}>KLIK payment</Headline>
                    <View style={styles.klikExpiredContainer}>
                        <MaterialIcons name="cancel" size={48} color="red" />
                        <Text style={[styles.textInfo, styles.textKlikExpired]}>Klik payment has expired</Text>
                        <Button onPress={handleNavigateToHomeScreen} mode='contained' style={[styles.mainButton, styles.navigationButton]}>EXIT</Button>
                    </View>
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
    mainButton: {
        marginTop: 10
    },
    klikExpiredContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 300
    },
    textKlikExpired: {
        fontSize: 16,
        marginTop: 10
    },
    navigationButton: {
        marginTop: 20,
        width: '60%'
    }
});