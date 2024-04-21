import { CartManagerService } from '@API/cart.service';
import { CartService } from '@API/cart/cart.service';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CartDTO, CartProductDTO } from '@interfaces/cart/cart.interface';
import { Order } from '@interfaces/cart/order.interface';
import { TotalOrderPipe } from '../../../../shared/pipes/total-order.pipe';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [TotalOrderPipe, AsyncPipe],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent {
  public cartService = inject(CartManagerService)
  public cart = inject(CartService)
  public router = inject(Router)

  public submit(): void {
    const body = this.cartService.cart.map(item => ({
      product: item.product._id,
      quantity: item.quantity
    })) as CartProductDTO[]

    this.cart.create<CartDTO, Order>({ products: body }).subscribe({
      next: () => {
        this.router.navigateByUrl('/app/cart/orders')
        this.cartService.clearCart()
      }
    })
  }
}
