import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./public.routes').then(m => m.PublicRoutes)
  },
  {
    path: 'app',
    loadChildren: () => import('./private.routes').then(m => m.PrivateRoutes)
  }
];
