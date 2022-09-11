import {StyleSheet, View} from "react-native";
import BalanceOperationItem from "./BalanceOperationItem";
import Colors from "../../constants/colors";
import {withTheme} from "react-native-paper";

const balanceOperationItems = [
  {
    id: 0,
    color: Colors.BALANCE_OPERATIONS.ADD_MONEY,
    operationName: "ADD MONEY",
    iconName: "plus"
  },
  {
    id: 1,
    color: Colors.BALANCE_OPERATIONS.TRANSFER,
    operationName: "TRANSFER",
    iconName: "arrow-right"
  },
  {
    id: 2,
    color: Colors.BALANCE_OPERATIONS.KLIK,
    operationName: "KLIK",
    iconName: "K"
  },
  {
    id: 3,
    color: Colors.BALANCE_OPERATIONS.EXCHANGE,
    operationName: "EXCHANGE",
    iconName: "heart"
  },
  {
    id: 4,
    color: Colors.BALANCE_OPERATIONS.ADD_FRIEND,
    operationName: "ADD FRIEND",
    iconName: "heart"
  },
]

const BalanceOperations = () => {
  return (
    <View style={styles.container}>
      {balanceOperationItems.map(balanceOperationItem =>
        <BalanceOperationItem key={balanceOperationItem.id} color={balanceOperationItem.color} operationName={balanceOperationItem.operationName} iconName={balanceOperationItem.iconName} />
      )}
    </View>
  );
}

export default withTheme(BalanceOperations);

const styles = StyleSheet.create({
  container: {
    zIndex: -1,
    marginTop: 55,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});