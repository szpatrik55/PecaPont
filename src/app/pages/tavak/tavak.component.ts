import {
  Component,
  inject,
  OnInit,
  signal,
  computed
} from '@angular/core';
import {
  Firestore,
  collection,
  getDocs
} from '@angular/fire/firestore';
import {
  doc,
  updateDoc,
  increment
} from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface To {
  id: string;
  nev: string;
  telepules: string;
  kepUtvonal: string;
  kepUrl?: string;
}

@Component({
  selector: 'app-to-lista',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './tavak.component.html',
  styleUrls: ['./tavak.component.scss']
})
export class ToListaComponent implements OnInit {
  private firestore = inject(Firestore);

  tavak = signal<To[]>([]);

  keresoSzoveg = signal('');
  rendezes = signal<'nev' | 'telepules'>('nev');

  rendezettTavak = computed(() => {
    const keresett = this.keresoSzoveg().toLowerCase();

    return [...this.tavak()]
      .filter(
        (to) =>
          to.nev.toLowerCase().includes(keresett) ||
          to.telepules.toLowerCase().includes(keresett)
      )
      .sort((a, b) =>
        a[this.rendezes()].localeCompare(
          b[this.rendezes()]
        )
      );
  });

  async ngOnInit(): Promise<void> {
    try {
      const colRef = collection(this.firestore, 'lakes');
      const snapshot = await getDocs(colRef);

      const adatok: To[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<To, 'id'>)
      }));

      this.tavak.set(adatok);
    } catch (error) {
      console.error('Firebase hiba:', error);
    }
  }

  async novelMegtekintes(toId: string) {
  const lakeRef = doc(this.firestore, 'lakes', toId);

  await updateDoc(lakeRef, {
    megtekintesek: increment(1)
  });
}
}