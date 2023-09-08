import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbOffcanvasConfig} from "@ng-bootstrap/ng-bootstrap";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.reducer";
import {selectTodosState} from "../store/todo.selectors";
import {TodoOptionsComponent} from "./todo-options/todo-options.component";
import {Observable} from "rxjs";
import {TodoState} from "../store/todo.reducer";

@Component({
    selector: 'app-todo-list',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterLinkActive, TodoOptionsComponent],
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

    todoStateObservable$: Observable<TodoState> = new Observable<TodoState>();

    constructor(
        config: NgbOffcanvasConfig,
        private store: Store<AppState>
    ) {

        config.position = 'start';
        config.keyboard = false;
        config.backdrop = false;
        config.panelClass = 'text-bg-secondary rounded-end-3';
    };

    ngOnInit() {
        this.todoStateObservable$ = this.store.select(selectTodosState);
    };
}
