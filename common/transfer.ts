import {SubAccountCurrencyBalance} from "../screens/TransfersScreen";

export const findCurrencyByName = (selectedCurrencyName: string, loadedCurrencyBalances: SubAccountCurrencyBalance[]): SubAccountCurrencyBalance | undefined => {
  return loadedCurrencyBalances.find((accountCurrencyBalance) => {
    return accountCurrencyBalance.currency === selectedCurrencyName;
  });
}

export const findCurrencySymbolByCurrencyName = (subAccountBalanceList: SubAccountCurrencyBalance[], selectedCurrencyName: string) => {
  return findCurrencyByName(selectedCurrencyName, subAccountBalanceList)!.symbol;
}