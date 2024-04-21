import { inject } from "@angular/core";
import { SessionService } from "../../API/session.service";
import { User } from "@interfaces/shared.interface";

export class Permissions {
  public sessionService = inject(SessionService)
  public user: User = this.sessionService.user() ?? JSON.parse(localStorage.getItem(this.sessionService.STORAGE_USER_NAME) ?? '{}')


  get isAdmin(): boolean {
    return this.user.type === 'admin'
  }

  get isUser(): boolean {
    return this.user.type === 'user'
  }

}
