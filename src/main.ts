/// <reference types="@angular/localize" />

import {bootstrapApplication} from "@angular/platform-browser";
import {AppComponent} from "./app/app.component";
import {provideStore} from '@ngrx/store';
import {provideStoreDevtools} from '@ngrx/store-devtools';
import {importProvidersFrom, isDevMode} from '@angular/core';
import {provideRouter} from "@angular/router";
import {appReducer} from "./app/store/app.reducer";
import {appRoutes} from "./app/app.routes";
import {provideEffects} from '@ngrx/effects';
import {AuthEffects} from "./app/auth/store/auth.effects";
import {provideHttpClient} from "@angular/common/http";


bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    provideStore(appReducer),
    provideHttpClient(),
    importProvidersFrom(),
    provideStoreDevtools({maxAge: 25, logOnly: !isDevMode()}),
    provideEffects([AuthEffects])
  ]
})
  .catch(() => console.log);
