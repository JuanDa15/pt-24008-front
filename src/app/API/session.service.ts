import { Injectable, signal } from '@angular/core';
import { LoginResponse, User } from '@interfaces/shared.interface';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  public readonly STORAGE_USER_NAME = 'APP_USER';
  public readonly STORAGE_TOKEN = 'APP_TOKEN'

  public user = signal<User | null>(null)
  public token = signal<string | null>(null)

  setSession({ token, ...user }: LoginResponse) {
    localStorage.setItem(this.STORAGE_USER_NAME, JSON.stringify(user))
    localStorage.setItem(this.STORAGE_TOKEN, token)
    this.user.set(user)
    this.token.set(token)
  }

  clearSession() {
    localStorage.removeItem(this.STORAGE_USER_NAME)
    localStorage.removeItem(this.STORAGE_TOKEN)
    this.user.set(null)
    this.token.set(null)
  }
}
