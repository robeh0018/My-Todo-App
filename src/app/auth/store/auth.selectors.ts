import {AppState} from "../../store/app.reducer";
import {createSelector} from "@ngrx/store";

export const selectAuth = (state: AppState) => state.auth;

export const selectAuthErrorMessage = createSelector(
    selectAuth,
    (state) => state.authError
);

export const selectUser = createSelector(
    selectAuth,
    (state) => state.user
);
