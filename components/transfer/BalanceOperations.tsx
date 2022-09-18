import {StyleSheet, View} from "react-native";
import BalanceOperationItem from "./BalanceOperationItem";
import Colors from "../../constants/colors";
import {withTheme} from "react-native-paper";
import {useNavigation} from "@react-navigation/native";

const balanceOperationItems = [
  {
    id: 0,
    color: Colors.BALANCE_OPERATIONS.ADD_MONEY,
    operationName: "ADD MONEY",
    iconName: "plus",
    screenToNavigate: "AddMoneyForm"
  },
  {
    id: 1,
    color: Colors.BALANCE_OPERATIONS.TRANSFER,
    operationName: "TRANSFER",
    iconName: "arrow-right",
    screenToNavigate: "TransferForm"
  },
  {
    id: 2,
    color: Colors.BALANCE_OPERATIONS.KLIK,
    operationName: "KLIK",
    iconName: "K",
    screenToNavigate: "KlickCode"
  },
  {
    id: 3,
    color: Colors.BALANCE_OPERATIONS.EXCHANGE,
    operationName: "EXCHANGE",
    iconName: "repeat",
    screenToNavigate: "KlikPayment"
  },
  {
    id: 4,
    color: Colors.BALANCE_OPERATIONS.ADD_FRIEND,
    operationName: "ADD FRIEND",
    iconName: "heart",
    screenToNavigate: ""
  },
]

const BalanceOperations = () => {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {balanceOperationItems.map(balanceOperationItem =>
        <BalanceOperationItem key={balanceOperationItem.id}
                              color={balanceOperationItem.color}
                              operationName={balanceOperationItem.operationName}
                              iconName={balanceOperationItem.iconName}
                              onPress={() => navigation.navigate(balanceOperationItem.screenToNavigate)}/>
      )}
    </View>
  );
}

export default withTheme(BalanceOperations);

const styles = StyleSheet.create({
  container: {
    marginTop: 45,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});