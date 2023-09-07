import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {Store} from "@ngrx/store";
import {AppState} from "./store/app.reducer";
import {selectAuth} from "./auth/store/auth.selectors";
import {map, Observable} from "rxjs";
import {autoLoginAction} from "./auth/store/auth.actions";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  isLoading$: Observable<boolean> = new Observable<boolean>();


  constructor(private store: Store<AppState>) {

  }

  ngOnInit() {
    this.store.dispatch(autoLoginAction());

    this.isLoading$ = this.store.select(selectAuth).pipe(
      map(authState => authState.isLoading),
    )
  }
}
