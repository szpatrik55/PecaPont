import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth, authState } from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore'; // getDoc-ot használunk docData helyett
import { map, of, switchMap, from, catchError } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  private auth = inject(Auth);
  private firestore = inject(Firestore);
  private router = inject(Router);

  menuOpen = false;
  user$ = authState(this.auth);

  isAdmin$ = this.user$.pipe(
    switchMap(user => {
      if (!user) return of(false);

      // Létrehozzuk a referenciát
      const userDocRef = doc(this.firestore, 'users', user.uid);

      // A 'from' segítségével a Promise-t (getDoc) Observable-lé alakítjuk
      // Ez kikerüli az angular-fire docData típus-hibáját
      return from(getDoc(userDocRef)).pipe(
        map(snapshot => {
          if (snapshot.exists()) {
            const data = snapshot.data();
            console.log('Felhasználó adatai:', data);
            return data?.['role'] === 'admin';
          }
          return false;
        }),
        catchError(err => {
          console.error('Firestore hiba:', err);
          return of(false);
        })
      );
    })
  );

  async logout() {
    await this.auth.signOut();
    this.menuOpen = false;
    this.router.navigate(['/']);
  }
}