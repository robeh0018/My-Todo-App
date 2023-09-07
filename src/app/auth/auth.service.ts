import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {AppState} from "../store/app.reducer";
import {logoutAction} from "./store/auth.actions";

@Injectable({providedIn: "root"})

export class AuthService {

  userExpirationTimer: any;

  constructor(private store: Store<AppState>,
  ) {
  };

  setAutoLogoutTimer(expirationTime: number) {
    this.userExpirationTimer = setTimeout(() => {
      this.store.dispatch(logoutAction());
    }, expirationTime * 1000);
  };

  clearAutoLogoutTimer() {
    if (this.userExpirationTimer) {
      clearTimeout(this.userExpirationTimer);
      this.userExpirationTimer = null;
    }
  };
}


