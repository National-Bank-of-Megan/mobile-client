import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { SubAccountCurrencyBalance } from "../../screens/TransfersScreen";

export const subaccountBalanceSlice = createSlice({
    name: 'subaccountBalance',
    initialState: {
        subaccounts: [] as SubAccountCurrencyBalance[]
    },

    reducers: {
        setSubaccountsBalance: (state, action: PayloadAction<SubAccountCurrencyBalance[]>) => {
            state.subaccounts = action.payload;
        }
    }
})

export const subaccountBalanceActions = subaccountBalanceSlice.actions;
export default subaccountBalanceSlice.reducer;