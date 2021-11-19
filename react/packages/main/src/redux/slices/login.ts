/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LoginvalState {
    apiToken: any;
    isAuthenticated: boolean;
    name: any;
    role: any;
    permission: any;
}

const initialState: LoginvalState = {
    apiToken: localStorage.getItem("access_token"),
    role: localStorage.getItem("role"),
    permission: localStorage.getItem("permission"),
    name: localStorage.getItem("username"),
    isAuthenticated: localStorage.getItem("access_token") !== null,
};

const loginSlice = createSlice({
    name: "loginVal",
    initialState,
    reducers: {
        updateLoginState(state, action: PayloadAction<any>) {
            console.log(action);
            console.log(action);
            const { role, permission } = action.payload;
            const { name } = action.payload.user;
            const apiToken = action.payload.user.api_token;
            state.apiToken = apiToken;
            state.name = name;
            state.role = role;
            state.isAuthenticated = true;
            state.permission = JSON.stringify(permission);
            localStorage.setItem("access_token", apiToken);
            localStorage.setItem("role", role);
            localStorage.setItem("permission", JSON.stringify(permission));
            localStorage.setItem("username", name);
        },
    },
});

export const { updateLoginState } = loginSlice.actions;
export default loginSlice.reducer;
