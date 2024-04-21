import { API } from '@API/API';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService extends API {

  public URL = `${this.URL_API}auth/register`

  constructor(
    private _http: HttpClient
  ) {
    super(_http)
  }
}
