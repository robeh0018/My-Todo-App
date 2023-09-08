import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgbAlert} from "@ng-bootstrap/ng-bootstrap";
import {RouterLink} from "@angular/router";
import {AppState} from "../store/app.reducer";
import {Store} from "@ngrx/store";
import {
  cleanupAuthErrorAction,
  startAuthenticationWithEmailAndPassAction,
  startAuthenticationWithGoogleAction,
  startSignUpAction
} from "./store/auth.actions";
import {selectAuth} from "./store/auth.selectors";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbAlert, ReactiveFormsModule, RouterLink],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit, OnDestroy {

  isLoginMode: boolean = true;

  authForm: FormGroup;

  isLoading: boolean = false;
  errorMessage: string | null;

  storeSubs: Subscription;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
  ) {

    this.authForm = fb.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    })

    this.errorMessage = '';
    this.storeSubs = new Subscription();
  };

  ngOnInit() {

    this.storeSubs = this.store.select(selectAuth)
      .subscribe(authState => {
        this.isLoading = authState.isLoading;
        this.errorMessage = authState.authError;
      });

  };

  onSubmitWithEmailAndPassword() {
    this.isLoginMode
      ? this.store.dispatch(startAuthenticationWithEmailAndPassAction({payload: this.authForm.value}))
      : this.store.dispatch(startSignUpAction({payload: this.authForm.value}))

    this.authForm.reset();
  };

  onSubmitWithGoogle() {

    this.store.dispatch(startAuthenticationWithGoogleAction());
  };

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;

    this.onCleanError();
  };

  onCleanError() {

    this.store.dispatch(cleanupAuthErrorAction());
  };

  seeError() {
    console.log(this.authForm.get('password')?.hasError('required'))
  };

  ngOnDestroy() {
    this.storeSubs.unsubscribe();
  };

}
