import {View, StyleSheet, ScrollView, Alert} from "react-native";
import TotalBalance from "../components/transfer/TotalBalance";
import {HelperText, Provider, withTheme} from "react-native-paper";
import {SafeAreaView} from "react-native-safe-area-context";
import DropDown from "react-native-paper-dropdown";
import {useEffect, useState} from "react";
import theme from "../theme";
import Colors from "../constants/colors";
import SelectSubAccount from "../components/transfer/SelectSubaccount";
import BalanceOperations from "../components/transfer/BalanceOperations";
import RecentActivity from "../components/transfer/RecentActivity";
import Decimal from "decimal.js";
import {RouteProp, useRoute} from "@react-navigation/native";
import {RootStackParamList} from "../App";
import AlertSnackBar, {AlertState} from "../components/alert/AlertSnackBar";

export const availableCurrencies = {
  'EUR': "€",
  'USD': "$",
  'PLN': "zł",
  'CHF': "Fr",
  'GBP': "£"
};

export type SubAccountCurrencyBalance = {
  currency: string;
  symbol: string;
  balance: Decimal;
};

const DUMMY_SUBACCOUNTS: SubAccountCurrencyBalance[] = [
  {
    currency: 'PLN',
    symbol: 'zł',
    balance: new Decimal(1025.0)
  },
  {
    currency: 'EUR',
    symbol: '€',
    balance: new Decimal(1000.0)
  },
  {
    currency: 'USD',
    symbol: '$',
    balance: new Decimal(100.0)
  },
  {
    currency: 'CHF',
    symbol: 'Fr',
    balance: new Decimal(0.0)
  },
  {
    currency: 'GBP',
    symbol: '£',
    balance: new Decimal(1025.0)
  },
];

const TransfersScreen = () => {
  const [loadedSubAccountBalanceList, setLoadedSubAccountBalanceList] = useState<SubAccountCurrencyBalance[]>([]);
  const [alertSnackBarState, setAlertSnackBarState] = useState<AlertState>({
    color: "",
    isOpen: false,
    message: ""
  });

  const route = useRoute<RouteProp<RootStackParamList, 'Transfers'>>();

  useEffect(() => {
    if (route.params?.alertState) {
      setAlertSnackBarState(route.params.alertState);
    }
  }, [route.params?.alertState])

  useEffect(() => {
    setLoadedSubAccountBalanceList(DUMMY_SUBACCOUNTS);
  }, []);

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <TotalBalance />
        <SelectSubAccount subAccountBalanceList={loadedSubAccountBalanceList} setSubAccountBalanceList={setLoadedSubAccountBalanceList}/>
        <BalanceOperations subAccountBalanceList={loadedSubAccountBalanceList} setSubAccountBalanceList={setLoadedSubAccountBalanceList} />
        <RecentActivity />
      </ScrollView>
      <AlertSnackBar alertState={{"state": alertSnackBarState, "setState": setAlertSnackBarState}} />
    </>
  );
}

export default TransfersScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 8,
    marginTop: 20,
  }
});