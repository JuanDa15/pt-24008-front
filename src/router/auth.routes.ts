import { Routes } from "@angular/router";
import { noSessionGuardGuard } from "../app/guards/no-session-guard.guard";

export const AuthRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        canMatch: [noSessionGuardGuard],
        loadComponent: () => import('@public/modules/auth/login/login.component').then(c => c.LoginComponent)
      },
      {
        path: 'register',
        canMatch: [noSessionGuardGuard],
        loadComponent: () => import('@public/modules/auth/register/register.component').then(c => c.RegisterComponent)
      },
    ]
  }
]
