import {AppState} from "../../store/app.reducer";

export const selectAuth = (state: AppState) => state.auth;
