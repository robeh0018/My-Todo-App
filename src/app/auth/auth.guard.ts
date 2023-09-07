import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {map, Observable, take} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "../store/app.reducer";
import {selectUser} from "./store/auth.selectors";

@Injectable()

export class AuthGuard implements CanActivate {

    constructor(private store: Store<AppState>,
                private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        return this.store.select(selectUser).pipe(
            take(1),
            map(user => {

                if (user) {
                    return true;
                } else {
                    return this.router.createUrlTree(['/auth']);
                }
            })
        )

    }

}
