import {SubAccountCurrencyBalance} from "../screens/TransfersScreen";

export const findCurrencyByName = (selectedCurrencyName: string, loadedCurrencyBalances: SubAccountCurrencyBalance[]): SubAccountCurrencyBalance | undefined => {
    return loadedCurrencyBalances.find((accountCurrencyBalance) => {
        return accountCurrencyBalance.currency === selectedCurrencyName;
    });
}

export const findCurrencySymbolByCurrencyName = (subAccountBalanceList: SubAccountCurrencyBalance[], selectedCurrencyName: string) => {
    return findCurrencyByName(selectedCurrencyName, subAccountBalanceList)!.symbol;
}

export const removeNonDigits = (text: string) => {
    text = text.replace(',', '.');
    if (text.trim().startsWith(".")) {
        text = text.substring(1);
    } else if ((text.trim().startsWith("0") && text.trim().length > 1 && text.trim().charAt(1) !== ".")) {
        text = text.replace(/0/g, '');
    }
    return text.replace(/[^\d\.]/g, "").replace(/\./, "x").replace(/\./g, "").replace(/x/, ".");
}