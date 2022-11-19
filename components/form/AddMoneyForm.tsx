import {StyleSheet, View} from "react-native";
import {Button, Text} from "react-native-paper";
import BalanceAmountInput from "../input/BalanceAmountInput";
import GlobalStyles from "../../global-styles";
import Colors from "../../constants/colors";
import {findCurrencyByName} from "../../common/transfer";
import {FormProps} from "../../common/types";
import Decimal from "decimal.js";
import React, {useEffect, useState} from "react";
import {isValidAmount} from "../../common/validation";
import useNumericInput from "../../hook/use-numeric-input";
import {shouldUpdateCurrencyInput} from "../../common/update";
import {useNavigation} from "@react-navigation/native";
import AlertSnackBar, {AlertState} from "../alert/AlertSnackBar";
import useFetch, {RequestConfig} from "../../hook/use-fetch";
import {REST_PATH_ACCOUNT} from "../../constants/constants";
import Spinner from "../../common/Spinner";

const AddMoneyForm: React.FC<FormProps> = ({showDialog, subAccountBalanceList, selectedCurrencyName}) => {
    const navigation = useNavigation();
    const {isLoading, error, sendRequest: addBalanceRequest} = useFetch();
    const [errorAlertState, setErrorAlertState] = useState<AlertState>
    ({
        color: Colors.SNACKBAR_FAILURE,
        isOpen: false,
        message: ''
    })

    const {
        value: addBalanceValue,
        isValid: addBalanceValueIsValid,
        hasError: addBalanceHasError,
        setIsTouched: setIsAddBalanceTouched,
        valueChangeHandler: addBalanceChangeHandler,
        inputBlurHandler: addBalanceBlurHandler,
        clearInput: clearAddBalanceValue
    } = useNumericInput(isValidAmount, '', shouldUpdateCurrencyInput);

    const handleAddBalanceSuccessResponse = () => {
        const alertState: AlertState = {
            color: Colors.SNACKBAR_SUCCESS,
            isOpen: true,
            message: "Successfully added funds to your account."
        }
        navigation.navigate("TabsMain", {
            screen: 'Transfers', params: {
                alertState: alertState
            }
        });
    }

    const foundCurrency = findCurrencyByName(selectedCurrencyName, subAccountBalanceList)!;

    useEffect(() => {
        if (!!error) {
            setErrorAlertState({
                color: Colors.SNACKBAR_FAILURE,
                isOpen: true,
                message: 'Could not add money.'
            })
        }
    }, [error, setErrorAlertState])

    const addBalanceHandler = () => {
        if (!addBalanceValueIsValid) {
            setIsAddBalanceTouched(true);
            return;
        }

        const addToBalanceRequestContent: RequestConfig = {
            url: REST_PATH_ACCOUNT + "/currency",
            method: "PUT",
            body: {
                'currency': selectedCurrencyName,
                'amount': addBalanceValue
            },
            headers: {
                'Content-Type': 'application/json'
            }
        };

        addBalanceRequest(addToBalanceRequestContent, handleAddBalanceSuccessResponse);
    };


    return (
        <>
            <View style={styles.formView}>
                <BalanceAmountInput showDialog={showDialog} selectedCurrencySymbol={foundCurrency.symbol}
                                    value={addBalanceValue}
                                    onChangeText={addBalanceChangeHandler}
                                    onBlur={addBalanceBlurHandler}
                                    error={addBalanceHasError}/>
                <View style={styles.balanceInfoContainer}>
                    <Text style={styles.balanceText}>
                        <>Currency balance after money
                            load: {addBalanceValue.trim() !== '' ? Decimal.add(foundCurrency.balance, addBalanceValue).toString() : foundCurrency.balance.toString()} {foundCurrency.symbol}</>
                    </Text>
                    <Text style={styles.balanceText}>Total balance after money load: 15.253,51 PLN </Text>
                </View>
            </View>
            <Button mode='contained' onPress={addBalanceHandler} style={styles.addMoneyButton}
                    labelStyle={GlobalStyles.buttonLabel}>add money</Button>
            <View>
                <AlertSnackBar alertState={{"state": errorAlertState, "setState": setErrorAlertState}}/>
            </View>
            <Spinner isVisible={isLoading}/>
        </>
    );
}

export default AddMoneyForm;

const styles = StyleSheet.create({
    formView: {
        borderRadius: 10,
        paddingVertical: 60,
        paddingTop: 15,
        paddingHorizontal: 20,
        backgroundColor: Colors.COMPONENT_BACKGROUND,
        marginTop: 40
    },
    balanceInfoContainer: {},
    addMoneyButton: {
        marginTop: 50,
        marginBottom: 70
    },
    balanceText: {
        fontSize: 12,
        color: Colors.COMPONENT_TEXT
    }
});

