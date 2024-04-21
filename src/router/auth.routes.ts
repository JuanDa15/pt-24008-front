import { Routes } from "@angular/router";
import { noSessionGuardGuard } from "../app/guards/no-session-guard.guard";
import { AuthLayoutComponent } from "@public/modules/auth/auth-layout/auth-layout.component";

export const AuthRoutes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
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
      {
        path: 'register-admin',
        canMatch: [noSessionGuardGuard],
        loadComponent: () => import('@public/modules/auth/register/register.component').then(c => c.RegisterComponent)
      },
      {
        path: '**',
        redirectTo: 'login'
      }
    ]
  }
]
