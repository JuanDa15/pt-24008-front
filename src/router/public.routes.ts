import { Routes } from "@angular/router";
import { LayoutComponent } from "@public/layout/layout.component";

export const PublicRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => import('@router/auth.routes').then(r => r.AuthRoutes)
      }
    ]
  }
]
