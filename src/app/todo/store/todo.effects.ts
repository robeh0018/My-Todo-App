import {Injectable} from "@angular/core";
import {Actions, concatLatestFrom, createEffect, ofType} from "@ngrx/effects";
import {
    dataBaseFailAction,
    deleteTodoAction,
    getTodosAction,
    setTodoAction,
    startDeleteTodoAction,
    startFetchTodosAction,
    startSetTodoAction,
    startUpdateTodoAction,
    updateTodoAction
} from "./todo.actions";
import {catchError, of, switchMap} from "rxjs";
import {collection, deleteDoc, doc, getDocs, query, setDoc, updateDoc, where} from 'firebase/firestore';
import {FirebaseDB} from "../../firebase/firebase.config";
import {Todo} from "../todo.model";
import {uid} from "uid";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.reducer";
import {selectTodoActivated} from "./todo.selectors";
import {selectUser} from "../../auth/store/auth.selectors";


@Injectable()


export class TodoEffects {


    constructor(private actions$: Actions, private store: Store<AppState>) {

    }

    fetchTodos$ = createEffect(
        () => this.actions$.pipe(
            ofType(startFetchTodosAction),
            switchMap(async ({payload}) => {

                const queryConsult = query(collection(FirebaseDB, 'todos'),
                    where('userId', '==', payload));

                const querySnapshot = await getDocs(queryConsult);

                let todos: Todo[] = [];

                querySnapshot.forEach(doc => {

                    const {id, ...rest} = doc.data() as Todo;

                    const todo: Todo = {
                        id: doc.id,
                        ...rest,
                    };

                    todos = [...todos, todo];
                });

                return getTodosAction({payload: todos})
            }),
            catchError(err => of(dataBaseFailAction({payload: 'Unexpected error on fetchTodos',})))
        )
    )


    addTodo$ = createEffect(
        () => this.actions$.pipe(
            ofType(startSetTodoAction),
            concatLatestFrom(() => this.store.select(selectUser)),
            switchMap(async ([{payload}, userAuthenticated]) => {

                const newTodo: Todo = {
                    id: uid(),
                    ...payload,
                    userId: userAuthenticated?.uid!,
                    lastModification: new Date().toDateString(),
                    createdAt: new Date().toDateString(),
                };

                const {id, ...rest} = newTodo;

                await setDoc(doc(FirebaseDB, "todos", id), {...rest})

                return setTodoAction({payload: newTodo});
            }),
            catchError(err => of(dataBaseFailAction({payload: 'Unknown error on addTodo'})))
        )
    )

    editTodo$ = createEffect(
        () => this.actions$.pipe(
            ofType(startUpdateTodoAction),
            concatLatestFrom(() => this.store.select(selectTodoActivated)),
            switchMap(async ([{payload}, activatedTodo]) => {

                const updatedTodo: Todo = {
                    id: activatedTodo!.id,
                    ...payload,
                    userId: activatedTodo!.userId,
                    lastModification: new Date().toDateString(),
                    createdAt: activatedTodo!.createdAt,
                };

                const {id, ...rest} = updatedTodo;

                await updateDoc(doc(FirebaseDB, "todos", id), {...rest})

                return updateTodoAction({payload: updatedTodo});
            }),
            catchError(err => of(dataBaseFailAction({payload: 'Unknown error on editTodo'})))
        )
    )

    deleteTodo$ = createEffect(
        () => this.actions$.pipe(
            ofType(startDeleteTodoAction),
            concatLatestFrom(() => this.store.select(selectTodoActivated)),
            switchMap(async ([, activatedTodo]) => {

                await deleteDoc(doc(FirebaseDB, "todos", activatedTodo!.id));

                return deleteTodoAction();
            }),
            catchError(err => of(dataBaseFailAction({payload: 'Unknown error on deleteTodo'})))
        )
    )

}
