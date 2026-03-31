import { Component, inject, signal } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import {
  Storage,
  ref,
  uploadBytes,
  getDownloadURL
} from '@angular/fire/storage';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  private firestore = inject(Firestore);
  private storage = inject(Storage);

  ujTo = {
    nev: '',
    telepules: '',
    kepUtvonal: '',
    kepUrl: '',
    terulet_ha: null as number | null,
    vizmelyseg: null as number | null,
    helyek_szama: null as number | null,
    tipus: '',
    ajanlott_modszerek: '',
    leiras: ''
  };

  mentesFolyamatban = signal(false);

  async kepFeltoltes(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];

    const fajlNev = `${Date.now()}-${file.name}`;
    const storagePath = `lakes/${fajlNev}`;

    try {
      this.mentesFolyamatban.set(true);

      const imageRef = ref(this.storage, storagePath);

      await uploadBytes(imageRef, file);

      const downloadUrl = await getDownloadURL(imageRef);

      this.ujTo.kepUtvonal = storagePath;
      this.ujTo.kepUrl = downloadUrl;
    } catch (error) {
      console.error('Kép feltöltési hiba:', error);
      alert('Nem sikerült a kép feltöltése');
    } finally {
      this.mentesFolyamatban.set(false);
    }
  }

  async toHozzaadasa(): Promise<void> {
    if (!this.ujTo.nev || !this.ujTo.telepules) {
      alert('A név és a település kötelező!');
      return;
    }

    if (!this.ujTo.kepUrl) {
      alert('Kérlek tölts fel egy képet!');
      return;
    }

    this.mentesFolyamatban.set(true);

    try {
      const colRef = collection(this.firestore, 'lakes');

      const mentesreVaroAdat = {
        ...this.ujTo,
        ajanlott_modszerek: this.ujTo.ajanlott_modszerek
          ? this.ujTo.ajanlott_modszerek
              .split(',')
              .map((m) => m.trim())
          : []
      };

      await addDoc(colRef, mentesreVaroAdat);

      alert('Sikeres mentés!');

      this.ujTo = {
        nev: '',
        telepules: '',
        kepUtvonal: '',
        kepUrl: '',
        terulet_ha: null,
        vizmelyseg: null,
        helyek_szama: null,
        tipus: '',
        ajanlott_modszerek: '',
        leiras: ''
      };
    } catch (error) {
      console.error('Mentési hiba:', error);
      alert('Hiba történt a mentés során!');
    } finally {
      this.mentesFolyamatban.set(false);
    }
  }
}