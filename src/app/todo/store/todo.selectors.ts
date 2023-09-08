import {AppState} from "../../store/app.reducer";
import {createSelector} from "@ngrx/store";

export const selectTodosState = (state: AppState) => state.todo;

export const selectTodosIsLoading = createSelector(
    selectTodosState,
    (state) => state.isLoading
);

export const selectTodoActivated = createSelector(
    selectTodosState,
    (state) => state.todoActivated
);

export const selectTodosErrorMessage = createSelector(
    selectTodosState,
    (state) => state.errorMessage
);
