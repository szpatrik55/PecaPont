import { Component } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { updateProfile, updatePassword } from 'firebase/auth';
import { Auth } from '@angular/fire/auth';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
@Component({
  standalone: true,
  imports: [AsyncPipe, NgIf],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.scss'
})
export class ProfilComponent {

  constructor(
    public auth: AuthService,
    private firebaseAuth: Auth,
    private firestore: Firestore,
    private router: Router,
  ) {}

  loading = false;

  async updateName(name: string) {
    if (!name || name.length < 3) {
      alert("A név legalább 3 karakter legyen!");
      return;
    }

    const user = this.firebaseAuth.currentUser;
    if (!user) return;

    this.loading = true;

    try {
      await updateProfile(user, { displayName: name });

      await updateDoc(doc(this.firestore, "users", user.uid), {
        name: name
      });

      alert("Név frissítve!");
    } catch (err) {
      console.error(err);
      alert("Hiba történt!");
    }

    this.loading = false;
  }

  async changePassword(password: string) {
    if (!password || password.length < 6) {
      alert("Minimum 6 karakter!");
      return;
    }

    const user = this.firebaseAuth.currentUser;
    if (!user) return;

    try {
      await updatePassword(user, password);
      alert("Jelszó módosítva!");
    } catch (err) {
      console.error(err);
      alert("Hiba történt!");
    }
  }

  async logout() {
    await this.auth.logout();
    this.router.navigate(['/']);
  }
}