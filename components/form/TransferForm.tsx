import {Text, TextInput} from "react-native-paper";
import InputTheme from "../../constants/input-theme";
import BalanceAmountInput from "../input/BalanceAmountInput";
import {StyleSheet, View} from "react-native";
import Colors from "../../constants/colors";
import GlobalStyles from "../../global-styles";

const TransferForm: React.FC<{
  showDialog: () => void;
}> = ({showDialog}) => {
  return (
    <View style={GlobalStyles.formView}>
      <TextInput label='Receiver' style={GlobalStyles.inputStyle} theme={InputTheme} />
      <TextInput label='Title' style={GlobalStyles.inputStyle} theme={InputTheme} />
      <BalanceAmountInput showDialog={showDialog} />
      <View style={styles.balanceInfoContainer}>
        <Text style={styles.balanceText}>Currency balance after transfer: 320,84 $ </Text>
        <Text style={styles.balanceText}>Total balance after transfer: 15.253,51 PLN </Text>
      </View>
    </View>
  );
}

export default TransferForm;

const styles = StyleSheet.create({
  balanceInfoContainer: {
    marginTop: 10
  },
  balanceText: {
    fontSize: 12,
    color: Colors.COMPONENT_TEXT
  }
});