import React from "react";
import { ScrollView } from "react-native";
import { Headline } from "react-native-paper";
import { useAppSelector } from "../hook/redux-hooks";
import store from "../store/store";

const HistoryScreen = () => {
  return (
    <ScrollView>
      <Headline>{store.getState().subaccountBalance.subaccounts.length}</Headline>
    {
      store.getState().subaccountBalance.subaccounts.map(m=>{
        return <Headline>{m.currency+' '+m.symbol+' '+m.balance}</Headline>
      })
    }
    </ScrollView>
  );
}

export default HistoryScreen;