import { Component, inject, signal } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})

export class AdminComponent {
  private firestore = inject(Firestore);

  ujTo = {
    nev: '',
    telepules: '',
    terulet_ha: null,
    vizmelyseg: null,
    helyek_szama: null,
    tipus: '',
    ajanlott_modszerek: '',
    leiras: ''
  };

  mentesFolyamatban = signal(false);

  async toHozzaadasa() {
    if (!this.ujTo.nev || !this.ujTo.telepules) {
      alert('A név és a település kötelező!');
      return;
    }

    this.mentesFolyamatban.set(true);
    try {
      const colRef = collection(this.firestore, 'lakes');
      
      const mentesreVaroAdat = {
        ...this.ujTo,
        ajanlott_modszerek: this.ujTo.ajanlott_modszerek 
          ? this.ujTo.ajanlott_modszerek.split(',').map(m => m.trim()) 
          : []
      };

      await addDoc(colRef, mentesreVaroAdat);
      alert('Sikeres mentés!');
      
      this.ujTo = { nev: '', telepules: '', terulet_ha: null, vizmelyseg: null, helyek_szama: null, tipus: '', ajanlott_modszerek: '', leiras: '' };
    } catch (error) {
      console.error(error);
      alert('Hiba történt!');
    } finally {
      this.mentesFolyamatban.set(false);
    }
  }
}