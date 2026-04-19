import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-regisztracio',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './regisztracio.component.html',
  styleUrl: './regisztracio.component.scss'
})
export class RegisztracioComponent {
  email = '';
  password = '';
  displayName = '';    // Teljes név
  username = '';       // Felhasználónév
  
  errorMessage = '';
  isLoading = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  onInputChange() {
    if (this.errorMessage) {
      this.errorMessage = '';
      this.cdr.detectChanges();
    }
  }

  async register() {
    // 1. Üres mezők ellenőrzése
    if (!this.email || !this.password || !this.displayName || !this.username) {
      this.errorMessage = 'Kérjük, tölts ki minden mezőt!';
      return;
    }

    // 2. Jelszó komplexitás ellenőrzése (Regex)
    // Elvárás: min 8 karakter, legalább egy nagybetű, egy kisbetű és egy szám
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!passwordRegex.test(this.password)) {
      this.errorMessage = 'A jelszónak legalább 8 karakternek kell lennie, tartalmaznia kell kisbetűt, nagybetűt és számot!';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.cdr.detectChanges();

    try {
      // Átadjuk az adatokat a service-nek (Auth + Firestore mentés)
      await this.auth.register(this.email, this.password, this.displayName, this.username);
      console.log('Sikeres regisztráció!');
      this.router.navigate(['/']);
    } catch (error: any) {
      console.error('Regisztrációs hiba:', error.code);
      
      // Hibakódok magyarítása
      switch (error.code) {
        case 'auth/email-already-in-use':
          this.errorMessage = 'Ez az email cím már használatban van!';
          break;
        case 'auth/invalid-email':
          this.errorMessage = 'Érvénytelen email cím formátum!';
          break;
        case 'auth/weak-password':
          this.errorMessage = 'A megadott jelszó túl gyenge!';
          break;
        case 'auth/network-request-failed':
          this.errorMessage = 'Nincs internetkapcsolat!';
          break;
        default:
          this.errorMessage = 'Váratlan hiba történt a regisztráció során!';
      }
    } finally {
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  }
}