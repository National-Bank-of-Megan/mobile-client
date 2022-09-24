import {StyleSheet, View} from "react-native";
import {Text, TextInput} from "react-native-paper";
import InputTheme from "../../constants/input-theme";
import BalanceAmountInput from "../input/BalanceAmountInput";
import GlobalStyles from "../../global-styles";
import Colors from "../../constants/colors";
import {findCurrencySymbolByCurrencyName} from "../../common/transfer";
import {SubAccountCurrencyBalance} from "../../screens/TransfersScreen";
import {FormProps} from "../../common/types";

const AddMoneyForm: React.FC<FormProps> = ({ showDialog, subAccountBalanceList, selectedCurrencyName}) => {
  return (
    <View style={styles.formView}>
      <BalanceAmountInput showDialog={showDialog} selectedCurrencySymbol={findCurrencySymbolByCurrencyName(subAccountBalanceList, selectedCurrencyName)} />
      <View style={styles.balanceInfoContainer}>
        <Text style={styles.balanceText}>Currency balance after money load: 320,84 $ </Text>
        <Text style={styles.balanceText}>Total balance after money load: 15.253,51 PLN </Text>
      </View>
    </View>
  );
}

export default AddMoneyForm;

const styles = StyleSheet.create({
  formView: {
    borderRadius: 10,
    paddingVertical: 60,
    paddingTop: 15,
    paddingHorizontal: 20,
    backgroundColor: Colors.COMPONENT_BACKGROUND,
    marginTop: 40
  },
  balanceInfoContainer: {
    marginTop: 10
  },
  balanceText: {
    fontSize: 12,
    color: Colors.COMPONENT_TEXT
  }
});

