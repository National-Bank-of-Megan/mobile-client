import {subaccountBalanceActions} from "../store/slice/subaccountBalanceSlice";
import {userAuthenticationActions} from "../store/slice/userAuthenticationSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useAppDispatch} from "./redux-hooks";

export async function logout() {
    const dispatch = useAppDispatch();
    dispatch(subaccountBalanceActions.setSubaccountsBalance([]));
    dispatch(userAuthenticationActions.clearAuthentication());
    await AsyncStorage.removeItem("persist: persist-key");
}