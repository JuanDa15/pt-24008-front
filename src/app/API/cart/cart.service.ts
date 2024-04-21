import { API } from '@API/API';
import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Order } from '@interfaces/cart/order.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService extends API {

  public URL = `${this.URL_API}cart`

  public orders = signal<Order[]>([])

  public currentOrder = signal<Order | null>(null)

  constructor(
    private _http: HttpClient
  ) {
    super(_http)
  }
}
