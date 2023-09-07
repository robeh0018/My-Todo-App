import {HttpErrorResponse} from "@angular/common/http";
import {of} from "rxjs";
import {authenticationFailAction} from "../store/auth.actions";

export const handleError = (e: HttpErrorResponse) => {
    let errorMessage = 'Unknown error happened';

    console.log(e.error.error.message);
    switch (e.error.error.message) {
        case 'EMAIL_NOT_FOUND':
            errorMessage = 'Email not found';
            break;
        case 'EMAIL_EXISTS':
            errorMessage = 'Email already in use';
            break;
        case 'INVALID_PASSWORD':
            errorMessage = 'Incorrect Credentials';
            break;
        case 'USER_DISABLED':
            errorMessage = 'Account disabled by an administrator';
            break;
        case 'TOO_MANY_ATTEMPTS_TRY_LATER':
            errorMessage = 'Too many attempts try later';
            break;
        case 'OPERATION_NOT_ALLOWED':
            errorMessage = 'Password disabled';
            break;
    }

    return of(authenticationFailAction({payload: errorMessage}))
}
