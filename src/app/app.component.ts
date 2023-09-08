import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {Store} from "@ngrx/store";
import {AppState} from "./store/app.reducer";
import {autoLoginAction} from "./auth/store/auth.actions";
import {ToastComponent} from "./shared/toast/toast.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ToastComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  constructor(private store: Store<AppState>) {

  }

  ngOnInit() {
    this.store.dispatch(autoLoginAction());
  }
}
