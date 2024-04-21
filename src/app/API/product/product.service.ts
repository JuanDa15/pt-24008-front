import { API } from '@API/API';
import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Product } from '@interfaces/product/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends API {

  public URL = `${this.URL_API}product`

  public products = signal<Product[]>([])

  constructor(
    private _http: HttpClient
  ) {
    super(_http)
  }
}
