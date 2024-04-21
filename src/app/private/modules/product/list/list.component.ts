import { CartManagerService } from '@shared/services/cart.service';
import { Permissions } from '@shared/services/permissions';
import { ProductService } from '@API/product/product.service';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '@interfaces/product/product';
import { ServerResponse } from '@interfaces/shared.interface';
import { tap } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProductCardComponent } from '@shared/components/product-card/product-card.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatIconModule, ProductCardComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent extends Permissions implements OnInit {
  public productService = inject(ProductService)
  public cartService = inject(CartManagerService)

  constructor() {
    super()
    inject(DestroyRef).onDestroy(() => {
      this.productService.products.set([])
    })
  }

  ngOnInit(): void {
    this.fetchProducts()
  }

  public fetchProducts(): void {
    this.productService.list<ServerResponse<Product[]>>().pipe(
      tap(({ data = [] }) => {
        this.productService.products.set(data)
      })
    ).subscribe({
      next: () => { },
    })
  }

  public deleteProduct(product: Product) {
    this.productService.remove(product._id).subscribe({
      next: () => {
        this.fetchProducts()
      }
    })
  }
}
