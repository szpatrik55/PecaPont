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
  selector: 'app-tohozzaad',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './to-hozzaad.component.html',
  styleUrls: ['./to-hozzaad.component.scss']
})
export class ToHozzaadComponent {
  private firestore = inject(Firestore);
  private storage = inject(Storage);

  private getAlapTo() {
    return {
      nev: '',
      telepules: '',
      kepUtvonal: '',
      kepUrl: '',

      terulet_ha: null as number | null,
      vizmelyseg: null as number | null,
      helyek_szama: null as number | null,
      tipus: '',

      sport_napijegy_ar: null as number | null,
      cim: '',

      halfajok: '',
      szabalyok: '',

      ejszakai_horgaszat: false,
      csonak_hasznalat: false,

      ajanlott_modszerek: '',
      leiras: '',

      megtekintesek: 0,
      letrehozva: new Date()
    };
  }

  ujTo = this.getAlapTo();

  mentesFolyamatban = signal(false);

  async kepFeltoltes(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;

    if (!input.files?.length) return;

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

  // ✅ EZ LETT ÁTNEVEZVE
  async toHozzaad(): Promise<void> {
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

        halfajok: this.ujTo.halfajok
          ? this.ujTo.halfajok.split(',').map(f => f.trim())
          : [],

        szabalyok: this.ujTo.szabalyok
          ? this.ujTo.szabalyok.split(',').map(s => s.trim())
          : [],

        ajanlott_modszerek: this.ujTo.ajanlott_modszerek
          ? this.ujTo.ajanlott_modszerek.split(',').map(m => m.trim())
          : []
      };

      await addDoc(colRef, mentesreVaroAdat);

      alert('Sikeres mentés!');
      this.ujTo = this.getAlapTo();

    } catch (error) {
      console.error(error);
      alert('Hiba történt');
    } finally {
      this.mentesFolyamatban.set(false);
    }
  }
}