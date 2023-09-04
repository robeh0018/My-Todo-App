import {Routes} from "@angular/router";

export const appRoutes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes')
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: "full",
  },
]
