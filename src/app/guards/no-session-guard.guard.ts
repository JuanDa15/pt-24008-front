import { SessionService } from '@API/session.service';
import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';

export const noSessionGuardGuard: CanMatchFn = () => {
  const session = inject(SessionService)
  const router = inject(Router)
  const user = session.user() || localStorage.getItem(session.STORAGE_USER_NAME);

  if (user) {
    router.navigateByUrl('/app/product/list')
    return false
  }
  return true;
};
