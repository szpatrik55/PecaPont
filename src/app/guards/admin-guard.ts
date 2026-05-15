import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';

export const adminGuard: CanActivateFn = async () => {
  const auth = inject(Auth);
  const firestore = inject(Firestore);
  const router = inject(Router);

  const user = auth.currentUser;

  if (!user) {
    return router.createUrlTree(['/bejelentkezes']);
  }

  const token = await user.getIdTokenResult(true);

  if (token.claims['admin']) {
    return true;
  }

  const userRef = doc(firestore, 'users', user.uid);
  const snap = await getDoc(userRef);

  if (snap.exists() && snap.data()['role'] === 'admin') {
    return true;
  }

  return router.createUrlTree(['/']);
};