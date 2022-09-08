import { View, StyleSheet } from "react-native";
import TotalBalance from "../components/transfer/TotalBalance";
import {withTheme} from "react-native-paper";
import {SafeAreaView} from "react-native-safe-area-context";

const TransfersScreen = () => {
  return (
      <SafeAreaView style={styles.container}>
        <TotalBalance />
      </SafeAreaView>
  );
}

export default withTheme(TransfersScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 8,
    marginTop: 20
  }
});