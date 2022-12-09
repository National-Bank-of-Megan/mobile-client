import Decimal from "decimal.js";

export type KlikTransaction = {
    title: string;
    moneyReceiverAccountNumber: string;
    amount: Decimal;
    currency: string;
    dateCreated: Date;
}