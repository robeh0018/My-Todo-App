import {Route, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";

const AuthRoutes: Routes = [
  {
    path: 'login', component: LoginComponent,
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.component').then(c => c.RegisterComponent)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: "full",
  },
]


export default AuthRoutes as Route[];
