import { SessionService } from '@API/session.service';
import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';

export const sessionGuardGuard: CanMatchFn = () => {
  const sessionService = inject(SessionService)
  const router = inject(Router)
  const user = sessionService.user() ?? localStorage.getItem(sessionService.STORAGE_USER_NAME) ?? ''

  if (!user) {
    router.navigateByUrl('/auth/login', { replaceUrl: true })
    return false
  }

  return true;
};
