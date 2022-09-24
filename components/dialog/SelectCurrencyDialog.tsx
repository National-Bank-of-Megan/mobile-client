import {Button, Dialog, Paragraph, RadioButton, Text} from "react-native-paper";
import {StyleSheet, View} from "react-native";
import Colors from "../../constants/colors";
import {Dispatch, SetStateAction} from "react";
import {SubAccountCurrencyBalance} from "../../screens/TransfersScreen";

const SelectCurrencyDialog: React.FC<{
  isDialogVisible: boolean;
  hideDialog: () => void;
  subAccountBalanceList: SubAccountCurrencyBalance[];
  selectedCurrencyName: string;
  setSelectedCurrencyName: Dispatch<SetStateAction<string>>;
}> = ({isDialogVisible, hideDialog, subAccountBalanceList, selectedCurrencyName, setSelectedCurrencyName}) => {

  const handleCurrencyChange = (newCurrencyName: string) => {
    setSelectedCurrencyName(newCurrencyName);
    hideDialog();
  }

  return (
    <Dialog visible={isDialogVisible} onDismiss={hideDialog}>
      <Dialog.Title style={styles.text}>Select currency</Dialog.Title>
      <Dialog.Content style={styles.container}>
        <RadioButton.Group onValueChange={handleCurrencyChange} value={selectedCurrencyName}>
          {subAccountBalanceList?.map((subAccountBalance) =>
            <View key={subAccountBalance.currency} style={styles.row}>
              <RadioButton color={Colors.PRIMARY} uncheckedColor={Colors.SECONDARY} value={subAccountBalance.currency} />
              <Text style={styles.text}>{subAccountBalance.currency}</Text>
            </View>
          )}
        </RadioButton.Group>
      </Dialog.Content>
    </Dialog>
  );
}

export default SelectCurrencyDialog;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0
  },
  text: {
    color: Colors.SECONDARY
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10
  },
});