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
  role: 'user' | 'admin';
  name?: string | null;
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

  constructor(
    private auth: Auth,
    private firestore: Firestore
  ) {

    // Firebase auth user
    this.user$ = authState(this.auth);

    // Firestore user document
    this.appUser$ = this.user$.pipe(
  switchMap(user => {
    if (!user) return of(null);

    const ref = doc(this.firestore, `users/${user.uid}`);

    return docData(ref, { idField: 'uid' }).pipe(
      map((data: any) => {
        console.log('🔥 FIRESTORE USER:', data);

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

    // Role
    this.userRole$ = this.appUser$.pipe(
      map(user => user?.role ?? null)
    );

    // Admin check
    this.isAdmin$ = this.userRole$.pipe(
      map(role => role === 'admin')
    );
  }

  // =========================
  // REGISTER
  // =========================
  async register(email: string, password: string) {

    const cred = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );

    await setDoc(doc(this.firestore, 'users', cred.user.uid), {
      uid: cred.user.uid,
      email: cred.user.email,
      role: 'user',
      createdAt: new Date()
    });
  }

  // =========================
  // LOGIN
  // =========================
  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  // =========================
  // GOOGLE LOGIN
  // =========================
  async googleLogin() {

    const provider = new GoogleAuthProvider();

    const result = await signInWithPopup(this.auth, provider);

    await setDoc(doc(this.firestore, 'users', result.user.uid), {
      uid: result.user.uid,
      email: result.user.email,
      name: result.user.displayName,
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