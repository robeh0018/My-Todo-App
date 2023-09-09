import {Component, OnInit} from '@angular/core';
import {AsyncPipe, NgClass} from '@angular/common';
import {RouterLink} from "@angular/router";
import {NgbCollapse, NgbTooltip} from "@ng-bootstrap/ng-bootstrap";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.reducer";
import {selectUser} from "../../auth/store/auth.selectors";
import {map, Observable} from "rxjs";
import {logoutAction} from "../../auth/store/auth.actions";
import {resetTodoStateAction} from "../../todo/store/todo.actions";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    NgbTooltip,
    NgClass,
    AsyncPipe,
    NgbCollapse
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isMenuCollapsed = true;
  userEmail: Observable<string>;

  constructor(private store: Store<AppState>) {
    this.userEmail = new Observable<string>();
  };

  ngOnInit() {
    this.userEmail = this.store.select(selectUser).pipe(
      map(user => user?.email ?? ''),
    )
  };

  onLogout() {
    this.store.dispatch(resetTodoStateAction());
    this.store.dispatch(logoutAction());
  };
}
