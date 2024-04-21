import { RenewService } from '@API/auth/renew.service';
import { CartManagerService } from '@shared/services/cart.service';
import { SessionService } from '@API/session.service';
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LoginResponse, ServerResponse } from '@interfaces/shared.interface';
import { CloudinaryService } from '@shared/services/cloudinary.service';
import { LoaderComponent } from '@shared/components/loader/loader.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private _router = inject(Router)
  public sessionService = inject(SessionService)
  public renewSession = inject(RenewService)
  public cartService = inject(CartManagerService)
  public cloudinary = inject(CloudinaryService)

  title = 'pt-24008';

  ngOnInit(): void {
    this.checkSession()
  }

  public checkSession(): void {
    const token = localStorage.getItem(this.sessionService.STORAGE_TOKEN)

    if (!token) {
      // this._router.navigateByUrl('/auth/login', { replaceUrl: true })
      return;
    }

    this.renewSession.create<null, ServerResponse<LoginResponse>>().subscribe({
      next: ({ data }) => {
        if (!data) return;
        this.cartService.initializeCart()
        this.sessionService.setSession(data)
      },
      error: () => {
        this.sessionService.clearSession()
        this._router.navigateByUrl('/auth/login', { replaceUrl: true })
      }
    })
  }
}
