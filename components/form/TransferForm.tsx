import {Button, HelperText, Text, TextInput} from "react-native-paper";
import InputTheme from "../../constants/input-theme";
import BalanceAmountInput from "../input/BalanceAmountInput";
import {StyleSheet, View} from "react-native";
import Colors from "../../constants/colors";
import GlobalStyles from "../../global-styles";
import {findCurrencyByName, findCurrencySymbolByCurrencyName} from "../../common/transfer";
import {SubAccountCurrencyBalance} from "../../screens/TransfersScreen";
import {FormProps} from "../../common/types";
import useTransferInput from "../../hook/use-transfer-input";
import {isNotEmpty, isValidAccountNumber, isValidAmount, isValidTransferAmount} from "../../common/validation";
import Decimal from "decimal.js";
import useInput from "../../hook/use-input";
import {shouldUpdateCurrencyInput} from "../../common/update";
import {AlertState} from "../alert/AlertSnackBar";
import {useNavigation} from "@react-navigation/native";

const TransferForm: React.FC<FormProps> = ({ showDialog, subAccountBalanceList, selectedCurrencyName}) => {
  const navigation = useNavigation();

  const {
    value: accountNumberValue,
    isValid: accountNumberValueIsValid,
    hasError: accountNumberHasError,
    setIsTouched: setIsAccountNumberTouched,
    valueChangeHandler: accountNumberChangeHandler,
    inputBlurHandler: accountNumberBlurHandler,
    clearInput: clearAccountNumber,
    setEnteredValue: setAccountNumberValue
  } = useInput(isValidAccountNumber);
  const {
    value: titleValue,
    isValid: titleValueIsValid,
    hasError: titleHasError,
    setIsTouched: setIsTitleTouched,
    valueChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
    clearInput: clearTitleValue
  } = useInput(isNotEmpty);
  const {
    value: amountValue,
    isValid: amountValueIsValid,
    hasError: amountHasError,
    setIsTouched: setIsAmountTouched,
    valueChangeHandler: amountChangeHandler,
    inputBlurHandler: amountBlurHandler,
    clearInput: clearAmountValue
  } = useTransferInput(isValidTransferAmount, findCurrencyByName(selectedCurrencyName, subAccountBalanceList)!.balance, shouldUpdateCurrencyInput);

  const handleMakeTransferSuccessResponse = () => {
    const alertState: AlertState = {
      color: Colors.SNACKBAR_SUCCESS,
      isOpen: true,
      message: "Transfer successful."
    }
    navigation.navigate("TabsMain", { screen: 'Transfers', params: {
        alertState: alertState
      }});
  }

  const makeTransferHandler = () => {
    if (!allInputsValid()) {
      setAllInputsError();
      return;
    }

    handleMakeTransferSuccessResponse();
  }

  const allInputsValid = () => {
    return accountNumberValueIsValid && titleValueIsValid && amountValueIsValid;
  }

  const setAllInputsError = () => {
    const setIsTouchedList = [setIsAccountNumberTouched, setIsTitleTouched, setIsAmountTouched];

    setIsTouchedList.forEach(setIsTouched => {
      setIsTouched(true);
    })
  }

  const foundCurrency = findCurrencyByName(selectedCurrencyName, subAccountBalanceList)!;

  return (
    <>
      <View style={GlobalStyles.formView}>
        <TextInput label='Receiver' style={GlobalStyles.inputStyle} theme={InputTheme}
                   onChangeText={accountNumberChangeHandler}
                   onBlur={accountNumberBlurHandler}
                   value={accountNumberValue}
                   error={accountNumberHasError} />
        <HelperText type="error" visible={accountNumberHasError} style={GlobalStyles.inputHelperText}>
          Invalid account number.
        </HelperText>
        <TextInput label='Title' style={GlobalStyles.inputStyle} theme={InputTheme}
                   onChangeText={titleChangeHandler}
                   onBlur={titleBlurHandler}
                   value={titleValue}
                   error={titleHasError} />
        <HelperText type="error" visible={titleHasError} style={GlobalStyles.inputHelperText}>
          Field cannot be empty.
        </HelperText>
        <BalanceAmountInput showDialog={showDialog} selectedCurrencySymbol={findCurrencySymbolByCurrencyName(subAccountBalanceList, selectedCurrencyName)}
                            value={amountValue}
                            onChangeText={amountChangeHandler}
                            onBlur={amountBlurHandler}
                            error={amountHasError}/>
        <View style={styles.balanceInfoContainer}>
          <Text style={styles.balanceText}><>Currency balance after transfer: {amountValue.trim() !== '' ? Decimal.sub(foundCurrency.balance, amountValue).toString() : foundCurrency.balance.toString()} {foundCurrency.symbol}</></Text>
          <Text style={styles.balanceText}>Total balance after transfer: 15.253,51 PLN </Text>
        </View>
      </View>
      <Button mode='contained' onPress={makeTransferHandler} style={styles.transferButton} labelStyle={GlobalStyles.buttonLabel}>TRANSFER MONEY</Button>
    </>
  );
}

export default TransferForm;

const styles = StyleSheet.create({
  balanceInfoContainer: {

  },
  balanceText: {
    fontSize: 12,
    color: Colors.COMPONENT_TEXT
  },
  transferButton: {
    marginTop: 50
  }
});