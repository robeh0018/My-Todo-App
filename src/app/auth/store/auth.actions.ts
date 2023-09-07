import {createAction, props} from "@ngrx/store";
import {User} from "../user.model";

export const startAuthenticationWithGoogleAction = createAction(
  '[Auth] Start Authentication with Google',
);

export const startAuthenticationWithEmailAndPassAction = createAction(
  '[Auth] Start Authentication with Email and Password',
  props<{
    payload: {
      email: string,
      password: string,
    }
  }>()
);

export const startSignUpAction = createAction(
  '[Auth] Start Sign Up',
  props<{
    payload: {
      email: string,
      password: string,
    }
  }>()
);

export const autoLoginAction = createAction(
  '[Auth] Auto Login',
);

export const authenticationSuccessAction = createAction(
  '[Auth] Authentication Success',
  props<{
    payload: User,
  }>()
);

export const authenticationFailAction = createAction(
  '[Auth] Authentication Fail',
  props<{
    payload: string,
  }>()
);

export const logoutAction = createAction(
  '[Auth] Logout',
);

export const cleanupAuthErrorAction = createAction(
  '[Auth] Cleanup Auth Error',
);
