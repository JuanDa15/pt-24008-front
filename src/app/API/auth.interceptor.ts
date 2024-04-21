import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SessionService } from './session.service';
import { catchError, delay, tap, throwError } from 'rxjs';
import { NotificationHandlerService } from '@shared/services/notification-handler.service';
import { LoaderHandlerService } from '@shared/services/loader-handler.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const sessionService = inject(SessionService)
  const notification = inject(NotificationHandlerService)
  const token = sessionService.token() ?? localStorage.getItem(sessionService.STORAGE_TOKEN) ?? '';
  const loaderHandler = inject(LoaderHandlerService)

  loaderHandler.loading = true;
  let cloned = req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`) });

  return next(!token ? req : cloned).pipe(
    delay(500),
    tap(() => {
      loaderHandler.loading = false;
    }),
    catchError((error: HttpErrorResponse) => {
      const httpError = new HttpErrorResponse({
        error: error.error,
        status: error.status,
        statusText: error.statusText,
        headers: error.headers,
        url: error.url ?? '',
      });
      loaderHandler.loading = false;
      notification.createNotification({
        message: error.error.message,
        type: 'error'
      })
      return throwError(() => httpError);
    })
  )
};
