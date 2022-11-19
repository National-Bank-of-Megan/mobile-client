import {createSlice} from "@reduxjs/toolkit";

const userAuthenticationSlice = createSlice({
    name: "userAuthentication",
    initialState: {
        authToken: null
    },

    reducers: {
        setAccessToken: (state, payload) => {
            state.authToken = payload.payload
        },
        clearAuthentication: (state) => {
            state.authToken = null;
        }
    }
})

export const userAuthenticationActions = userAuthenticationSlice.actions;
export default userAuthenticationSlice.reducer;