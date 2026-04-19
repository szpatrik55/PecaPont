import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef } from '@angular/core'; // Beimportáljuk a ChangeDetectorRef-et
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-bejelentkezes',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './bejelentkezes.component.html',
  styleUrl: './bejelentkezes.component.scss'
})
export class BejelentkezesComponent {
  email = '';
  password = '';
  errorMessage = '';
  isLoading = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef // Injectáljuk a detektort
  ) {}

  onInputChange() {
    this.errorMessage = '';
    this.cdr.detectChanges(); // Manuális frissítés
  }

  async login() {
  if (!this.email || !this.password) {
    this.errorMessage = 'Kérjük, töltse ki az összes mezőt!';
    return;
  }

  this.isLoading = true;
  this.errorMessage = '';
  this.cdr.detectChanges();

  try {
    await this.auth.login(this.email, this.password);
    this.router.navigate(['/']);
  } catch (error: any) {
    console.error('Firebase hiba kódja:', error.code);

    // Itt történik a magyarosítás a hibakód alapján
    switch (error.code) {
      case 'auth/invalid-email':
        this.errorMessage = 'A megadott email cím formátuma érvénytelen!';
        break;
      case 'auth/user-disabled':
        this.errorMessage = 'Ez a felhasználói fiók fel van függesztve!';
        break;
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        // A modern Firebase biztonsági okokból ugyanazt adja vissza mindháromra
        this.errorMessage = 'Hibás email cím vagy jelszó!';
        break;
      case 'auth/too-many-requests':
        this.errorMessage = 'Túl sok sikertelen próbálkozás. Kérjük, várjon pár percet!';
        break;
      case 'auth/network-request-failed':
        this.errorMessage = 'Hálózati hiba történt. Ellenőrizze az internetkapcsolatot!';
        break;
      default:
        this.errorMessage = 'Váratlan hiba történt a bejelentkezés során!';
        break;
    }
  } finally {
    this.isLoading = false;
    this.cdr.detectChanges();
  }
}

  async google() {
    this.isLoading = true;
    this.cdr.detectChanges();
    try {
      await this.auth.googleLogin();
      this.router.navigate(['/']);
    } catch (error) {
      this.errorMessage = 'Sikertelen Google bejelentkezés!';
    } finally {
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  }
}