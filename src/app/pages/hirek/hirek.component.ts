import {
  Component,
  inject,
  OnInit,
  OnDestroy,
  signal,
  computed
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import {
  Firestore,
  collection,
  query,
  orderBy,
  Timestamp,
  onSnapshot
} from '@angular/fire/firestore';

interface NewsItem {

  id: string;

  cim: string;

  rovidLeiras: string;

  tartalom: string;

  kepUrl?: string;

  letrehozva: Timestamp;
}

@Component({
  selector: 'app-hirek',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './hirek.component.html',
  styleUrls: ['./hirek.component.scss']
})
export class HirekComponent
implements OnInit, OnDestroy {

  private firestore = inject(Firestore);

  private unsubscribe?: () => void;

  allNews = signal<NewsItem[]>([]);

  searchTerm = signal('');

  selectedFilter =
    signal<'all' | 'latest' | 'popular'>('all');

  currentMonthCount = 0;

  filteredNews = computed(() => {

    const search =
      this.searchTerm().toLowerCase();

    const filter =
      this.selectedFilter();

    let news =
      this.allNews();

    if (filter === 'latest') {

      news = [...news].slice(0, 5);
    }

    if (filter === 'popular') {

      news = [...news].slice(0, 3);
    }

    return news.filter(item =>

      item.cim
        ?.toLowerCase()
        .includes(search)

      ||

      item.rovidLeiras
        ?.toLowerCase()
        .includes(search)
    );
  });

  ngOnInit(): void {

    try {

      const colRef =
        collection(this.firestore, 'news');

      const q = query(
        colRef,
        orderBy('letrehozva', 'desc')
      );

      this.unsubscribe = onSnapshot(q, snapshot => {

        const data: NewsItem[] =
          snapshot.docs.map(doc => ({

            id: doc.id,

            ...(doc.data() as any)
          }));

        this.allNews.set(data);

        this.calculateCurrentMonth();
      });

    } catch (error) {

      console.error(
        'Firebase hiba a híreknél:',
        error
      );
    }
  }

  ngOnDestroy(): void {

    if (this.unsubscribe) {

      this.unsubscribe();
    }
  }

  calculateCurrentMonth(): void {

    const now = new Date();

    this.currentMonthCount =
      this.allNews().filter(item => {

        if (!item.letrehozva) {

          return false;
        }

        const date =
          item.letrehozva.toDate();

        return (

          date.getMonth() ===
          now.getMonth()

          &&

          date.getFullYear() ===
          now.getFullYear()
        );

      }).length;
  }

}