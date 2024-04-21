import { CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { Product } from '@interfaces/product/product';
import { Permissions } from '@shared/services/permissions';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [MatCardModule, CurrencyPipe, RouterLink, MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent extends Permissions {
  @Input({ required: true }) product!: Product;
  @Output() onDelete = new EventEmitter<void>()
  @Output() onAddToCart = new EventEmitter<void>()
}
