import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SessionService } from './session.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const sessionService = inject(SessionService)

  const token = sessionService.token() ?? localStorage.getItem(sessionService.STORAGE_TOKEN) ?? '';

  if (!token) {
    return next(req);
  }

  req = req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`) });
  return next(req);
};
