import { Injectable, computed, effect, signal } from '@angular/core';
import { Product } from '@interfaces/product/product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartManagerService {
  public readonly CART_STORAGE_NAME = 'PRODUCTS_CART'

  private _cart: { product: Product, quantity: number }[] = []
  private _cart$ = new BehaviorSubject(this._cart)
  public cart$ = this._cart$.asObservable()

  get cart() {
    return this._cart
  }


  get total() {
    return this._cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
  }

  public initializeCart() {
    const cart = localStorage.getItem(this.CART_STORAGE_NAME)
    if (cart) {
      this._cart = JSON.parse(cart);
      this._cart$.next(this._cart)
    }
  }

  public setCart(cart: { product: Product, quantity: number }[]) {
    this._cart = cart;
    this._cart$.next(this._cart)
    localStorage.setItem(this.CART_STORAGE_NAME, JSON.stringify(this._cart))
  }

  public removeFromCart(product: Product) {
    this._cart = this._cart.filter(item => item.product._id !== product._id)
    this._cart$.next(this._cart)
    localStorage.setItem(this.CART_STORAGE_NAME, JSON.stringify(this._cart))
  }

  public addToCart(product: Product, action: 1 | -1) {
    const toReturn = this._cart;
    const index = this._cart.findIndex(item => item.product._id === product._id)

    if (index === -1) {
      toReturn.push({ product, quantity: 1 })
    } else {
      toReturn[index].quantity += action
    }

    this._cart = toReturn;
    this._cart$.next(this._cart)
    localStorage.setItem(this.CART_STORAGE_NAME, JSON.stringify(this._cart))
  }

  public clearCart() {
    this._cart = []
    this._cart$.next(this._cart)
    localStorage.removeItem(this.CART_STORAGE_NAME)
  }
}
