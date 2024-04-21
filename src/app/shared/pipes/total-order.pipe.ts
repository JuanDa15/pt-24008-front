import { Pipe, PipeTransform } from '@angular/core';
import { ProductElement } from '@interfaces/cart/order.interface';

@Pipe({
  name: 'totalOrder',
  standalone: true
})
export class TotalOrderPipe implements PipeTransform {

  transform(value: ProductElement[] = []): unknown {
    return value.reduce((acc, curr) => acc + curr.product.price * curr.quantity, 0)
  }

}
