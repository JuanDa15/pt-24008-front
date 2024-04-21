import { Injectable } from '@angular/core';
import { API } from '@API/API';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends API {

  public URL = `${this.URL_API}auth/login`

  constructor(
    private _http: HttpClient
  ) {
    super(_http)
  }
}
