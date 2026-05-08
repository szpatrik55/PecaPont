import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import {
  Firestore,
  collection,
  getDocs,
  query,
  orderBy,
  where,
  Timestamp
} from '@angular/fire/firestore';

interface EventItem {
  id: string;

  nev: string;
  rovidLeiras: string;
  leiras: string;

  helyszin: string;
  datum: string;

  kepUrl?: string;

  letrehozva: Timestamp;
}

@Component({
  selector: 'app-versenyek',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './versenyek.component.html',
  styleUrls: ['./versenyek.component.scss']
})
export class VersenyekComponent implements OnInit {

  private firestore = inject(Firestore);

  allEvents = signal<EventItem[]>([]);

  searchTerm = signal('');

  filteredEvents = computed(() => {

    const search = this.searchTerm().toLowerCase();

    const today = new Date()
      .toISOString()
      .split('T')[0];

    return this.allEvents().filter(event => {

      const megfelelKeresesnek =

        event.nev.toLowerCase().includes(search) ||
        event.helyszin.toLowerCase().includes(search);

      const nemJartLe =
        event.datum >= today;

      return megfelelKeresesnek && nemJartLe;
    });
  });

  async ngOnInit(): Promise<void> {

    try {

      const colRef = collection(this.firestore, 'events');

      const today = new Date()
        .toISOString()
        .split('T')[0];

      const q = query(
        colRef,
        where('datum', '>=', today),
        orderBy('datum', 'asc')
      );

      const snapshot = await getDocs(q);

      const adatok: EventItem[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as any)
      }));

      this.allEvents.set(adatok);

    } catch (error) {

      console.error('Firebase hiba:', error);
    }
  }
}