import { RenewService } from '@API/auth/renew.service';
import { CartManagerService } from '@API/cart.service';
import { SessionService } from '@API/session.service';
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LoginResponse, ServerResponse } from '@interfaces/shared.interface';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private _router = inject(Router)
  public sessionService = inject(SessionService)
  public renewSession = inject(RenewService)
  public cartService = inject(CartManagerService)

  title = 'pt-24008';

  ngOnInit(): void {
    this.checkSession()
  }

  public checkSession(): void {
    const token = localStorage.getItem(this.sessionService.STORAGE_TOKEN)

    if (!token) {
      this._router.navigateByUrl('/auth/login', { replaceUrl: true })
      return;
    }

    this.renewSession.create<null, ServerResponse<LoginResponse>>().subscribe({
      next: ({ data }) => {
        if (!data) return;
        this.cartService.initializeCart()
        this.sessionService.setSession(data)
      },
    })
  }
}
