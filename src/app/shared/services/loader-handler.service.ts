import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderHandlerService {

  private _loading = false;
  private _loading$ = new BehaviorSubject(this._loading)
  public loadingObservable = this._loading$.asObservable();

  get loading(): boolean {
    return this._loading;
  }

  set loading(value: boolean) {
    this._loading = value;
    this._loading$.next(this._loading);
  }

  public toggleLoading() {
    this._loading = !this._loading;
    this._loading$.next(this._loading);
  }
}
