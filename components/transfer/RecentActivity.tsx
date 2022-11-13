import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import {StyleSheet, View} from "react-native";
import {Divider, Subheading, useTheme, withTheme, Text, Headline} from "react-native-paper";
import Colors from "../../constants/colors";
import { REST_PATH_TRANSFER } from "../../constants/constants";
import useFetch, { RequestConfig } from "../../hook/use-fetch";
import CurrencyExchangeHistory from "../../model/currencyExchangeHistory";
import CurrencyExchangeHistoryResponse from "../../model/currencyExchangeHistoryResponse";
import MoneyBalanceOperation from "../../model/moneyBalanceOperation";
import TransactionSummary from "../../model/transactionSummary";
import CurrencyExchangeCard from "./CurrencyExchangeCard";
import RecentActivityCard from "./RecentActivityCard";
import recentActivityCard from "./RecentActivityCard";
import TransactionCard from "./TransactionCard";

const RecentActivity = () => {
  const {colors, fonts} = useTheme();
  const [recentActivityList, setRecentActivityList] = useState<MoneyBalanceOperation[]>([]);
  const {
    isLoading: isLoadingRecentActivity,
    error: errorRecentActivity,
    sendRequest: sendGetRecentActivityRequest
  } = useFetch();

  useFocusEffect(useCallback(() => {

    // get recent activities
    const handleFetchRecentActivitySuccess = (moneyBalanceOperationObjects: MoneyBalanceOperation[]) => {
      const loadedMoneyBalanceOperationList: MoneyBalanceOperation[] = [];
      for (const key in moneyBalanceOperationObjects) {
        if (moneyBalanceOperationObjects[key].hasOwnProperty('receiver')) {
          const fetchedTransaction = moneyBalanceOperationObjects[key] as TransactionSummary;
          loadedMoneyBalanceOperationList.push(new TransactionSummary(
            fetchedTransaction.transferType,
            fetchedTransaction.title,
            fetchedTransaction.requestDate,
            fetchedTransaction.amount,
            fetchedTransaction.currency
          ));
        } else {
          const fetchedCurrencyExchange = moneyBalanceOperationObjects[key] as CurrencyExchangeHistoryResponse;
          loadedMoneyBalanceOperationList.push(new CurrencyExchangeHistory(
            fetchedCurrencyExchange.requestDate,
            fetchedCurrencyExchange.amountBought,
            fetchedCurrencyExchange.currencyBought,
            fetchedCurrencyExchange.amountSold,
            fetchedCurrencyExchange.currencySold
          ));
        }
      }
      setRecentActivityList(loadedMoneyBalanceOperationList);
    }

    const sendGetRecentActivityRequestConfig: RequestConfig = {
      url: REST_PATH_TRANSFER + '/recentActivity'
    };

    sendGetRecentActivityRequest(sendGetRecentActivityRequestConfig, handleFetchRecentActivitySuccess);
  }, [sendGetRecentActivityRequest]))

  return (
    <View style={styles.container}>
      <Subheading style={[styles.activityHeader, fonts.regular]}>Recent activity</Subheading>
      <Divider style={styles.divider}/>
      <View style={styles.recentActivityListContainer}>
        {
          recentActivityList.map((item)=>{
            if(item instanceof TransactionSummary)
              return <TransactionCard item={item}/>
            else
              return <CurrencyExchangeCard item={item}/>
          })
        }
        {
        
        !!errorRecentActivity && <>
        <Text style={[{color:Colors.SNACKBAR_FAILURE, textAlign: 'center'}]}>Could not download recent activities.</Text>
        </>
}

      </View>
    </View>
  );
}

export default withTheme(RecentActivity);

const styles = StyleSheet.create({
  container: {
    minWidth: "90%",
    marginTop: 40
  },
  activityHeader: {
    textAlign: 'center',
    fontSize: 24
  },
  divider: {
    backgroundColor: Colors.PRIMARY,
    marginTop: 5,
    height: 1.5
  },
  recentActivityListContainer: {
    marginTop: 20,
    marginBottom: 10
  }
});