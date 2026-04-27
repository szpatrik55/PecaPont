import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  authState,
  User
} from '@angular/fire/auth';

import {
  Firestore,
  doc,
  setDoc,
  getDoc,
  docData,
  updateDoc,
  serverTimestamp
} from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

export interface AppUser {
  uid: string;
  email: string | null;
  role: 'user' | 'admin' | 'news';
  displayName?: string | null;
  username?: string | null;
  photo?: string | null;
  createdAt?: any;
  lastLoginAt?: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User | null>;
  appUser$: Observable<AppUser | null>;
  isAdmin$: Observable<boolean>;
  userRole$: Observable<string | null>;
  isEditor$: Observable<boolean>;

  constructor(
    private auth: Auth,
    private firestore: Firestore,
  ) {
    // Aktuális Firebase auth állapot figyelése
    this.user$ = authState(this.auth);

    // Felhasználói dokumentum lekérése a Firestore-ból az Auth állapot alapján
    this.appUser$ = this.user$.pipe(
      switchMap(user => {
        if (!user) return of(null);

        const ref = doc(this.firestore, `users/${user.uid}`);

        return docData(ref, { idField: 'uid' }).pipe(
          map((data: any) => {
            if (!data) {
              return {
                uid: user.uid,
                email: user.email,
                role: 'user'
              } as AppUser;
            }
            return data as AppUser;
          })
        );
      })
    );

    // Jogkörök kezelése
    this.userRole$ = this.appUser$.pipe(
      map(user => user?.role ?? null)
    );

    this.isAdmin$ = this.userRole$.pipe(
      map(role => role === 'admin')
    );

    this.isEditor$ = this.userRole$.pipe(
      map(role => role === 'admin' || role === 'news')
    );
  }

  // =========================
  // REGISTER (Módosítva a névvel és felhasználónévvel)
  // =========================
  async register(email: string, password: string, displayName: string, username: string) {
    const cred = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );

    await setDoc(doc(this.firestore, 'users', cred.user.uid), {
      uid: cred.user.uid,
      email: cred.user.email,
      displayName,
      username,
      role: 'user',

      // 🔥 JAVÍTÁSOK
      createdAt: serverTimestamp(),
      lastLoginAt: serverTimestamp()
    });
  }

  // =========================
  // LOGIN
  // =========================
  async login(email: string, password: string) {
  const cred = await signInWithEmailAndPassword(this.auth, email, password);

  // 🔥 EZ KELL
  await cred.user.getIdToken(true);

  try {
    await updateDoc(doc(this.firestore, 'users', cred.user.uid), {
      lastLoginAt: serverTimestamp()
    });
  } catch (e) {
    console.warn('lastLoginAt update failed', e);
  }

  return cred;
}

  // =========================
  // GOOGLE LOGIN
  // =========================
  async googleLogin() {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(this.auth, provider);

  const userRef = doc(this.firestore, 'users', result.user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      uid: result.user.uid,
      email: result.user.email,
      displayName: result.user.displayName,
      photo: result.user.photoURL,
      role: 'user',
      createdAt: serverTimestamp(),
      lastLoginAt: serverTimestamp()
    });
  } else {
    await updateDoc(userRef, {
      lastLoginAt: serverTimestamp()
    });
  }

  // 🔥 EZ HIÁNYZIK
  await result.user.getIdToken(true);

  return result;
}

  // =========================
  // LOGOUT
  // =========================
  logout() {
    return signOut(this.auth);
  }
}