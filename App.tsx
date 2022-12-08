import {StatusBar} from 'expo-status-bar';
import {Alert, Platform, Pressable, StyleSheet} from 'react-native';
import {Provider as PaperProvider, Text} from 'react-native-paper';
import theme from "./theme";
import {useFonts} from "expo-font";
import {DefaultTheme, NavigationContainer, useNavigation} from "@react-navigation/native";
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
import React, {useCallback, useContext, useEffect} from "react";
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
import {useAppDispatch, useAppSelector} from './hook/redux-hooks';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from 'expo-notifications';
import KlikTransactionContextProvider, {KlikTransactionContext} from "./store/context/klik-transaction-context";
import {KlikTransaction} from "./model/klikTransaction";
import PushTokenContextProvider, {PushTokenContext} from "./store/context/push-token-context";

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
            tabBarInactiveTintColor: Colors.SECONDARY,
        }}
        >
            <Tab.Screen name="Transfers" component={TransfersScreen} options={{
                tabBarLabel: 'TRANSFERS',
                tabBarLabelStyle: { fontSize: 11 },
                tabBarIcon: ({color}) => (
                    <Entypo name="swap" color={color} size={24} style={styles.tabIcon}/>
                ),
            }}/>
            <Tab.Screen name="History" component={HistoryScreen} options={{
                tabBarLabel: 'HISTORY',
                tabBarLabelStyle: { fontSize: 11 },
                tabBarIcon: ({color}) => (
                    <MaterialCommunityIcons name="history" color={color} size={26} style={styles.tabIcon}/>
                ),
            }}/>
            <Tab.Screen name="Exchanges" component={CurrencyScreen} options={{
                tabBarLabel: 'EXCHANGES',
                tabBarLabelStyle: { fontSize: 11 },
                tabBarIcon: ({color}) => (
                    <Text style={[styles.tabLetterIcon, {color: color}]}>$</Text>
                ),
            }}/>
            <Tab.Screen name="Account" component={AccountScreen} options={{
                tabBarLabel: 'ACCOUNT',
                tabBarLabelStyle: { fontSize: 11 },
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
        const klikTransactionCtx = useContext(KlikTransactionContext);
        const pushTokenCtx = useContext(PushTokenContext);
        const navigation = useNavigation();
        const {isUserLoggedIn} = useCredentialsValidation();
        const userAuth = useAppSelector((state) => state.userAuthentication);

        useEffect(() => {
            const notificationReceivedSubscription = Notifications.addNotificationReceivedListener(
                (notification) => {
                    console.log('NOTIFICATION RECEIVED');
                    const receivedKlikTransactionData = notification.request.content.data as KlikTransaction;
                    klikTransactionCtx.setKlikTransaction(receivedKlikTransactionData);
                }
            );

            const notificationUserResponseReceivedSubscription = Notifications.addNotificationResponseReceivedListener(
                (response) => {
                    console.log('NOTIFICATION RESPONSE RECEIVED');
                    // @ts-ignore
                    navigation.navigate("KlikPayment");
                }
            );

            return () => {
                notificationReceivedSubscription.remove();
                notificationUserResponseReceivedSubscription.remove();
            };
        }, []);

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

                const pushToken = (await Notifications.getExpoPushTokenAsync()).data;
                const pushTokenValue = pushToken.split(/[\[(.*?)\]]/)[1];

                console.log("This device expoPushToken value is: " + pushTokenValue);
                pushTokenCtx.setPushToken(pushTokenValue);

                if (Platform.OS === 'android') {
                    Notifications.setNotificationChannelAsync('default', {
                        name: 'default',
                        importance: Notifications.AndroidImportance.DEFAULT,
                    });
                }
            }

            configurePushNotifications();
        }, []);

        // console.log("Auth token: " + userAuth.authToken);

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

                    isUserLoggedIn() &&
                    <>
                        <Stack.Screen name="TabsMain" component={MainNavigationTabs}/>
                        <Stack.Screen name="TransferForm" component={TransferFormScreen}/>
                        <Stack.Screen name="AddMoneyForm" component={AddMoneyScreen}/>
                        <Stack.Screen name="KlikCode" component={KlikCodeScreen}/>
                        <Stack.Screen name="KlikPayment" component={KlikPaymentScreen}/>
                    </>
                }
                {
                    !isUserLoggedIn() &&
                    <Stack.Screen name="Login" component={LoginScreen}/>
                }

            </Stack.Navigator>
        )
    }



    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <PaperProvider theme={theme}>
                    <PushTokenContextProvider>
                        <KlikTransactionContextProvider>
                            <NavigationContainer theme={NavigationContainerTheme} onReady={onLayoutRootView}>
                                <StatusBar style="light"/>
                                <CustomNavigationContainer onLayoutRootView={onLayoutRootView}/>
                            </NavigationContainer>
                        </KlikTransactionContextProvider>
                    </PushTokenContextProvider>
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