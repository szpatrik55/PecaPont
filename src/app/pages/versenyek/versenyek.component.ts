import {
  Component,
  OnInit,
  inject,
  signal,
  computed
} from '@angular/core';

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
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './versenyek.component.html',
  styleUrls: ['./versenyek.component.scss']
})
export class VersenyekComponent implements OnInit {

  private firestore = inject(Firestore);

  allEvents = signal<EventItem[]>([]);

  searchTerm = signal('');

  calendarDays: any[] = [];

  currentDate = new Date();

  get currentMonthLabel(): string {

    return this.currentDate.toLocaleDateString('hu-HU', {
      year: 'numeric',
      month: 'long'
    });
  }

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

      this.generateCalendar();

    } catch (error) {

      console.error('Firebase hiba:', error);
    }
  }

  previousMonth(): void {

    this.currentDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() - 1,
      1
    );

    this.generateCalendar();
  }

  nextMonth(): void {

    this.currentDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + 1,
      1
    );

    this.generateCalendar();
  }

  generateCalendar(): void {

    const year = this.currentDate.getFullYear();

    const month = this.currentDate.getMonth();

    const firstDay = new Date(year, month, 1);

    const lastDay = new Date(year, month + 1, 0);

    const startDay =
      (firstDay.getDay() + 6) % 7;

    const totalDays = lastDay.getDate();

    const days = [];

    for (let i = 0; i < startDay; i++) {

      days.push({

        day: '',

        currentMonth: false,

        hasEvent: false,

        isToday: false,

        eventName: ''
      });
    }

    for (let day = 1; day <= totalDays; day++) {

      const current = new Date(year, month, day);

      const iso =
        current.toISOString().split('T')[0];

      const event = this.allEvents().find(
        e => e.datum === iso
      );

      const todayIso =
        new Date().toISOString().split('T')[0];

      days.push({

        day,

        currentMonth: true,

        hasEvent: !!event,

        eventName: event?.nev || '',

        isToday: iso === todayIso
      });
    }

    this.calendarDays = days;
  }
}