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

  async updateName(name: string) {

  const user = this.firebaseAuth.currentUser;
  if (!user) return;

  await updateProfile(user, {
    displayName: name
  });

  await updateDoc(doc(this.firestore, "users", user.uid), {
    name: name
  });

  alert("Név frissítve!");
  name = '';
}

  async changePassword(password: string) {

    const user = this.firebaseAuth.currentUser;
    if (!user) return;
    await updatePassword(user, password);
    alert("Jelszó sikeresen módosítva!");

  }

  async logout() {
    await this.auth.logout();
    this.router.navigate(['/']);
  }

}