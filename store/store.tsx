import {combineReducers} from "redux";

import {configureStore} from "@reduxjs/toolkit";
import {persistReducer, persistStore} from 'redux-persist'
import userAuthenticationReducer from "./slice/userAuthenticationSlice";
import subaccountBalanceReducer from "./slice/subaccountBalanceSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const reducers = combineReducers({
    userAuthentication: userAuthenticationReducer,
    subaccountBalance: subaccountBalanceReducer
})

const persistConfig = {
    key: 'persist-key',
    storage: AsyncStorage,
    whitelist: ['userAuthentication']
};
const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    devTools: true,
    preloadedState: {},
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false
        })
})

const persistor = persistStore(store);

export default store;
export {persistor}

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch