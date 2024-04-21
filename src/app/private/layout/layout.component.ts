import { SessionService } from '@API/session.service';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatBadgeModule } from '@angular/material/badge';
import { CartManagerService } from '@shared/services/cart.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import { MediaMatcher } from '@angular/cdk/layout';
import { BottomSheetComponent } from '@shared/components/bottom-sheet/bottom-sheet.component';
import { MenuComponent } from '@shared/components/menu/menu.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatToolbar, MatButtonModule, MatIconModule, MatBadgeModule, MatTooltipModule, MatSidenavModule, MatListModule, RouterLinkActive, BottomSheetComponent, MenuComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  public sessionService = inject(SessionService)
  public cartService = inject(CartManagerService)
  private _bottomSheetRef = inject(MatBottomSheet)
  private _mediaMatcher = inject(MediaMatcher)
  public router = inject(Router)


  public isSmallScreen = false;

  public resizeListener = ({ matches }: MediaQueryListEvent) => {
    this.isSmallScreen = matches;
  }
  constructor() {
    this._mediaMatcher.matchMedia('(max-width: 900px)').addEventListener('change', this.resizeListener)

    inject(DestroyRef).onDestroy(() => {
      this._mediaMatcher.matchMedia('(max-width: 900px)').removeEventListener('change', this.resizeListener)
    })
  }
  public openMenu() {
    this._bottomSheetRef.open(BottomSheetComponent)
  }

  public logOut() {
    this.sessionService.clearSession();
    this.router.navigateByUrl('/auth/login', { replaceUrl: true })
  }

}
