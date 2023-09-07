import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {
  authenticationFailAction,
  authenticationSuccessAction,
  logoutAction,
  startAuthenticationWithEmailAndPassAction,
  startAuthenticationWithGoogleAction,
  startSignUpAction
} from "./auth.actions";
import {catchError, map, of, switchMap, tap} from "rxjs";
import {Environment} from "../../../environment/environment";
import {handleAuthentication} from "../helpers/handleAuthentication";
import {handleError} from "../helpers/handleError";
import {GoogleAuthProvider, signInWithPopup,} from "firebase/auth";
import {FirebaseAuth} from "../../firebase/firebase.config";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

export interface AuthApiResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable()

export class AuthEffects {


  constructor(private actions$: Actions,
              private http: HttpClient,
              private authService: AuthService,
              private router: Router) {
  }

  loginWithGoogle$ = createEffect(
    () => this.actions$.pipe(
      ofType(startAuthenticationWithGoogleAction),
      switchMap(async () => {

        const res = await signInWithPopup(FirebaseAuth, new GoogleAuthProvider());

        const {email, displayName, uid} = res.user;

        const tokenResults = await res.user.getIdTokenResult();


        const _tokenExpirationTime = (new Date(tokenResults.expirationTime).getTime() - new Date().getTime()) / 1000;

        return authenticationSuccessAction({
          payload: {
            uid: uid!,
            userName: displayName!,
            email: email!,
            _idToken: tokenResults.token,
            _tokenExpirationTime: _tokenExpirationTime.toString(),
          }
        });
      }),
      tap(({payload}) => this.authService.setAutoLogoutTimer(+payload._tokenExpirationTime)),
      catchError(err => of(authenticationFailAction({payload: err})))
    ),
  );

  signUp$ = createEffect(
    () => this.actions$.pipe(
      ofType(startSignUpAction),
      switchMap(({payload}) => {

        const {email, password} = payload;

        return this.http.post<AuthApiResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${Environment.API_KEY}`, {
          email,
          password,
          returnSecureToken: true,
        }).pipe(
          map(apiRes => {

            return handleAuthentication(apiRes)
          }),
          tap(({payload}) => this.authService.setAutoLogoutTimer(+payload._tokenExpirationTime)),
          catchError((err: HttpErrorResponse) => handleError(err)),
        )
      })
    )
  );

  loginWithEmailAndPassword$ = createEffect(
    () => this.actions$.pipe(
      ofType(startAuthenticationWithEmailAndPassAction),
      switchMap(({payload}) => {
        const {email, password} = payload;

        return this.http.post<AuthApiResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${Environment.API_KEY}`, {
          email,
          password,
          returnSecureToken: true,
        }).pipe(
          map((apiRes) => {

            return handleAuthentication(apiRes);
          }),
          tap(({payload}) => this.authService.setAutoLogoutTimer(+payload._tokenExpirationTime)),
          catchError((err: HttpErrorResponse) => handleError(err))
        )
      })
    )
  );

  authRedirect$ = createEffect(
    () => this.actions$.pipe(
      ofType(authenticationSuccessAction),
      tap(({payload}) => {
        if (payload) {
          this.router.navigate(['/todos']);
        }
      })
    ), {dispatch: false},
  )

  authLogout$ = createEffect(
    () => this.actions$.pipe(
      ofType(logoutAction),
      tap(() => {
        this.authService.clearAutoLogoutTimer();
        this.router.navigate(['/auth']);
      })
    ), {dispatch: false},
  )

}
