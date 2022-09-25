import {Decimal} from "decimal.js";
import {removeNonDigits} from "./transfer";
import {shouldUpdateCurrencyInput} from "./update";

export const isNotEmpty = (value: string) => value.trim() !== '';

export const shouldUpdateCode = (value: string): boolean => {
  if (value.trim() === '') {
    return true;
  }
  return parseFloat(value) >= 0.0 && value.trim().length <= 6;
}

const isPositiveValue = (value: string): boolean => {
  const numericValue = parseFloat(value);
  return numericValue > 0;
}

export const isValidAmount = (value: string): boolean => {
  return isNotEmpty(value) && isPositiveValue(value);
}

export const isValidTransferAmount = (value: string, userBalance: Decimal): boolean => {
  return isNotEmpty(value) && isPositiveValue(value) && hasEnoughMoney(userBalance, value);
}

export const hasEnoughMoney = (userBalance: Decimal, amountValue: string): boolean => {
  return amountValue.trim() === '' || Decimal.sub(userBalance, amountValue).greaterThanOrEqualTo(0.0); // first condition: if user input is empty, let it be changed
}

export const isValidAccountNumber = (value: string) => value.trim().length === 26;