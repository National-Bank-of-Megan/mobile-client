import {StyleSheet, View} from "react-native";
import {Button, Text, TextInput} from "react-native-paper";
import InputTheme from "../../constants/input-theme";
import BalanceAmountInput from "../input/BalanceAmountInput";
import GlobalStyles from "../../global-styles";
import Colors from "../../constants/colors";
import {findCurrencyByName, findCurrencySymbolByCurrencyName, removeNonDigits} from "../../common/transfer";
import {SubAccountCurrencyBalance} from "../../screens/TransfersScreen";
import {FormProps} from "../../common/types";
import Decimal from "decimal.js";
import {useEffect} from "react";
import useInput from "../../hook/use-input";
import {isValidAmount} from "../../common/validation";
import useNumericInput from "../../hook/use-numeric-input";
import {shouldUpdateCurrencyInput} from "../../common/update";
import {useNavigation} from "@react-navigation/native";
import {AlertState} from "../alert/AlertSnackBar";

const AddMoneyForm: React.FC<FormProps> = ({ showDialog, subAccountBalanceList, selectedCurrencyName}) => {
  const navigation = useNavigation();

  const {
    value: addBalanceValue,
    isValid: addBalanceValueIsValid,
    hasError: addBalanceHasError,
    setIsTouched: setIsAddBalanceTouched,
    valueChangeHandler: addBalanceChangeHandler,
    inputBlurHandler: addBalanceBlurHandler,
    clearInput: clearAddBalanceValue
  } = useNumericInput(isValidAmount, '', shouldUpdateCurrencyInput);

  const handleAddToBalance = () => {
    const alertState: AlertState = {
      color: Colors.SNACKBAR_SUCCESS,
      isOpen: true,
      message: "Successfully added funds to your account."
    }
    navigation.navigate("TabsMain", { screen: 'Transfers', params: {
      alertState: alertState
    }});
  }

  const addBalanceHandler = () => {
    if (!addBalanceValueIsValid) {
      setIsAddBalanceTouched(true);
      return;
    }
    handleAddToBalance();
  }

  const foundCurrency = findCurrencyByName(selectedCurrencyName, subAccountBalanceList)!;

  return (
    <>
      <View style={styles.formView}>
        <BalanceAmountInput showDialog={showDialog} selectedCurrencySymbol={foundCurrency.symbol}
                            value={addBalanceValue}
                            onChangeText={addBalanceChangeHandler}
                            onBlur={addBalanceBlurHandler}
                            error={addBalanceHasError}/>
        <View style={styles.balanceInfoContainer}>
          <Text style={styles.balanceText}>
            <>Currency balance after money load: {addBalanceValue.trim() !== '' ? Decimal.add(foundCurrency.balance, addBalanceValue).toString() : foundCurrency.balance.toString()} {foundCurrency.symbol}</>
          </Text>
          <Text style={styles.balanceText}>Total balance after money load: 15.253,51 PLN </Text>
        </View>
      </View>
      <Button mode='contained' onPress={addBalanceHandler} style={styles.addMoneyButton} labelStyle={GlobalStyles.buttonLabel}>add money</Button>
    </>
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

  },
  addMoneyButton: {
    marginTop: 50
  },
  balanceText: {
    fontSize: 12,
    color: Colors.COMPONENT_TEXT
  }
});

