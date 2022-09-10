import {StyleSheet, View} from "react-native";
import BalanceOperationItem from "./BalanceOperationItem";
import Colors from "../../constants/colors";

const BalanceOperations = () => {
  return (
    <View style={styles.container}>
      <BalanceOperationItem color={Colors.BALANCE_OPERATIONS.ADD_MONEY} operationName={"ADD MONEY"} iconName="plus"/>
      <BalanceOperationItem color={Colors.BALANCE_OPERATIONS.TRANSFER} operationName={"TRANSFER"} iconName="arrow-right"/>
      <BalanceOperationItem color={Colors.BALANCE_OPERATIONS.KLIK} operationName={"KLIK"} iconName="K"/>
      <BalanceOperationItem color={Colors.BALANCE_OPERATIONS.EXCHANGE} operationName={"EXCHANGE"} iconName="repeat"/>
      <BalanceOperationItem color={Colors.BALANCE_OPERATIONS.ADD_FRIEND} operationName={"ADD FRIEND"} iconName="heart"/>
    </View>
  );
}

export default BalanceOperations;

const styles = StyleSheet.create({
  container: {
    zIndex: -1,
    flex: 5,
    marginTop: 10,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});