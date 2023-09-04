import {createReducer, on} from "@ngrx/store";
import {User} from "../user.model";
import {login, startLoading} from "./auth.actions";


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

  on(startLoading, (state) => {

    return {
      ...state,
      isLoading: true,
    }
  }),

  on(login, (state, {payload}) => {

    return {
      ...state,
      user: payload,
      isLoading: false,
    }
  })
)
