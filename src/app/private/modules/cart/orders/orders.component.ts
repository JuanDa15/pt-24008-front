import { CartService } from '@API/cart/cart.service';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { Order } from '@interfaces/cart/order.interface';
import { ServerResponse } from '@interfaces/shared.interface';
import { tap } from 'rxjs';
import { TotalElementsPipe } from '../../../../shared/pipes/total-elements.pipe';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Permissions } from '@shared/services/permissions';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [TotalElementsPipe, RouterLink, MatTableModule, DatePipe, CurrencyPipe, MatChipsModule, MatButtonModule, MatIcon, MatTooltipModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent extends Permissions implements OnInit {
  public cartService = inject(CartService)
  public displayedColumns: string[] = ['ID', 'Created', 'Products', 'Status', 'Total price', 'Actions'];

  constructor() {
    super()
    inject(DestroyRef).onDestroy(() => {
      this.cartService.orders.set([])
    })

    if (this.isAdmin) {
      this.displayedColumns.splice(2, 0, 'User')
    }
  }

  ngOnInit(): void {
    this.cartService.list<ServerResponse<Order[]>>().pipe(
      tap(({ data = [] }) => this.cartService.orders.set(data))
    ).subscribe({
      next: () => { }
    })
  }
}
