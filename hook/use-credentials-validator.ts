import jwt_decode from "jwt-decode";
import {useAppDispatch, useAppSelector} from "./redux-hooks";
import {useCallback} from "react";

function useCredentialsValidation() {
    const userAuthenticationState = useAppSelector((state) => state.userAuthentication)

    const isTokenValid = useCallback((token: string | null) => {
        const isTokenExpired = (token: string) => {
            const toMilliseconds = 1000;
            // TODO create decodedJWT type
            const tokenExpiration = jwt_decode<any>(token).exp;
            return tokenExpiration * toMilliseconds > new Date().getTime()
        }

        try {
            return !!token && isTokenExpired(token);
        } catch (error) {
            return false;
        }
    }, []);

    const isAuthTokenValid = useCallback(() => {
        return isTokenValid(userAuthenticationState.authToken);
    }, [isTokenValid, userAuthenticationState.authToken])


    const isUserLoggedIn = useCallback(() => {
        return isAuthTokenValid();
    }, [isAuthTokenValid]);

    return {
        isTokenValid,
        isAuthTokenValid,
        isUserLoggedIn,
    };
}

export default useCredentialsValidation;