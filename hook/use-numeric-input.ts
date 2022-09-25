import React, {useState} from 'react';
import {NativeSyntheticEvent, TextInputFocusEventData} from "react-native";
import {removeNonDigits} from "../common/transfer";

const useNumericInput = (validateValue: (value: string) => boolean, initialValue?: string, shouldUpdate?: (value: string) => boolean) => {
  if (!initialValue) {
    initialValue = '';
  }

  const [enteredValue, setEnteredValue] = useState<string>(initialValue);
  const [isTouched, setIsTouched] = useState<boolean>(false);

  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = (value: string) => {
    value = removeNonDigits(value);
    if (!shouldUpdate || shouldUpdate(value)) {
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
};

export default useNumericInput;