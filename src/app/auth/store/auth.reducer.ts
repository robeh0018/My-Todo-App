import {createReducer, on} from "@ngrx/store";
import {User} from "../user.model";
import {
    authenticationFailAction,
    authenticationSuccessAction,
    cleanupAuthErrorAction,
    logoutAction,
    startAuthenticationWithEmailAndPassAction,
    startAuthenticationWithGoogleAction
} from "./auth.actions";


export interface AuthState {
    isLoading: boolean;
    user: User | null;
    authError: string | null;
}

const initialState: AuthState = {
    isLoading: false,
    user: null,
    authError: null,
}

export const authReducer = createReducer(
    initialState,

    on(startAuthenticationWithGoogleAction,
        startAuthenticationWithEmailAndPassAction, (state) => {

            return {
                ...state,
                isLoading: true,
            }
        }),

    on(logoutAction, (state) => {

        return {
            ...state,
            isLoading: false,
            user: null,
        }
    }),

    on(authenticationSuccessAction, (state, {payload}) => {

        return {
            ...state,
            isLoading: false,
            user: payload,
            authError: null,
        }
    }),

    on(authenticationFailAction, (state, {payload}) => {

        console.log(payload);

        return {
            ...state,
            isLoading: false,
            user: null,
            authError: payload,
        }
    }),

    on(cleanupAuthErrorAction, (state) => {

        return {
            ...state,
            isLoading: false,
            user: null,
            authError: null,
        }
    }),
)
