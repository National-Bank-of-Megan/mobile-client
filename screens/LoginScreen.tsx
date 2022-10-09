import React, {useEffect, useState} from "react";
import {Platform, StyleSheet, TurboModuleRegistry, View} from "react-native";
import {Button, Headline, Paragraph, Text} from "react-native-paper";
import Colors from "../constants/colors";
import GlobalStyles from "../global-styles";
import * as AuthSession from 'expo-auth-session';
import {ResponseType} from 'expo-auth-session';
import AlertSnackBar, {AlertState} from "../components/alert/AlertSnackBar";
import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "../hook/redux-hooks";
import { userAuthenticationActions } from "../store/slice/userAuthenticationSlice";
import storage from "redux-persist/lib/storage";
import store from "../store/store";

const LoginScreen = () => {
    const [alertState, setAlertState] = useState<AlertState>({
        color: '',
        isOpen: true,
        message: ''
    })

const [name,setName] =useState('e')
    const dispatch = useAppDispatch()
    const userAuthenticationState = useAppSelector((state) => state.userAuthentication)
    const auth0ClientId = "Vr2PnyOtP7YedwZ0s85DTzq9504hQrje";
    const authorizationEndpoint = "https://dev-xkmthvsw.us.auth0.com/authorize";

    const useProxy = Platform.select({web: false, default: true});
    const redirectUri = AuthSession.makeRedirectUri({useProxy});

    const [request, result, promptAsync] = AuthSession.useAuthRequest(
        {
            redirectUri,
            clientId: auth0ClientId,
            // id_token will return a JWT token
            responseType: "id_token",
            // retrieve the user's profile
            scopes: ['openid', 'profile'],
            extraParams: {
                // ideally, this will be a random value
                nonce: 'nonce',
            },
        },
        {authorizationEndpoint}
    );

    useEffect(() => {
        if (result) {
            alert(result.type)
            if (result.type === 'error') {
                setAlertState({
                    color: Colors.SNACKBAR_FAILURE,
                    isOpen: true,
                    message: result.params.error_description || "Something went wrong. Could not login."
                })
            }

            if(result.type === 'success'){
                const jwtToken = result.params.id_token;
                alert(jwtToken)
                dispatch(userAuthenticationActions.setAccessToken)
                setName(jwtToken)
                const decoded = jwtDecode(jwtToken);
                alert(decoded)
                // const { user_id } = decoded;
                // setName(decoded);
            }
        }
    }, [result])

    return (
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
            <Paragraph style={styles.explanatoryTextStyle}>
                 {store.getState().userAuthentication.authToken}
            </Paragraph>
            <Paragraph style={styles.explanatoryTextStyle}>
                 {userAuthenticationState.authToken}
            </Paragraph>
            {alertState.message && <AlertSnackBar alertState={{
                state: alertState,
                setState: setAlertState
            }}/>}
        </View>
    );
};

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