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
  docData
} from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

export interface AppUser {
  uid: string;
  email: string | null;
  role: 'user' | 'admin' | 'news';
  displayName?: string | null; // A teljes névnek
  username?: string | null;    // A felhasználónévnek
  photo?: string | null;
  createdAt?: any;
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
    private firestore: Firestore
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
    // 1. Létrehozzuk a fiókot az Auth modulban
    const cred = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );

    // 2. Elmentjük a kiegészítő adatokat a Firestore-ba
    await setDoc(doc(this.firestore, 'users', cred.user.uid), {
      uid: cred.user.uid,
      email: cred.user.email,
      displayName: displayName,
      username: username,
      role: 'user',
      createdAt: new Date()
    });
  }

  // =========================
  // LOGIN
  // =========================
  login(email: string, password: string) {
    // Közvetlenül visszaadjuk a Promise-t, hogy a komponens el tudja kapni a hibát
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  // =========================
  // GOOGLE LOGIN
  // =========================
  async googleLogin() {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(this.auth, provider);

    // Google login esetén frissítjük vagy létrehozzuk a profilt (merge: true)
    await setDoc(doc(this.firestore, 'users', result.user.uid), {
      uid: result.user.uid,
      email: result.user.email,
      displayName: result.user.displayName,
      photo: result.user.photoURL,
      role: 'user'
    }, { merge: true });
  }

  // =========================
  // LOGOUT
  // =========================
  logout() {
    return signOut(this.auth);
  }
}