import { useCallback, useState } from "react";
import storage from "redux-persist/es/storage";
import { BEARER_PREFIX } from "../constants/constants";
import FetchError from "../model/FetchError";
import { subaccountBalanceActions } from "../store/slice/subaccountBalanceSlice";
import { userAuthenticationActions } from "../store/slice/userAuthenticationSlice";
import { useAppDispatch, useAppSelector } from "./redux-hooks";
import useCredentialsValidation from "./use-credentials-validator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Device from 'expo-device';

export type Headers = {
    [key: string]: any;
};

export type RequestConfig = {
    url: string;
    method?: string;
    headers?: Headers;
    body?: {};
};

function useFetch () {
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadedSuccessfully, setIsLoadedSuccessfully] = useState(false);
    const [error, setError] = useState<FetchError | null>(null);
    const { isAuthTokenValid, isRefreshTokenValid } = useCredentialsValidation();

    const userAuth = useAppSelector((state) => state.userAuthentication);
    const dispatch = useAppDispatch();

    async function logout() {
        dispatch(subaccountBalanceActions.setSubaccountsBalance([]));
        dispatch(userAuthenticationActions.clearAuthentication());
        await AsyncStorage.removeItem("persist: persist-key");
    }

    const sendRequest = useCallback(
        async <T, >(requestConfig: RequestConfig, applyData: (data: T, responseStatus: number) => void) => {
            setIsLoading(true);
            setError(null);

            if (!requestConfig.headers) {
                requestConfig.headers = {};
            }

            const authTokenValid = isAuthTokenValid();
            requestConfig.headers['Device-Fingerprint'] = Device.osInternalBuildId;

            try {
                if (authTokenValid) 
                    requestConfig.headers["Authorization"] = BEARER_PREFIX + userAuth.authToken;
                else {
                    dispatch(subaccountBalanceActions.setSubaccountsBalance([]));
                    dispatch(userAuthenticationActions.clearAuthentication());
                    await storage.removeItem("persist: persist-key");
                }
            
                const APIAddress = requestConfig.url;
                alert(APIAddress)
                const response = await fetch(APIAddress, {
                    method: requestConfig.method ? requestConfig.method : "GET",
                    headers: requestConfig.headers,
                    body: requestConfig.method === "GET" ? null : requestConfig.body ? JSON.stringify(requestConfig.body) : null,
                });
                alert(response.status)

                if (!response.ok) {
                    if (response.status === 511) await logout()
                    const errorBody = await response.json();
                    const errorMessage = await errorBody.message;

                    throw new FetchError(response.status, errorMessage);
                }
                const responseText = await response.text();
                let data: T = responseText === "" ? {} : JSON.parse(responseText);
                applyData(data, response.status);
                setIsLoadedSuccessfully(true);
            } catch (error) {
                console.log(error);
                setError(error as FetchError || new FetchError(500, "Something went wrong."));
                setIsLoadedSuccessfully(false);
            }
            setIsLoading(false);
        },
        [dispatch, isAuthTokenValid, isRefreshTokenValid, userAuth.authToken, userAuth.refreshToken]
    );

    return {
        isLoading,
        isLoadedSuccessfully,
        error,
        sendRequest,
    };
};

export default useFetch;