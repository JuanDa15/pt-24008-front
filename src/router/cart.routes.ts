import { Routes } from "@angular/router";
import { sessionGuardGuard } from "../app/guards/session-guard.guard";

export const CartRoutes: Routes = [
  {
    path: '',
    canMatch: [sessionGuardGuard],
    children: [
      {
        path: 'orders',
        loadComponent: () => import('@private/modules/cart/orders/orders.component').then(m => m.OrdersComponent)
      },
      {
        path: '',
        loadComponent: () => import('@private/modules/cart/order/order.component').then(m => m.OrderComponent)
      },
      {
        path: ':id',
        loadComponent: () => import('@private/modules/cart/summary/summary.component').then(m => m.SummaryComponent)
      },
    ]
  }
]
