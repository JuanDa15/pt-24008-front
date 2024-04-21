import { CurrencyPipe } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Product } from '@interfaces/product/product';
import { CartManagerService } from '@shared/services/cart.service';

@Component({
  selector: 'app-cart-card',
  standalone: true,
  imports: [MatCardModule, CurrencyPipe, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './cart-card.component.html',
  styleUrl: './cart-card.component.scss'
})
export class CartCardComponent {
  public cartService = inject(CartManagerService)

  @Input({ required: true }) cartItem!: { product: Product, quantity: number }
  @Input({ required: true }) showControls: boolean = false
}
