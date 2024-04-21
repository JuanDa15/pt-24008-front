import { SessionService } from '@API/session.service';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  public sessionService = inject(SessionService)
  public router = inject(Router)

  public logOut() {
    this.sessionService.clearSession();
    this.router.navigateByUrl('/auth/login', { replaceUrl: true })
  }

}
