import {StyleSheet, View} from "react-native";
import {Headline, Portal} from "react-native-paper";
import GlobalStyles from "../global-styles";
import {useState} from "react";
import TransferForm from "../components/form/TransferForm";
import {RootStackParamList} from "../App";
import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import SelectCurrencyDialog from "../components/dialog/SelectCurrencyDialog";
import {useAppSelector} from "../hook/redux-hooks";

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
                <TransferForm showDialog={showDialog} subAccountBalanceList={subaccounts.subaccounts}
                              selectedCurrencyName={selectedCurrencyName}/>
            </View>
        </>
    );
}

export default TransferFormScreen;

const styles = StyleSheet.create({});