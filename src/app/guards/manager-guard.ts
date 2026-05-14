import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';

export const managerGuard: CanActivateFn = async () => {
  const auth = inject(Auth);
  const router = inject(Router);

  const user = auth.currentUser;

  if (!user) {
    return router.createUrlTree(['/bejelentkezes']);
  }

  const token = await user.getIdTokenResult(true);

  if (token.claims['manager'] || token.claims['admin']) {
    return true;
  }

  return router.createUrlTree(['/']);
};