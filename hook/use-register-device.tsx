import {useCallback, useState} from "react";
import {REST_PATH_ACCOUNT} from "../constants/constants";
import FetchError from "../model/FetchError";
import * as Device from 'expo-device';
import {logout} from "./ations";

function useRegisterDevice() {
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadedSuccessfully, setIsLoadedSuccessfully] = useState(false);
    const [error, setError] = useState<FetchError | null>(null);

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
                    if (response.status === 511) await logout()
                    const errorBody = await response.json();
                    const errorMessage = await errorBody.message;
                    throw new FetchError(response.status, errorMessage);
                }

                applyData(jwt);
                setIsLoadedSuccessfully(true);
            } catch (error) {
                await logout();
                setError(error as FetchError || new FetchError(500, "Something went wrong."));
                setIsLoadedSuccessfully(false);
            }
            setIsLoading(false);
        },
        [logout]
    );

    return {
        isLoading,
        isLoadedSuccessfully,
        error,
        sendRequest,
    };
};

export default useRegisterDevice;