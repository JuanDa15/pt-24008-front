import { SessionService } from '@API/session.service';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatListModule, RouterLink, MatIconModule, RouterLinkActive],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  public sessionService = inject(SessionService)
  public router = inject(Router)

  @Output() clickedElement = new EventEmitter<void>()

  public logOut() {
    this.sessionService.clearSession();
    this.router.navigateByUrl('/auth/login', { replaceUrl: true })
  }
}
