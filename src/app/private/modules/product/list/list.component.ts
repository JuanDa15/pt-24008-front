import { CartManagerService } from '@API/cart.service';
import { Permissions } from '@API/permissions';
import { ProductService } from '@API/product/product.service';
import { CurrencyPipe } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '@interfaces/product/product';
import { ServerResponse } from '@interfaces/shared.interface';
import { tap } from 'rxjs';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
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
      next: (products) => console.log(products),
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
