import {
  Component,
  OnInit,
  inject,
  signal,
  computed
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  Firestore,
  collection,
  getDocs,
  query,
  orderBy,
  where
} from '@angular/fire/firestore';

import { RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';

import {
  EventCategory,
  EVENT_CATEGORIES
} from '../../config/verseny-kategoriak';

import { EventItem } from '../../models/event';

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

  selectedCategory =
    signal<EventCategory | ''>('');

  selectedDate = signal('');

  calendarDays: any[] = [];

  currentDate = new Date();

  categories = EVENT_CATEGORIES;

  get currentMonthLabel(): string {

    return this.currentDate.toLocaleDateString(
      'hu-HU',
      {
        year: 'numeric',
        month: 'long'
      }
    );
  }

  filteredEvents = computed(() => {

    const search =
      this.searchTerm().toLowerCase();

    const category =
      this.selectedCategory();

    const selectedDate =
      this.selectedDate();

    return this.allEvents().filter(event => {

      const searchMatch =

        event.nev
          .toLowerCase()
          .includes(search)

        ||

        event.helyszin
          .toLowerCase()
          .includes(search);

      const categoryMatch =

        !category ||

        event.kategoria === category;

      const dateMatch =

        !selectedDate ||

        event.datum === selectedDate;

      return (
        searchMatch &&
        categoryMatch &&
        dateMatch
      );
    });
  });

  async ngOnInit(): Promise<void> {

    try {

      const colRef =
        collection(this.firestore, 'events');

      const today =
        new Date()
          .toISOString()
          .split('T')[0];

      const q = query(
        colRef,
        where('datum', '>=', today),
        orderBy('datum', 'asc')
      );

      const snapshot =
        await getDocs(q);

      const data: EventItem[] =
        snapshot.docs.map(doc => ({

          id: doc.id,

          ...(doc.data() as Omit<EventItem, 'id'>)

        }));

      this.allEvents.set(data);

      this.generateCalendar();

    } catch (error) {

      console.error(error);
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

  selectDate(date: string): void {

    if (!date) return;

    if (this.selectedDate() === date) {

      this.selectedDate.set('');

      return;
    }

    this.selectedDate.set(date);
  }

  generateCalendar(): void {

    const year =
      this.currentDate.getFullYear();

    const month =
      this.currentDate.getMonth();

    const firstDay =
      new Date(year, month, 1);

    const lastDay =
      new Date(year, month + 1, 0);

    const startDay =
      (firstDay.getDay() + 6) % 7;

    const totalDays =
      lastDay.getDate();

    const eventMap = new Map<
      string,
      EventItem[]
    >();

    this.allEvents().forEach(event => {

      const arr =
        eventMap.get(event.datum) || [];

      arr.push(event);

      eventMap.set(event.datum, arr);
    });

    const days = [];

    for (let i = 0; i < startDay; i++) {

      days.push({

        day: '',

        currentMonth: false,

        isToday: false,

        iso: '',

        eventCount: 0
      });
    }

    for (
      let day = 1;
      day <= totalDays;
      day++
    ) {

      const current =
        new Date(year, month, day);

      const iso =
        current
          .toISOString()
          .split('T')[0];

      const events =
        eventMap.get(iso) || [];

      const todayIso =
        new Date()
          .toISOString()
          .split('T')[0];

      days.push({

        day,

        currentMonth: true,

        iso,

        isToday:
          iso === todayIso,

        eventCount:
          events.length
      });
    }

    this.calendarDays = days;
  }
}