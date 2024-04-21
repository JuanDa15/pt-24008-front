import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationHandlerService {
  public snackBar = inject(MatSnackBar)

  public snackClasses: Record<string, string> = {
    'info': 'info-snack',
    'warning': 'warning-snack',
    'success': 'success-snack',
    'error': 'error-snack'
  }

  public createNotification({
    message,
    type
  }: {
    message: string,
    type: 'info' | 'warning' | 'success' | 'error'
  }) {
    this.snackBar.open(message, 'close', {
      panelClass: this.snackClasses[type],
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    })
  }
}
