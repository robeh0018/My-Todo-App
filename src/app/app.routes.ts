import {Routes} from "@angular/router";
import {AuthGuard} from "./auth/auth.guard";

export const appRoutes: Routes = [
  {
    path: 'auth',
    loadComponent: () => import('./auth/auth.component').then(c => c.AuthComponent),
  },
  {
    providers: [AuthGuard],
    canActivate: [AuthGuard],
    path: 'todos',
    loadChildren: () => import('./todo/todo.routes'),
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: "full",
  },
]
