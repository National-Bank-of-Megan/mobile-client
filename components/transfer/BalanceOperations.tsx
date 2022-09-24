import {StyleSheet, View} from "react-native";
import BalanceOperationItem from "./BalanceOperationItem";
import Colors from "../../constants/colors";
import {withTheme} from "react-native-paper";
import {useNavigation} from "@react-navigation/native";
import {SubAccountCurrencyBalance} from "../../screens/TransfersScreen";
import {Dispatch, SetStateAction, useEffect} from "react";


const BalanceOperations: React.FC<{
  subAccountBalanceList: SubAccountCurrencyBalance[];
  setSubAccountBalanceList: Dispatch<SetStateAction<SubAccountCurrencyBalance[]>>;
}> = (props) => {

  const balanceOperationItems = [
    {
      id: 0,
      color: Colors.BALANCE_OPERATIONS.ADD_MONEY,
      operationName: "ADD MONEY",
      iconName: "plus",
      screenToNavigate: "AddMoneyForm",
      propsToPass: {
        subAccountBalanceList: props.subAccountBalanceList
      }
    },
    {
      id: 1,
      color: Colors.BALANCE_OPERATIONS.TRANSFER,
      operationName: "TRANSFER",
      iconName: "arrow-right",
      screenToNavigate: "TransferForm",
      propsToPass: {
        subAccountBalanceList: props.subAccountBalanceList
      }
    },
    {
      id: 2,
      color: Colors.BALANCE_OPERATIONS.KLIK,
      operationName: "KLIK",
      iconName: "K",
      screenToNavigate: "KlikCode",
      propsToPass: undefined
    },
    {
      id: 3,
      color: Colors.BALANCE_OPERATIONS.EXCHANGE,
      operationName: "EXCHANGE",
      iconName: "repeat",
      screenToNavigate: "KlikPayment",
      propsToPass: undefined
    },
    {
      id: 4,
      color: Colors.BALANCE_OPERATIONS.ADD_FRIEND,
      operationName: "ADD FRIEND",
      iconName: "heart",
      screenToNavigate: "",
      propsToPass: undefined
    },
  ]

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {balanceOperationItems.map(balanceOperationItem =>
        <BalanceOperationItem key={balanceOperationItem.id}
                              color={balanceOperationItem.color}
                              operationName={balanceOperationItem.operationName}
                              iconName={balanceOperationItem.iconName}
                              onPress={() => navigation.navigate(balanceOperationItem.screenToNavigate, balanceOperationItem.propsToPass)}/>
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