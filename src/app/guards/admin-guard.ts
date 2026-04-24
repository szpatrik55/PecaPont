import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { firstValueFrom } from 'rxjs';
import { authState } from '@angular/fire/auth';

export const adminGuard: CanActivateFn = async () => {
  const auth = inject(Auth);
  const firestore = inject(Firestore);
  const router = inject(Router);

  try {
    // ✅ MEGVÁRJUK az auth state-et
    const user = await firstValueFrom(authState(auth));

    if (!user) {
      return router.createUrlTree(['/bejelentkezes']);
    }

    const userRef = doc(firestore, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      return router.createUrlTree(['/']);
    }

    const data = userSnap.data();

    if (data?.['role'] === 'admin') {
      return true;
    }

    return router.createUrlTree(['/']);

  } catch (error) {
    console.error('Admin guard hiba:', error);
    return router.createUrlTree(['/']);
  }
};