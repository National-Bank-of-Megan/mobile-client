import jwt_decode from "jwt-decode";
import {useAppDispatch, useAppSelector} from "./redux-hooks";
import {useCallback} from "react";

function useCredentialsValidation() {
    const userAuthenticationState = useAppSelector((state) => state.userAuthentication)
    const dispatch = useAppDispatch();

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

    const isRefreshTokenValid = useCallback(() => {
        return isTokenValid(userAuthenticationState.refreshToken);
    }, [isTokenValid, userAuthenticationState.refreshToken])

    const isUserLoggedIn = useCallback(() => {
        return isAuthTokenValid() || isRefreshTokenValid();
    }, [isAuthTokenValid, isRefreshTokenValid]);

    return {
        isTokenValid,
        isAuthTokenValid,
        isRefreshTokenValid,
        isUserLoggedIn,
    };
}

export default useCredentialsValidation;