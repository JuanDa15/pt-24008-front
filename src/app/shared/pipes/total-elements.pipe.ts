import { Pipe, PipeTransform } from '@angular/core';
import { ProductElement } from '@interfaces/cart/order.interface';

@Pipe({
  name: 'totalElements',
  standalone: true
})
export class TotalElementsPipe implements PipeTransform {

  transform(value: ProductElement[]): number {
    return value.reduce((acc, curr) => acc + curr.quantity, 0)
  }

}
