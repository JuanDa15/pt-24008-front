import { CartService } from '@API/cart/cart.service';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { Order } from '@interfaces/cart/order.interface';
import { ServerResponse } from '@interfaces/shared.interface';
import { tap } from 'rxjs';
import { TotalElementsPipe } from '../../../../shared/pipes/total-elements.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [TotalElementsPipe, RouterLink],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
  public cartService = inject(CartService)

  constructor() {
    inject(DestroyRef).onDestroy(() => {
      this.cartService.orders.set([])
    })
  }

  ngOnInit(): void {
    this.cartService.list<ServerResponse<Order[]>>().pipe(
      tap(({ data = [] }) => this.cartService.orders.set(data))
    ).subscribe({
      next: (resp) => {
        console.log(resp)
      }
    })
  }
}
