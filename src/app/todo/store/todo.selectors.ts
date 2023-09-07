import {AppState} from "../../store/app.reducer";
import {createSelector} from "@ngrx/store";

export const selectTodosState = (state: AppState) => state.todo;

export const selectTodos = createSelector(
    selectTodosState,
    (state) => state.todos
);

export const selectTodoActivated = createSelector(
    selectTodosState,
    (state) => state.todoActivated
);
