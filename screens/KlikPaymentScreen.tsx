import GlobalStyles from "../global-styles";
import {Button, Headline, Text} from "react-native-paper";
import TransferForm from "../components/form/TransferForm";
import {StyleSheet, View} from "react-native";
import KlikCode from "../components/transfer/KlikCode";
import Colors from "../constants/colors";
import KlikPaymentInfo from "../components/transfer/KlikPaymentInfo";
import {KLIK_CODE_TIME, KLIK_PAYMENT_TIME} from "../constants/contansts";
import KlikProgressBar from "../components/KlikProgressBar";

const KlikPaymentScreen = () => {
  return (
    <View style={GlobalStyles.container}>
      <Headline style={GlobalStyles.headline}>KLIK payment</Headline>
      <Text style={styles.textInfo}>The KLIK payment is awaiting for your confirmation</Text>
      <KlikPaymentInfo />
      <KlikProgressBar marginTop={40} duration={KLIK_PAYMENT_TIME} />
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