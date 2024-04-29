import { publicRequest } from "../requestMethods";
import { loginFailure, loginStart, loginSuccess, logout as logoutAction, registerStart, registerSuccess, registerFailure } from "./userRedux";
import { clearCart } from "./cartRedux";

export const login = async (dispatch, user) => {
    console.log("Login process started.");
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/auth/login", user);
        console.log("Login response:", res.data);
        dispatch(loginSuccess(res.data));
    } catch (err) {
        console.error("Login error:", err);
        dispatch(loginFailure());
    };
};

export const register = async (dispatch, user) => {
    dispatch(registerStart());
    console.log("Registration process started.");
    try {
        const res = await publicRequest.post("/auth/register", user);
        dispatch(registerSuccess(res.data));
    } catch (err) {
        console.error("Register error:", err);
        dispatch(registerFailure(err));
    };
};

export const logout = (dispatch) => {
    console.log("Logout process started.");
    try {
        dispatch(logoutAction());
        dispatch(clearCart());

        console.log("Logout successful, user and cart cleared");
    } catch (err) {
        console.error("Logout error:", err);
    }
};
