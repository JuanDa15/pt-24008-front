import { CartService } from '@API/cart/cart.service';
import { Permissions } from '@shared/services/permissions';
import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '@interfaces/cart/order.interface';
import { ServerResponse } from '@interfaces/shared.interface';
import { tap } from 'rxjs';
import { TotalOrderPipe } from '@shared/pipes/total-order.pipe';
import { CartCardComponent } from '@shared/components/cart-card/cart-card.component';
import { TotalElementsPipe } from '@shared/pipes/total-elements.pipe';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [TotalOrderPipe, CartCardComponent, TotalElementsPipe, CurrencyPipe],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent extends Permissions implements OnInit {
  public ar = inject(ActivatedRoute)
  public cartService = inject(CartService)
  public router = inject(Router)
  public isEditView = signal<boolean>(false)
  public orderID = signal<string>('')

  constructor() {
    super()
    inject(DestroyRef).onDestroy(() => {
      this.isEditView.set(false)
      this.orderID.set('')
    })
  }

  ngOnInit(): void {
    const { id } = this.ar.snapshot.params

    if (id) {
      this.isEditView.set(true)
      this.orderID.set(id)
      this.fetchOrder(id)
      return;
    }
  }

  public fetchOrder(id: string): void {
    this.cartService.detail<ServerResponse<Order>>(id).pipe(
      tap(({ data }) => {
        if (!data) return;
        this.cartService.currentOrder.set(data);
      })
    ).subscribe({
      next: order => { },
      error: () => {
        this.router.navigateByUrl('/app/cart/orders', { replaceUrl: true })
      }
    })
  }

}
