import {StyleSheet, View} from "react-native";
import Colors from "../../constants/colors";
import {Divider, Text} from "react-native-paper";
import {availableCurrencies, SubAccountCurrencyBalance} from "../../screens/TransfersScreen";
import {Dispatch, SetStateAction} from "react";
import {KlikTransaction} from "../../model/klikTransaction";

const KlikPaymentInfo: React.FC<{
    klikTransactionData: KlikTransaction;
}> = ({ klikTransactionData }) => {

    const foundCurrencySymbol = availableCurrencies[klikTransactionData.currency as keyof typeof availableCurrencies];
    const currencySymbol = foundCurrencySymbol ? foundCurrencySymbol : "$";

    return (
        <View style={styles.container}>
            <View style={styles.amountContainer}>
                <Text style={styles.infoHeader}>Amount:</Text>
                <Text style={styles.infoContentText}>{klikTransactionData.amount + " " + currencySymbol}</Text>
            </View>
            <View style={styles.receiverContainer}>
                <Text style={styles.infoHeader}>Receiver:</Text>
                <Text style={styles.infoContentText}>{klikTransactionData.receiverName}</Text>
            </View>
            <Divider style={styles.divider}/>
        </View>
    )
}

export default KlikPaymentInfo;

const styles = StyleSheet.create({
    container: {
        marginTop: 40
    },
    amountContainer: {
        paddingVertical: 25
    },
    receiverContainer: {
        paddingVertical: 25
    },
    infoHeader: {
        fontSize: 24
    },
    infoContentText: {
        color: Colors.SECONDARY,
        fontSize: 18
    },
    divider: {
        backgroundColor: Colors.DIVIDER,
        height: 1,
        marginTop: 25
    }
});