import GlobalStyles from "../global-styles";
import {Button, Headline, Text} from "react-native-paper";
import {StyleSheet, View} from "react-native";
import Colors from "../constants/colors";
import KlikPaymentInfo from "../components/transfer/KlikPaymentInfo";
import {KLIK_PAYMENT_TIME} from "../constants/constants";
import KlikProgressBar from "../components/KlikProgressBar";
import {useContext} from "react";
import {KlikTransactionContext} from "../store/context/klik-transaction-context";
import {useNavigation} from "@react-navigation/native";

const KlikPaymentScreen = () => {
    let klikTransactionCtx = useContext(KlikTransactionContext);
    const navigation = useNavigation();

    if (!klikTransactionCtx.klikTransaction) {
        navigation.navigate("TabsMain");
    }

    const getKlikConfirmTransactionTimeLeft = () => {
        const oneHourInMilliseconds = 3_600_000;
        const convertToSeconds = 1000;

        const timeDifference = ((Date.now() + oneHourInMilliseconds)
            - new Date(klikTransactionCtx.klikTransaction!.dateCreated).getTime()) / convertToSeconds;

        return KLIK_PAYMENT_TIME - timeDifference;
    }

    const klikConfirmTransactionTimeLeft = Math.floor(getKlikConfirmTransactionTimeLeft());

    return (
        <View style={GlobalStyles.container}>
            <Headline style={GlobalStyles.headline}>KLIK payment</Headline>
            <Text style={styles.textInfo}>The KLIK payment is awaiting for your confirmation</Text>
            <KlikPaymentInfo klikTransactionData={klikTransactionCtx.klikTransaction!}/>
            <KlikProgressBar marginTop={40} timeLeft={klikConfirmTransactionTimeLeft} duration={KLIK_PAYMENT_TIME} />
            <Button mode='contained' style={styles.confirmButton}
                    labelStyle={GlobalStyles.buttonLabel}>CONFIRM PAYMENT</Button>
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