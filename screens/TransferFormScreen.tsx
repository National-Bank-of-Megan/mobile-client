import {StyleSheet, View} from "react-native";
import {Button, Dialog, Headline, Paragraph, Portal, Subheading, Text, TextInput, withTheme} from "react-native-paper";
import Colors from "../constants/colors";
import GlobalStyles from "../global-styles";
import {useState} from "react";
import InputTheme from "../constants/input-theme";
import BalanceAmountInput from "../components/input/BalanceAmountInput";
import TransferForm from "../components/form/TransferForm";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {SubAccountCurrencyBalance} from "./TransfersScreen";
import {RootStackParamList} from "../App";
import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import SelectCurrencyDialog from "../components/dialog/SelectCurrencyDialog";
import {findCurrencyByName, findCurrencySymbolByCurrencyName} from "../common/transfer";
import { useAppSelector } from "../hook/redux-hooks";

type Props = RouteProp<RootStackParamList, 'TransferForm'>;

const TransferFormScreen = () => {
  const subaccounts = useAppSelector((state) => state.subaccountBalance);
  const navigation = useNavigation();
  const route = useRoute<Props>();

  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [selectedCurrencyName, setSelectedCurrencyName] = useState<string>("PLN");

  const showDialog = () => setIsDialogVisible(true);
  const hideDialog = () => setIsDialogVisible(false);

  return (
    <>
    <Portal>
      <SelectCurrencyDialog isDialogVisible={isDialogVisible}
                            hideDialog={hideDialog}
                            subAccountBalanceList={subaccounts.subaccounts}
                            selectedCurrencyName={selectedCurrencyName}
                            setSelectedCurrencyName={setSelectedCurrencyName}/>
    </Portal>

    <View style={GlobalStyles.container}>
      <Headline style={GlobalStyles.headline}>New transfer</Headline>
      <TransferForm showDialog={showDialog} subAccountBalanceList={subaccounts.subaccounts} selectedCurrencyName={selectedCurrencyName} />
    </View>
    </>
  );
}

export default TransferFormScreen;

const styles = StyleSheet.create({

});