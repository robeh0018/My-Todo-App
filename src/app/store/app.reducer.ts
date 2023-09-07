import {ActionReducerMap} from "@ngrx/store";

import * as auth from '../auth/store/auth.reducer'
import * as todo from '../todo/store/todo.reducer'

export interface AppState {
    auth: auth.AuthState,
    todo: todo.TodoState,
}

export const appReducer: ActionReducerMap<AppState> = {
    auth: auth.authReducer,
    todo: todo.todoReducer,
}
