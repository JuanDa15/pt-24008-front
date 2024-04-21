import { Routes } from "@angular/router";
import { LayoutComponent } from "@private/layout/layout.component";

export const PrivateRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'product',
        loadChildren: () => import('@router/product.routes').then(m => m.ProductRoutes)
      },
      {
        path: 'cart',
        loadChildren: () => import('@router/cart.routes').then(m => m.CartRoutes)
      }
    ]
  }
]
