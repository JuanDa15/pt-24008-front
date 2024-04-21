import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment as env } from "@environments/environment";


export abstract class API {
  protected URL_API: string = env.API + "v1/";
  protected abstract URL: string;

  constructor(protected http: HttpClient) { }

  create<T, U>(value?: T): Observable<U> {
    return this.http.post<U>(this.URL, value);
  }

  list<T>(params?: {}): Observable<T> {
    return this.http.get<T>(this.URL, { params });
  }

  detail<T>(id: string): Observable<T> {
    return this.http.get<T>(`${this.URL + "/" + encodeURIComponent(`${id}`)}`);
  }

  update<T, U>(id: string, value?: T): Observable<U> {
    return this.http.put<U>(this.URL + "/" + id, value);
  }

  remove<T>(id: string): Observable<T> {
    return this.http.delete<T>(this.URL + "/" + id);
  }
}
