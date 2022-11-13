import { StatusBar } from 'expo-status-bar';
import {Pressable, StyleSheet, View} from 'react-native';
import { Text, Provider as PaperProvider } from 'react-native-paper';
import theme from "./theme";
import AppLoading from "expo-app-loading";

import {useFonts} from "expo-font";
import {DefaultTheme, NavigationContainer} from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import TransfersScreen, {SubAccountCurrencyBalance} from "./screens/TransfersScreen";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HistoryScreen from "./screens/HistoryScreen";
import CurrencyScreen from "./screens/CurrencyScreen";
import AccountScreen from "./screens/AccountScreen";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import Colors from "./constants/colors";
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  Roboto_100Thin,
  Roboto_100Thin_Italic,
  Roboto_300Light,
  Roboto_300Light_Italic,
  Roboto_400Regular,
  Roboto_400Regular_Italic,
  Roboto_500Medium,
  Roboto_500Medium_Italic,
  Roboto_700Bold,
  Roboto_700Bold_Italic,
  Roboto_900Black,
  Roboto_900Black_Italic
} from '@expo-google-fonts/roboto';
import {Entypo, Feather, Fontisto} from "@expo/vector-icons";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import React, {useCallback, useEffect, useState} from "react";
import TransferFormScreen from "./screens/TransferFormScreen";
import AddMoneyScreen from "./screens/AddMoneyScreen";
import KlikCodeScreen from "./screens/KlikCodeScreen";
import KlikPaymentScreen from "./screens/KlikPaymentScreen";
import {AlertState} from "./components/alert/AlertSnackBar";
import LoginScreen from './screens/LoginScreen';
import store,{persistor} from './store/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { issuerWithWellKnownUrl } from 'expo-auth-session/build/Discovery';
import useCredentialsValidation from './hook/use-credentials-validator';


export type RootStackParamList = {
  TabsMain: undefined;
  Transfers: { alertState: AlertState } | undefined;
  TransferForm: { subAccountBalanceList: SubAccountCurrencyBalance[] };
  AddMoneyForm: { subAccountBalanceList: SubAccountCurrencyBalance[] };
  KlikCode: undefined;
  KlikPayment: undefined;
  Login: undefined;
};

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

const NavigationContainerTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.MAIN_BACKGROUND
  },
};

const MainNavigationTabs = () => {
  return (
    <Tab.Navigator tabBarPosition='bottom' screenOptions={{
      tabBarShowLabel: true,
      tabBarLabelStyle: { fontSize: 12 },
      tabBarShowIcon: true,
      swipeEnabled: false,
      tabBarStyle: { backgroundColor: Colors.MAIN_NAVIGATION_BACKGROUND },
      tabBarActiveTintColor: Colors.PRIMARY,
      tabBarInactiveTintColor: Colors.NAVIGATION_INACTIVE_TEXT
    }}
    >
      <Tab.Screen name="Transfers" component={TransfersScreen} options={{
        tabBarLabel: 'TRANSFERS',
        tabBarIcon: ({ color }) => (
          <Entypo name="swap" color={color} size={24} style={styles.tabIcon} />
        ),
      }}/>
      <Tab.Screen name="History" component={HistoryScreen} options={{
        tabBarLabel: 'HISTORY',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="history" color={color} size={26} style={styles.tabIcon} />
        ),
      }}/>
      <Tab.Screen name="Exchanges" component={CurrencyScreen} options={{
        tabBarLabel: 'EXCHANGES',
        tabBarIcon: ({ color }) => (
          <Text style={[styles.tabLetterIcon, { color: color }]}>$</Text>
        ),
      }}/>
      <Tab.Screen name="Account" component={AccountScreen} options={{
        tabBarLabel: 'ACCOUNT',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="account-circle" color={color} size={26} style={styles.tabIcon} />
        ),
      }}/>
    </Tab.Navigator>
  );
}

SplashScreen.preventAutoHideAsync();

export default function App() {

  const [fontsLoaded] = useFonts({
    'roboto-bold': Roboto_700Bold,
    'roboto-medium': Roboto_500Medium,
    'roboto': Roboto_400Regular,
    'roboto-light': Roboto_300Light,
    'roboto-thin': Roboto_100Thin,
  })

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  // const isUserLoggedIn = true
  
const CustomNavigationContainer: React.FC<{onLayoutRootView: ()=> void }> = ({onLayoutRootView}) =>{
  const {isUserLoggedIn} = useCredentialsValidation()
  return(
    // <NavigationContainer theme={NavigationContainerTheme} onReady={onLayoutRootView}>
    <Stack.Navigator screenOptions={{
      title: 'NBM',
      headerStyle: {
        backgroundColor: Colors.MAIN_NAVIGATION_BACKGROUND,
      },
      headerTintColor: Colors.SECONDARY,
      headerTitleAlign: "center",
      headerLeft: () => (
        <Pressable>
          <Feather name='log-out' color={Colors.SECONDARY} size={26} style={styles.headerIcon} />
        </Pressable>
      )
    }}>
      {
    
       useCredentialsValidation().isUserLoggedIn() &&
        <>
        <Stack.Screen name="TabsMain" component={MainNavigationTabs} />
        <Stack.Screen name="TransferForm" component={TransferFormScreen} />
        <Stack.Screen name="AddMoneyForm" component={AddMoneyScreen} />
        <Stack.Screen name="KlikCode" component={KlikCodeScreen} />
        <Stack.Screen name="KlikPayment" component={KlikPaymentScreen} />
        </>
      }
      {
        !useCredentialsValidation().isUserLoggedIn() &&
        <Stack.Screen name="Login" component={LoginScreen} />
      }

    </Stack.Navigator>
  // </NavigationContainer>
  )
}

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
    <PaperProvider theme={theme}>
    <NavigationContainer theme={NavigationContainerTheme} onReady={onLayoutRootView}>
      {/*removed saveAreaProvider (safeAreaView provided by default with stack header). If headerVisible=false, then provide safeAreaView explicitly*/}
      <StatusBar style="light" />
      <CustomNavigationContainer onLayoutRootView={onLayoutRootView}/>
      </NavigationContainer>
    </PaperProvider>
    </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  tabIcon: {
    textAlign: 'center'
  },
  headerIcon: {
    textAlign: 'center',
    marginLeft: '5%'
  },
  tabLetterIcon: {
    textAlign: 'center',
    fontSize: 23,
    fontWeight: "400",
    height: 30,
    position: 'relative',
    bottom: 2.5
  }
});