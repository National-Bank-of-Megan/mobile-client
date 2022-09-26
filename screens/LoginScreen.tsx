import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { Button, Headline, HelperText, Paragraph, Text } from "react-native-paper";
import Colors from "../constants/colors";
import GlobalStyles from "../global-styles";
import * as AuthSession from 'expo-auth-session';

const LoginScreen = () => {

const auth0ClientId = "Vr2PnyOtP7YedwZ0s85DTzq9504hQrje";
const authorizationEndpoint = "https://dev-xkmthvsw.us.auth0.com/authorize";

const useProxy = Platform.select({ web: false, default: true });
const redirectUri = 'http://localhost:8080'

const [request, result, promptAsync] = AuthSession.useAuthRequest(
  {
    redirectUri,
    clientId: auth0ClientId,
    // id_token will return a JWT token
    responseType: 'id_token',
    // retrieve the user's profile
    scopes: ['openid', 'profile', 'email'],
    extraParams: {
      // ideally, this will be a random value
      nonce: 'nonce',
    },
  },
  { authorizationEndpoint }
);


  return (
    <View style={GlobalStyles.container}>
      <Headline style={GlobalStyles.headline}>Login</Headline>
      <Text style={styles.textStyle}>Login to discover all cool features</Text>
      <Button
        mode="contained"
        style={styles.loginButton}
        labelStyle={GlobalStyles.buttonLabel}
        onPress={() => promptAsync({ useProxy })}
      >
        LOGIN
      </Button>
      <Paragraph style={styles.explanatoryTextStyle}>
        Upone login you will be redireced to auth0 page. Please provide your client id and password there.
      </Paragraph>
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
