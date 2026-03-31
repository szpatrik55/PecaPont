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
    router.navigate(['/bejelentkezes']);
    return false;
  }

  const userDoc = await getDoc(doc(firestore, 'users', user.uid));

  const data = userDoc.data();

  if (data?.['role'] === 'admin') {
    return true;
  }

  router.navigate(['/']);
  return false;
};