import {useCallback, useState} from "react";
import {REST_PATH_ACCOUNT} from "../constants/constants";
import FetchError from "../model/FetchError";
import * as Device from 'expo-device';
import {useAppDispatch} from "./redux-hooks";
import {subaccountBalanceActions} from "../store/slice/subaccountBalanceSlice";
import {userAuthenticationActions} from "../store/slice/userAuthenticationSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

function useRegisterDevice() {
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadedSuccessfully, setIsLoadedSuccessfully] = useState(false);
    const [error, setError] = useState<FetchError | null>(null);
    const dispatch = useAppDispatch();

    const sendRequest = useCallback(
        async <T, >(jwt: string | null, applyData: (jwt: string) => void) => {
            setIsLoading(true);
            setError(null);

            try {
                const fingerprint = Device.osInternalBuildId;
                if (fingerprint === null) throw new Error("Cannot extract device's fingerprint")
                if (jwt === null) throw new Error("Cannot access JWT")

                const headers = {
                    'Content-Type': 'application/json',
                    'Device-Fingerprint': fingerprint,
                    'Authorization': "Bearer " + jwt
                }

                const response = await fetch(REST_PATH_ACCOUNT + "/device/register", {
                    method: "POST",
                    headers: headers,
                    body: null,
                });

                if (!response.ok) {
                    if (response.status === 511) throw Error()
                    const errorBody = await response.json();
                    const errorMessage = await errorBody.message;
                    throw new FetchError(response.status, errorMessage);
                }

                applyData(jwt);
                setIsLoadedSuccessfully(true);
            } catch (error) {
                dispatch(subaccountBalanceActions.setSubaccountsBalance([]));
                dispatch(userAuthenticationActions.clearAuthentication());
                await AsyncStorage.removeItem("persist: persist-key")
                setIsLoading(false);
                setError(error as FetchError || new FetchError(500, "Something went wrong."));
                setIsLoadedSuccessfully(false);
            }
            setIsLoading(false);
        }, [dispatch]
    );

    return {
        isLoading,
        isLoadedSuccessfully,
        error,
        sendRequest,
    };
};

export default useRegisterDevice;