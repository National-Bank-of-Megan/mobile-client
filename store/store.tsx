import {combineReducers} from "redux";

import {configureStore} from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage'
import {persistReducer, persistStore} from 'redux-persist'
import { composeWithDevTools } from 'redux-devtools-extension';
import userAuthenticationReducer from "./slice/userAuthenticationSlice";


const reducers = combineReducers({
    userAuthentication: userAuthenticationReducer
})

const persistConfig = {
    key: 'persist-key',
    storage
};
const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    devTools: true,
    preloadedState: {},
    reducer: persistedReducer,
    middleware: (composeWithDevTools =>
        composeWithDevTools({
            serializableCheck: false
        }))
})

const persistor = persistStore(store);

export default store;
export {persistor}

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch