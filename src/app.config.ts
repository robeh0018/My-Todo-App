import {provideRouter} from "@angular/router";
import {appRoutes} from "./app/app.routes";
import {provideStore} from "@ngrx/store";
import {appReducer} from "./app/store/app.reducer";
import {provideHttpClient} from "@angular/common/http";
import {importProvidersFrom, isDevMode} from "@angular/core";
import {provideStoreDevtools} from "@ngrx/store-devtools";
import {provideEffects} from "@ngrx/effects";
import {AuthEffects} from "./app/auth/store/auth.effects";
import {TodoEffects} from "./app/todo/store/todo.effects";

export const appConfig = {
  providers: [
    provideRouter(appRoutes),
    provideStore(appReducer),
    provideHttpClient(),
    importProvidersFrom(),
    provideStoreDevtools({maxAge: 25, logOnly: !isDevMode()}),
    provideEffects([AuthEffects, TodoEffects]),
  ]
};
