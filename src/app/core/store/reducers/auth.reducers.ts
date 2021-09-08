import { createReducer, on } from "@ngrx/store";
import { loginUserSuccess, logoutActionCreator } from "../actions/auth.action";

export interface authStateInterface {
    isAuthenticated: boolean;
    username?: string;
    email?: string
    age?: number
}
export const initialAuthState: authStateInterface = {
    isAuthenticated: !!JSON.parse(String(localStorage.getItem('user')))?.token || false,
    username: JSON.parse(String(localStorage.getItem('user')))?.username || undefined,
    email: JSON.parse(String(localStorage.getItem('email')))?.username || undefined,
    age: JSON.parse(String(localStorage.getItem('age')))?.username || undefined,
};

export const authReducer = createReducer(
    initialAuthState,
    on(loginUserSuccess, (state, { username, email, age }) => ({ ...state, isAuthenticated: true, username: username, email: email, age: age })),
    on(logoutActionCreator, (state) => ({ ...state, isAuthenticated: false, username: '',age: 0, email: '' })),
);

