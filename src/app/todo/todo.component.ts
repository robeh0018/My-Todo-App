import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TodoListComponent} from "./todo-list/todo-list.component";
import {RouterOutlet} from "@angular/router";
import {Store} from "@ngrx/store";
import {AppState} from "../store/app.reducer";
import {startFetchTodosAction} from "./store/todo.actions";
import {selectUser} from "../auth/store/auth.selectors";
import {take} from "rxjs";


@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, TodoListComponent, RouterOutlet],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.store.select(selectUser).pipe(
      take(1),
    ).subscribe(user => {
      this.store.dispatch(startFetchTodosAction({payload: user!.uid}))
    })
  }
}
