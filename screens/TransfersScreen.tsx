import {View, StyleSheet, ScrollView} from "react-native";
import TotalBalance from "../components/transfer/TotalBalance";
import {HelperText, Provider, withTheme} from "react-native-paper";
import {SafeAreaView} from "react-native-safe-area-context";
import DropDown from "react-native-paper-dropdown";
import {useState} from "react";
import theme from "../theme";
import Colors from "../constants/colors";
import SelectSubAccount from "../components/transfer/SelectSubaccount";
import BalanceOperations from "../components/transfer/BalanceOperations";
import RecentActivity from "../components/transfer/RecentActivity";



const TransfersScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TotalBalance />
      <SelectSubAccount />
      <BalanceOperations />
      <RecentActivity />
    </ScrollView>
  );
}

export default withTheme(TransfersScreen);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 8,
    marginTop: 20,
  }
});