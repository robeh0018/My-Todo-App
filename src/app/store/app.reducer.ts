import * as auth from '../auth/store/auth.reducer'
import {ActionReducerMap} from "@ngrx/store";

export interface AppState {
  auth: auth.AuthState,
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: auth.authReducer,
}
