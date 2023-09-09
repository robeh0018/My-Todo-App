import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgClass} from '@angular/common';
import {Todo} from "../todo.model";
import {ActivatedRoute, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.reducer";
import {setActivatedTodoAction} from "../store/todo.actions";
import {selectTodoActivated} from "../store/todo.selectors";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-todo-details',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.css']
})
export class TodoDetailsComponent implements OnInit, OnDestroy {

  todo: Todo | null;
  storeSubs: Subscription;

  constructor(private route: ActivatedRoute,
              private store: Store<AppState>,
              private router: Router) {

    this.todo = null;
    this.storeSubs = new Subscription();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {

      if (params['id']) {
        this.store.dispatch(setActivatedTodoAction({payload: params['id']}));
      }
    });

    this.storeSubs = this.store.select(selectTodoActivated).subscribe(
      activatedTodo => {
        if (!activatedTodo) {

          this.router.navigate(['/todos/no-selected']);
        } else {

          this.todo = activatedTodo;
        }
      }
    );
  };

  ngOnDestroy() {
    this.storeSubs.unsubscribe();
  };

}
