import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: null,
        isFetching: false,
        error: null
    },
    reducers: {
        loginStart: (state) => {
            state.isFetching = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
            state.error = null;
        },
        loginFailure: (state, action) => {
            state.isFetching = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.currentUser = null;
            state.isFetching = false;
            state.error = false;
        },
        registerStart: (state) => {
            state.isFetching = true;
            state.error = null;
        },
        registerSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
            state.error = null;
        },
        registerFailure: (state, action) => {
            state.isFetching = false;
            state.error = action.payload;
        },
    },
});

export const { loginStart, loginSuccess, loginFailure, logout, registerStart, registerSuccess, registerFailure } = userSlice.actions;
export default userSlice.reducer;