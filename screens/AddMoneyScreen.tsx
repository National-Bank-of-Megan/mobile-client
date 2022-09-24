import {Button, Dialog, Headline, Paragraph, Portal} from "react-native-paper";
import {StyleSheet, View} from "react-native";
import GlobalStyles from "../global-styles";
import TransferForm from "../components/form/TransferForm";
import {useState} from "react";
import AddMoneyForm from "../components/form/AddMoneyForm";
import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {RootStackParamList} from "../App";
import SelectCurrencyDialog from "../components/dialog/SelectCurrencyDialog";
import {findCurrencySymbolByCurrencyName} from "../common/transfer";

const AddMoneyScreen = () => {

  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'AddMoneyForm'>>();
  const subAccountBalanceList = route.params.subAccountBalanceList;

  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [selectedCurrencyName, setSelectedCurrencyName] = useState<string>("PLN");

  const showDialog = () => setIsDialogVisible(true);
  const hideDialog = () => setIsDialogVisible(false);

  return (
    <>
      <Portal>
        <SelectCurrencyDialog isDialogVisible={isDialogVisible}
                              hideDialog={hideDialog}
                              subAccountBalanceList={subAccountBalanceList}
                              selectedCurrencyName={selectedCurrencyName}
                              setSelectedCurrencyName={setSelectedCurrencyName}/>
      </Portal>

      <View style={GlobalStyles.container}>
        <Headline style={GlobalStyles.headline}>Add money</Headline>
        <AddMoneyForm showDialog={showDialog} subAccountBalanceList={subAccountBalanceList} selectedCurrencyName={selectedCurrencyName} />
        <Button mode='contained' style={styles.addMoneyButton} labelStyle={GlobalStyles.buttonLabel}>add money</Button>
      </View>
    </>
  );
}

export default AddMoneyScreen;

const styles = StyleSheet.create({
  addMoneyButton: {
    marginTop: 50
  }
});