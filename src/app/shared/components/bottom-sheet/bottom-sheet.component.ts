import { Component, inject } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-bottom-sheet',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './bottom-sheet.component.html',
  styleUrl: './bottom-sheet.component.scss'
})
export class BottomSheetComponent {
  public bottomSheetRef = inject(MatBottomSheetRef<BottomSheetComponent>)
}
