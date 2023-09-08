import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {
    authenticationFailAction,
    authenticationSuccessAction,
    autoLoginAction,
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
import {User} from "../user.model";

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
                private router: Router,
    ) {
    }

    authLoginWithGoogle$ = createEffect(
        () => this.actions$.pipe(
            ofType(startAuthenticationWithGoogleAction),
            switchMap(async () => {

                const res = await signInWithPopup(FirebaseAuth, new GoogleAuthProvider());

                const {email, uid} = res.user;

                const tokenResults = await res.user.getIdTokenResult();

                const _tokenExpirationTime = (new Date(tokenResults.expirationTime).getTime() - new Date().getTime()) / 1000;

                const user: User = {
                    uid: uid!,
                    email: email!,
                    _idToken: tokenResults.token,
                    _tokenExpirationTime: _tokenExpirationTime.toString(),
                };

                localStorage.setItem('userAuthenticated', JSON.stringify(user));

                return authenticationSuccessAction({payload: user});
            }),
            tap(({payload}) => this.authService.setAutoLogoutTimer(+payload._tokenExpirationTime)),
            catchError(err => of(authenticationFailAction({payload: err})))
        ),
    );

    authSignUp$ = createEffect(
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

    authLoginWithEmailAndPassword$ = createEffect(
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

    authAutoLogin$ = createEffect(
        () => this.actions$.pipe(
            ofType(autoLoginAction),
            map(() => {

                const userData = localStorage.getItem('userAuthenticated');

                if (!userData) return {type: 'EMPTY'};

                const loadedUser: User = JSON.parse(userData);

                if (!loadedUser._idToken) return {type: 'EMPTY'};

                const user: User = {
                    ...loadedUser,
                };

                this.authService.setAutoLogoutTimer(+user._tokenExpirationTime);

                return authenticationSuccessAction({payload: user});
            })
        )
    )

    authLogout$ = createEffect(
        () => this.actions$.pipe(
            ofType(logoutAction),
            map(() => {
                this.authService.clearAutoLogoutTimer();
                localStorage.removeItem('userAuthenticated');
                this.router.navigate(['/auth']);
            }),
        ), {dispatch: false}
    );

    authRedirect$ = createEffect(
        () => this.actions$.pipe(
            ofType(authenticationSuccessAction),
            tap(({payload}) => {
                if (payload) {
                    this.router.navigate(['/todos/no-selected']);
                }
            }),
        ), {dispatch: false},
    )

}
