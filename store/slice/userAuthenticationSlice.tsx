import {createSlice} from "@reduxjs/toolkit";

const userAuthenticationSlice = createSlice({
    name: "userAuthentication",
    initialState: {
        authToken: null,
        refreshToken: null
    },

    reducers: {
        setTokens: (state, payload)=>{
            state.authToken = payload.payload.accessToken
            state.refreshToken = payload.payload.accessToken
        },
        setAccessToken : (state, payload)=>{
            state.authToken = payload.payload
        },
        clearAuthentication: (state) => {
            state.authToken = null;
            state.refreshToken = null;
        }
    }
})

export const userAuthenticationActions = userAuthenticationSlice.actions;
export default userAuthenticationSlice.reducer;