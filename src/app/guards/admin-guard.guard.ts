import { SessionService } from '@API/session.service';
import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { User } from '@interfaces/shared.interface';

export const adminGuardGuard: CanMatchFn = (route, segments) => {
  const sessionService = inject(SessionService)
  const router = inject(Router)
  const user: User = sessionService.user() ?? JSON.parse(localStorage.getItem(sessionService.STORAGE_USER_NAME) ?? '{}')

  if (!user) {
    router.navigateByUrl('/auth/login', { replaceUrl: true })
    return false
  }

  return user.type === 'admin';
};
