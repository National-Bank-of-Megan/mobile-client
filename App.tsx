import {StatusBar} from 'expo-status-bar';
import {Alert, Platform, Pressable, StyleSheet} from 'react-native';
import {Provider as PaperProvider, Text} from 'react-native-paper';
import theme from "./theme";
import {useFonts} from "expo-font";
import {DefaultTheme, NavigationContainer} from "@react-navigation/native";
import TransfersScreen, {SubAccountCurrencyBalance} from "./screens/TransfersScreen";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HistoryScreen from "./screens/HistoryScreen";
import CurrencyScreen from "./screens/CurrencyScreen";
import AccountScreen from "./screens/AccountScreen";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import Colors from "./constants/colors";
import * as SplashScreen from 'expo-splash-screen';
import {
  Roboto_100Thin,
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold
} from '@expo-google-fonts/roboto';
import {Entypo, Feather} from "@expo/vector-icons";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import React, {useCallback, useEffect} from "react";
import TransferFormScreen from "./screens/TransferFormScreen";
import AddMoneyScreen from "./screens/AddMoneyScreen";
import KlikCodeScreen from "./screens/KlikCodeScreen";
import KlikPaymentScreen from "./screens/KlikPaymentScreen";
import {AlertState} from "./components/alert/AlertSnackBar";
import LoginScreen from './screens/LoginScreen';
import store, {persistor} from './store/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import useCredentialsValidation from './hook/use-credentials-validator';
import {subaccountBalanceActions} from './store/slice/subaccountBalanceSlice';
import {userAuthenticationActions} from './store/slice/userAuthenticationSlice';
import {useAppDispatch} from './hook/redux-hooks';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from 'expo-notifications';

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
            tabBarLabelStyle: {fontSize: 12},
            tabBarShowIcon: true,
            swipeEnabled: false,
            tabBarStyle: {backgroundColor: Colors.MAIN_NAVIGATION_BACKGROUND},
            tabBarActiveTintColor: Colors.PRIMARY,
            tabBarInactiveTintColor: Colors.NAVIGATION_INACTIVE_TEXT,
        }}
        >
            <Tab.Screen name="Transfers" component={TransfersScreen} options={{
                tabBarLabel: 'TRANSFERS',
                tabBarIcon: ({color}) => (
                    <Entypo name="swap" color={color} size={24} style={styles.tabIcon}/>
                ),
            }}/>
            <Tab.Screen name="History" component={HistoryScreen} options={{
                tabBarLabel: 'HISTORY',
                tabBarIcon: ({color}) => (
                    <MaterialCommunityIcons name="history" color={color} size={26} style={styles.tabIcon}/>
                ),
            }}/>
            <Tab.Screen name="Exchanges" component={CurrencyScreen} options={{
                tabBarLabel: 'EXCHANGES',
                tabBarIcon: ({color}) => (
                    <Text style={[styles.tabLetterIcon, {color: color}]}>$</Text>
                ),
            }}/>
            <Tab.Screen name="Account" component={AccountScreen} options={{
                tabBarLabel: 'ACCOUNT',
                tabBarIcon: ({color}) => (
                    <MaterialCommunityIcons name="account-circle" color={color} size={26} style={styles.tabIcon}/>
                ),
            }}/>
        </Tab.Navigator>
    );
}

Notifications.setNotificationHandler({
    handleNotification: async () => {
        return {
            shouldPlaySound: false,
            shouldSetBadge: false,
            shouldShowAlert: true,
        };
    },
});

SplashScreen.preventAutoHideAsync();

export default function App() {

    const [fontsLoaded] = useFonts({
        'roboto-bold': Roboto_700Bold,
        'roboto-medium': Roboto_500Medium,
        'roboto': Roboto_400Regular,
        'roboto-light': Roboto_300Light,
        'roboto-thin': Roboto_100Thin,
    })

    useEffect(() => {
        const configurePushNotifications = async () => {
            const { status } = await Notifications.getPermissionsAsync();
            let finalStatus = status;

            if (finalStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }

            if (finalStatus !== 'granted') {
                Alert.alert(
                  'Permission required',
                  'Push notifications need the appropriate permissions.'
                );
                return;
            }

            const pushTokenData = await Notifications.getExpoPushTokenAsync();
            console.log(pushTokenData);

            if (Platform.OS === 'android') {
                Notifications.setNotificationChannelAsync('default', {
                    name: 'default',
                    importance: Notifications.AndroidImportance.DEFAULT,
                });
            }
        }

        configurePushNotifications();
    }, []);

    useEffect(() => {
        const notificationReceivedSubscription = Notifications.addNotificationReceivedListener(
          (notification) => {
              console.log('NOTIFICATION RECEIVED');
              console.log(notification);
          }
        );

        const notificationUserResponseReceivedSubscription = Notifications.addNotificationResponseReceivedListener(
          (response) => {
              console.log('NOTIFICATION RESPONSE RECEIVED');
              console.log(response);
          }
        );

        return () => {
            notificationReceivedSubscription.remove();
            notificationUserResponseReceivedSubscription.remove();
        };
    }, []);

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

    const CustomNavigationContainer: React.FC<{ onLayoutRootView: () => void }> = ({onLayoutRootView}) => {
        const dispatch = useAppDispatch();

        return (
            <Stack.Navigator screenOptions={{
                title: 'NBM',
                headerStyle: {
                    backgroundColor: Colors.MAIN_NAVIGATION_BACKGROUND,
                },
                headerTintColor: Colors.SECONDARY,
                headerTitleAlign: "center",


                headerLeft: () => (
                    <Pressable onPress={async () => {
                        dispatch(subaccountBalanceActions.setSubaccountsBalance([]));
                        dispatch(userAuthenticationActions.clearAuthentication());
                        await AsyncStorage.clear((error)=>alert(error?.message))
                    }}>
                        <Feather name='log-out' color={Colors.SECONDARY} size={26} style={styles.headerIcon}
                        />
                    </Pressable>
                )
            }}
            >
                {

                    useCredentialsValidation().isUserLoggedIn() &&
                    <>
                        <Stack.Screen name="TabsMain" component={MainNavigationTabs}/>
                        <Stack.Screen name="TransferForm" component={TransferFormScreen}/>
                        <Stack.Screen name="AddMoneyForm" component={AddMoneyScreen}/>
                        <Stack.Screen name="KlikCode" component={KlikCodeScreen}/>
                        <Stack.Screen name="KlikPayment" component={KlikPaymentScreen}/>
                    </>
                }
                {
                    !useCredentialsValidation().isUserLoggedIn() &&
                    <Stack.Screen name="Login" component={LoginScreen}/>
                }

            </Stack.Navigator>
        )
    }

    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <PaperProvider theme={theme}>
                    <NavigationContainer theme={NavigationContainerTheme} onReady={onLayoutRootView}>
                        {/*removed saveAreaProvider (safeAreaView provided by default with stack header). If headerVisible=false, then provide safeAreaView explicitly*/}
                        <StatusBar style="light"/>
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