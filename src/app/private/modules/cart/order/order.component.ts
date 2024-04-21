import { CartManagerService } from '@shared/services/cart.service';
import { CartService } from '@API/cart/cart.service';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CartDTO, CartProductDTO } from '@interfaces/cart/cart.interface';
import { Order } from '@interfaces/cart/order.interface';
import { TotalOrderPipe } from '../../../../shared/pipes/total-order.pipe';
import { AsyncPipe } from '@angular/common';
import { CartCardComponent } from '@shared/components/cart-card/cart-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { TotalElementsPipe } from '@shared/pipes/total-elements.pipe';
import { NotificationHandlerService } from '@shared/services/notification-handler.service';
import { ServerResponse } from '@interfaces/shared.interface';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [TotalOrderPipe, AsyncPipe, CartCardComponent, MatButtonModule, MatIcon, TotalElementsPipe],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent {
  public cartService = inject(CartManagerService)
  public cart = inject(CartService)
  public router = inject(Router)
  public notification = inject(NotificationHandlerService)

  public submit(): void {
    const body = this.cartService.cart.map(item => ({
      product: item.product._id,
      quantity: item.quantity
    })) as CartProductDTO[]

    this.cart.create<CartDTO, ServerResponse<Order>>({ products: body }).subscribe({
      next: ({ message }) => {
        this.notification.createNotification({
          message,
          type: 'success'
        })
        this.router.navigateByUrl('/app/cart/orders')
        this.cartService.clearCart()
      }
    })
  }
}
