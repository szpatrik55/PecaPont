import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';

export const newsGuard: CanActivateFn = async () => {
  const auth = inject(Auth);
  const router = inject(Router);

  const user = auth.currentUser;

  if (!user) {
    return router.createUrlTree(['/bejelentkezes']);
  }

  const token = await user.getIdTokenResult();

  if (token.claims['news'] || token.claims['admin']) {
    return true;
  }

  return router.createUrlTree(['/']);
};