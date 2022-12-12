import React, {useContext, useEffect, useState} from "react";
import {Platform, StyleSheet, View} from "react-native";
import {Button, Headline, Paragraph, Text} from "react-native-paper";
import Colors from "../constants/colors";
import GlobalStyles from "../global-styles";
import * as AuthSession from 'expo-auth-session';
import {ResponseType} from 'expo-auth-session';
import AlertSnackBar, {AlertState} from "../components/alert/AlertSnackBar";
import {useAppDispatch, useAppSelector} from "../hook/redux-hooks";
import useRegisterDevice from "../hook/use-register-device";
import {userAuthenticationActions} from "../store/slice/userAuthenticationSlice";
import useFetch, {RequestConfig} from "../hook/use-fetch";
import {BEARER_PREFIX, REST_PATH_ACCOUNT} from "../constants/constants";
import {PushTokenContext} from "../store/context/push-token-context";

const LoginScreen = () => {
    const [alertState, setAlertState] = useState<AlertState>({
        color: '',
        isOpen: true,
        message: ''
    })

    const {isLoading, error, sendRequest: sendDevice} = useRegisterDevice();
    const {
        isLoading: isSendRegisterExpoTokenLoading,
        isLoadedSuccessfully: isSendRegisterExpoTokenLoaded,
        error: sendRegisterExpoTokenError,
        sendRequest: sendRegisterExpoToken
    } = useFetch();

    const dispatch = useAppDispatch()
    const userAuthenticationState = useAppSelector((state) => state.userAuthentication);
    const pushTokenCtx = useContext(PushTokenContext);

    const auth0ClientId = "Vr2PnyOtP7YedwZ0s85DTzq9504hQrje";
    const authorizationEndpoint = "https://dev-xkmthvsw.us.auth0.com/authorize";

    const useProxy = Platform.select({web: false, default: true});
    const redirectUri = AuthSession.makeRedirectUri({useProxy});

    const [request, result, promptAsync] = AuthSession.useAuthRequest(
        {
            redirectUri,
            clientId: auth0ClientId,
            // id_token will return a JWT token
            responseType: ResponseType.Token,
            // retrieve the user's profile
            scopes: ["transfer","account","klik"],
            extraParams: {
                audience : "https://national-bank-of-megan-api.com"
            },
        },
        {authorizationEndpoint}
    );


    useEffect(() => {
        const handleSendDeviceSuccessResponse = (jwt: string) => {

            dispatch(userAuthenticationActions.setAccessToken(jwt))
            console.log(jwt)
            const pushToken = pushTokenCtx.pushToken;

            if (pushToken) {
                console.log("Sending pushToken to database: " + pushToken);

                const sendRegisterExpoTokenRequest: RequestConfig = {
                    url: REST_PATH_ACCOUNT + "/device/token?expoPushToken=" + pushToken,
                    method: "POST",
                    headers: {
                        "Authorization": BEARER_PREFIX + jwt
                    }
                };

                sendRegisterExpoToken(sendRegisterExpoTokenRequest, () => {});
            }
        }

        if (result) {
            console.log('result');
            if (result.type === 'error')
                setAlertState({
                    color: Colors.SNACKBAR_FAILURE,
                    isOpen: true,
                    message: result.params.error_description || "Something went wrong. Could not login."
                })

            if (result.type === 'success') {
                console.log('success')
                console.log(result.params.id_token)
                console.log(result.authentication?.accessToken)

                sendDevice(result.authentication!.accessToken, handleSendDeviceSuccessResponse);
            }
        }
    }, [result, sendRegisterExpoToken, sendDevice, pushTokenCtx])


    return (
        <>
            <View style={GlobalStyles.container}>
                <Headline style={GlobalStyles.headline}>Login</Headline>
                <Text style={styles.textStyle}>Login to discover all cool features</Text>
                <Button
                    mode="contained"
                    style={styles.loginButton}
                    labelStyle={GlobalStyles.buttonLabel}
                    onPress={() => promptAsync({useProxy})}
                >
                    LOGIN
                </Button>
                <Paragraph style={styles.explanatoryTextStyle}>
                    Upon login you will be redirected to auth0 page. Please provide your client id and password there.
                </Paragraph>
            </View>
            <AlertSnackBar alertState={{
                "state": alertState,
                "setState": setAlertState
            }}/>
        </>
    );
}


export default LoginScreen;

const styles = StyleSheet.create({
    textStyle: {
        color: Colors.SECONDARY,
        textAlign: "center",
    },
    explanatoryTextStyle: {
        color: Colors.SECONDARY
    },
    loginButton: {
        marginTop: 30,
    },

});