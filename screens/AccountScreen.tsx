import { Button } from "react-native-paper";
import storage from "redux-persist/es/storage";
import { useAppDispatch } from "../hook/redux-hooks";
import { subaccountBalanceActions } from "../store/slice/subaccountBalanceSlice";
import { userAuthenticationActions } from "../store/slice/userAuthenticationSlice";

const AccountScreen = () => {
  const dispatch = useAppDispatch();

  return (
    <Button mode='contained' onPress={async ()=>{
      dispatch(subaccountBalanceActions.setSubaccountsBalance([]));
      dispatch(userAuthenticationActions.clearAuthentication());
      await storage.removeItem("persist: persist-key");
    }}
      style={[
        { margin: 20 }
      ]}
    >Log out</Button>
  );
}

export default AccountScreen;