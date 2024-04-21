import { Routes } from "@angular/router";
import { sessionGuardGuard } from "../app/guards/session-guard.guard";
import { adminGuardGuard } from "../app/guards/admin-guard.guard";

export const ProductRoutes: Routes = [
  {
    path: '',
    canMatch: [sessionGuardGuard],
    children: [
      {
        path: 'list',
        loadComponent: () => import('@private/modules/product/list/list.component').then(c => c.ListComponent)
      },
      {
        path: '',
        canMatch: [adminGuardGuard],
        loadComponent: () => import('@private/modules/product/product/product.component').then(c => c.ProductComponent)
      },
      {
        path: ':id',
        canMatch: [adminGuardGuard],
        loadComponent: () => import('@private/modules/product/product/product.component').then(c => c.ProductComponent)
      },
    ]
  }
]
