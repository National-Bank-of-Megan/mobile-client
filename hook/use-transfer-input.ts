import {useState} from 'react';
import {Decimal} from "decimal.js";
import {NativeSyntheticEvent, TextInputFocusEventData} from "react-native";
import {removeNonDigits} from "../common/transfer";

const useTransferInput = (validateValue: (value: string, userBalance: Decimal) => boolean, userBalance: Decimal, shouldUpdate: (amount: string) => boolean) => {
    const [enteredValue, setEnteredValue] = useState<string>('');
    const [isTouched, setIsTouched] = useState<boolean>(false);

    const valueIsValid = validateValue(enteredValue, userBalance);
    const hasError = !valueIsValid && isTouched;

    const valueChangeHandler = (value: string) => {
        value = removeNonDigits(value);
        if (shouldUpdate(value)) {
            setEnteredValue(value);
        }
    };

    const inputBlurHandler = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        if (e.nativeEvent.text !== '') {
            setIsTouched(true);
        }
    };

    const clearInput = () => {
        setEnteredValue('');
        setIsTouched(false);
    };

    return {
        value: enteredValue,
        isValid: valueIsValid,
        hasError,
        setIsTouched,
        valueChangeHandler,
        inputBlurHandler,
        clearInput,
        setEnteredValue
    };
}

export default useTransferInput;