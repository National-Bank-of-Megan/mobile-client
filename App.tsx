import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import theme from "./theme";
import AppLoading from "expo-app-loading";
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
import {useFonts} from "expo-font";
import {NavigationContainer} from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import TransfersScreen from "./screens/TransfersScreen";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HistoryScreen from "./screens/HistoryScreen";
import CurrencyScreen from "./screens/CurrencyScreen";
import AccountScreen from "./screens/AccountScreen";

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({

  })

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <PaperProvider theme={theme}>
      <StatusBar style="light" />
      <NavigationContainer>
        <Tab.Navigator screenOptions={{ }}>
          <Tab.Screen name="Transfers" component={TransfersScreen} options={{
            tabBarLabel: 'TRANSFERS',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="compare-arrows" color={color} size={26} />
            ),
          }}/>
          <Tab.Screen name="History" component={HistoryScreen} options={{
            tabBarLabel: 'HISTORY',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="history" color={color} size={26} />
            ),
          }}/>
          <Tab.Screen name="Exchanges" component={CurrencyScreen} options={{
            tabBarLabel: 'EXCHANGES',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="attach-money" color={color} size={26} />
            ),
          }}/>
          <Tab.Screen name="Account" component={AccountScreen} options={{
            tabBarLabel: 'ACCOUNT',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account-circle" color={color} size={26} />
            ),
          }}/>
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
