import {SubAccountCurrencyBalance} from "../screens/TransfersScreen";
import {KlikTransaction} from "../model/klikTransaction";
import {Decimal} from "decimal.js";

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

export const mapToKlikTransactionData = (receivedData: any): KlikTransaction => {
    return {
        title: receivedData.title.stringValue,
        moneyReceiverAccountNumber: receivedData.moneyReceiverAccountNumber.stringValue,
        amount: new Decimal(receivedData.amount.numberValue),
        currency: receivedData.currency.stringValue,
        dateCreated: new Date(receivedData.dateCreated.stringValue)
    }
}