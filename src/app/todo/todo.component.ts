import {Component, OnInit} from '@angular/core';
import {AsyncPipe, NgIf} from '@angular/common';
import {TodoListComponent} from "./todo-list/todo-list.component";
import {RouterOutlet} from "@angular/router";
import {Store} from "@ngrx/store";
import {AppState} from "../store/app.reducer";
import {startFetchTodosAction} from "./store/todo.actions";
import {selectUser} from "../auth/store/auth.selectors";
import {Observable, take} from "rxjs";
import {NavbarComponent} from "../shared/navbar/navbar.component";
import {selectTodosIsLoading} from "./store/todo.selectors";


@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    TodoListComponent,
    RouterOutlet,
    NavbarComponent,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  errorMessage: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.errorMessage = new Observable<boolean>();
  };

  ngOnInit() {
    this.store.select(selectUser).pipe(
      take(1),
    ).subscribe(user => {
      this.store.dispatch(startFetchTodosAction({payload: user!.uid}))
    });

    this.errorMessage = this.store.select(selectTodosIsLoading);
  };
}
