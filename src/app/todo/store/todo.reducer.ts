import {createReducer, on} from "@ngrx/store";
import {Todo} from "../todo.model";
import {
  clearActivatedTodoAction,
  dataBaseFailAction,
  deleteTodoAction,
  getActivatedTodoAction,
  getTodosAction,
  setTodoAction,
  startDeleteTodoAction,
  startFetchTodosAction,
  startSetTodoAction,
  startUpdateTodoAction,
  updateTodoAction,
} from "./todo.actions";

export interface TodoState {
  isLoading: boolean;
  todos: Todo[];
  todoActivated: Todo | null;
  errorMessage: string | null;
}


const initialState: TodoState = {
  isLoading: false,
  todos: [],
  todoActivated: null,
  errorMessage: null,
}

export const todoReducer = createReducer(
  initialState,
  on(startFetchTodosAction,
    startUpdateTodoAction,
    startSetTodoAction,
    startDeleteTodoAction,
    (state) => {

      return {
        ...state,
        isLoading: true,
      };
    }),

  on(getTodosAction, (state, {payload}) => {

    return {
      ...state,
      isLoading: false,
      todos: payload,
      errorMessage: null,
    };
  }),

  on(getActivatedTodoAction, (state, {payload}) => {

    const todoActivated = state.todos.find(todo => todo.id === payload) || null;


    return {
      ...state,
      todoActivated,
      isLoading: false,
      errorMessage: null,
    };
  }),

  on(setTodoAction, (state, {payload}) => {

    const updatedTodos: Todo[] = [...state.todos, payload];

    //TODO: Hacer q cuando agregue, se seleccione como nota activated.
    return {
      ...state,
      isLoading: false,
      todos: updatedTodos,
      errorMessage: null,
    };
  }),

  on(updateTodoAction, (state, {payload}) => {

    const updatedTodos: Todo[] = state.todos.map(todo => {
      if (todo.id === payload.id) {
        return payload;
      }
      return todo;
    });

    return {
      ...state,
      isLoading: false,
      todos: updatedTodos,
      todoActivated: payload,
      errorMessage: null,
    };
  }),

  on(deleteTodoAction, (state) => {

    const updatedTodos: Todo[] = state.todos.filter(todo => todo.id !== state.todoActivated!.id);

    return {
      ...state,
      isLoading: false,
      todos: updatedTodos,
      todoActivated: null,
      errorMessage: null,
    };
  }),

  on(clearActivatedTodoAction, (state) => {

    return {
      ...state,
      todoActivated: null,
    };
  }),

  on(dataBaseFailAction, (state, {payload}) => {

    return {
      ...state,
      isLoading: false,
      errorMessage: payload,
    }
  })
)
