import Decimal from "decimal.js";

export type KlikTransaction = {
    title: string;
    receiverName: string;
    amount: Decimal;
    currency: string;
    dateCreated: Date;
}