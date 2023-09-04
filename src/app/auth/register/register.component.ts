import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.reducer";
import {signInWithGoogle} from "../../firebase/providers";
import {login, startLoading} from "../store/auth.actions";
import {User} from "../user.model";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<AppState>) {

    this.registerForm = this.fb.group({
      userName: new FormControl(null, [Validators.required, Validators.maxLength(20)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
  }

  ngOnInit() {
  }

  onSignUp() {

    this.registerForm.reset();
  };

  onSignInWithGoogle() {

    this.store.dispatch(startLoading());

    signInWithGoogle().then(res => {

      const {email, uid, _idToken, displayName} = res;

      const user: User = {
        uid: uid!,
        _idToken: _idToken!,
        email: email!,
        userName: displayName!
      };

      this.store.dispatch(login({payload: user}));

    })
  }

}
