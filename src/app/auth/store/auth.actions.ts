import {createAction, props} from "@ngrx/store";
import {User} from "../user.model";


export const startLoading = createAction(
  '[Auth] Start Loading',
);

export const login = createAction(
  '[Auth] Login',
  props<{
    payload: User,
  }>()
);
