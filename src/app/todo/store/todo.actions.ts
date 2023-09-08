import {createAction, props} from "@ngrx/store";
import {Todo} from "../todo.model";

export const startFetchTodosAction = createAction(
    '[Todos] Start Fetch Todos',
    props<{
        payload: string;
    }>()
);

export const startSetTodoAction = createAction(
    '[Todos] Start Set Todo',
    props<{
        payload: {
            title: string,
            description: string,
            done: boolean,
        };
    }>()
);

export const startUpdateTodoAction = createAction(
    '[Todos] Start Update Todo',
    props<{
        payload: {
            title: string,
            description: string,
            done: boolean,
        };
    }>()
);

export const startDeleteTodoAction = createAction(
    '[Todos] Start Delete Todo',
);

export const getTodosAction = createAction(
    '[Todos] Get Todos',
    props<{
        payload: Todo[];
    }>()
);

export const setActivatedTodoAction = createAction(
    '[Todos] Get Activated todo',
    props<{
        payload: string;
    }>()
);

export const setTodoAction = createAction(
    '[Todos] Set Todo',
    props<{
        payload: Todo;
    }>()
);

export const updateTodoAction = createAction(
    '[Todos] Update Todo',
    props<{
        payload: Todo;
    }>()
);
export const deleteTodoAction = createAction(
    '[Todos] Delete Todo',
);

export const clearActivatedTodoAction = createAction(
    '[Todos] Clear Activated todo',
);

export const resetTodoStateAction = createAction(
    '[Auth] Cleanup Todo State',
);

export const dataBaseFailAction = createAction(
    '[Todos] Data Base Fail',
    props<{
        payload: string;
    }>(),
)

