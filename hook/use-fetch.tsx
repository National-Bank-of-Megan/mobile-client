import { useCallback, useState } from "react";
import { BEARER_PREFIX, REST_PATH_AUTH } from "../constants/constants";
import FetchError from "../model/FetchError";
import { useAppDispatch, useAppSelector } from "./redux-hooks";
import useCredentialsValidation from "./use-credentials-validator";

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
    const [error, setError] = useState<Error | null>(null);
    // const navigate = useNavigate();

    const { isAuthTokenValid, isRefreshTokenValid } = useCredentialsValidation();
    // const { requestAuthTokenWithRefreshToken } = useRefreshToken();

    const userAuth = useAppSelector((state) => state.userAuthentication);
    const dispatch = useAppDispatch();

    const sendRequest = useCallback(
        async <T, >(requestConfig: RequestConfig, applyData: (data: T, responseStatus: number) => void) => {
            setIsLoading(true);
            setError(null);

            if (!requestConfig.headers) {
                requestConfig.headers = {};
            }

            const authTokenValid = isAuthTokenValid();

            try {
                if (authTokenValid) {
                    requestConfig.headers["Authorization"] = BEARER_PREFIX + userAuth.authToken;
                } 
                // else 
                // if (refreshTokenValid) {
                    // const fetchedAuthToken = await requestAuthTokenWithRefreshToken();
                    // requestConfig.headers["Authorization"] = BEARER_PREFIX + fetchedAuthToken;
                // } else if (!requestConfig.url.startsWith(REST_PATH_AUTH)) {
                //     let sessionExpiredAlertState: AlertState | null = null;

                //     if (userAuth.refreshToken || userAuth.authToken) {
                //         dispatch(subaccountBalanceActions.setSubaccountsBalance([]));
                //         dispatch(userAuthenticationActions.clearAuthentication());
                //         await storage.removeItem("persist: persist-key");

                //         sessionExpiredAlertState = {
                //             isOpen: true,
                //             message: 'Your session has expired, please log in again'
                //         }
                //     }

                //     const loginPageUrl = '/login';
                //     navigate(loginPageUrl, { state: sessionExpiredAlertState });
                // }

            
                const APIAddress = requestConfig.url;
                const response = await fetch(APIAddress, {
                    method: requestConfig.method ? requestConfig.method : "GET",
                    headers: requestConfig.headers,
                    body: requestConfig.method === "GET" ? null : requestConfig.body ? JSON.stringify(requestConfig.body) : null,
                });
            
                if (!response.ok) {
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