import React, {useEffect, useState} from "react";
import {Platform, StyleSheet, View} from "react-native";
import {Button, Headline, Paragraph, Text} from "react-native-paper";
import Colors from "../constants/colors";
import GlobalStyles from "../global-styles";
import * as AuthSession from 'expo-auth-session';
import AlertSnackBar, {AlertState} from "../components/alert/AlertSnackBar";
import {useAppDispatch, useAppSelector} from "../hook/redux-hooks";
import store from "../store/store";
import useRegisterDevice from "../hook/use-register-device";
import {userAuthenticationActions} from "../store/slice/userAuthenticationSlice";

const LoginScreen = () => {
    const [alertState, setAlertState] = useState<AlertState>({
        color: '',
        isOpen: true,
        message: ''
    })

    const {isLoading, error, sendRequest: sendDevice} = useRegisterDevice();

    const dispatch = useAppDispatch()
    const userAuthenticationState = useAppSelector((state) => state.userAuthentication)
    const auth0ClientId = "Vr2PnyOtP7YedwZ0s85DTzq9504hQrje";
    const authorizationEndpoint = "https://dev-xkmthvsw.us.auth0.com/authorize";
    let jwtToken: string = '';

    const useProxy = Platform.select({web: false, default: true});
    const redirectUri = AuthSession.makeRedirectUri({useProxy});

    const [request, result, promptAsync] = AuthSession.useAuthRequest(
        {
            redirectUri,
            clientId: auth0ClientId,
            // id_token will return a JWT token
            responseType: "id_token",
            // retrieve the user's profile
            scopes: ['offline_access'],
            extraParams: {
                // ideally, this will be a random value
                nonce: 'nonce',
            },
        },
        {authorizationEndpoint}
    );


    useEffect(() => {
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
                sendDevice(result.params.id_token, (jwt: string) => {
                    dispatch(userAuthenticationActions.setAccessToken(jwt))
                })
            }
        }
    }, [result, jwtToken])


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
                    {store.getState().userAuthentication.authToken}
                </Paragraph>
                <Paragraph style={styles.explanatoryTextStyle}>
                    Upon login you will be redirected to auth0 page. Please provide your client id and password there.
                </Paragraph>
                <Paragraph style={styles.explanatoryTextStyle}>
                    {store.getState().userAuthentication.authToken}
                </Paragraph>
                <Paragraph style={styles.explanatoryTextStyle}>
                    {userAuthenticationState.authToken}
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