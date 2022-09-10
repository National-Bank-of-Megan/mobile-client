import { View, StyleSheet } from "react-native";
import TotalBalance from "../components/transfer/TotalBalance";
import {HelperText, Provider, withTheme} from "react-native-paper";
import {SafeAreaView} from "react-native-safe-area-context";
import DropDown from "react-native-paper-dropdown";
import {useState} from "react";
import theme from "../theme";
import Colors from "../constants/colors";
import SelectSubAccount from "../components/transfer/SelectSubaccount";
import BalanceOperations from "../components/transfer/BalanceOperations";



const TransfersScreen = () => {


  return (
      <SafeAreaView style={styles.container}>
        <TotalBalance />

          <SelectSubAccount />
          <BalanceOperations />
      </SafeAreaView>
  );
}

export default withTheme(TransfersScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 8,
    marginTop: 20,
  }
});