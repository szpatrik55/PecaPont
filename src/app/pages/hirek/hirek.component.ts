import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Firestore,
  collection,
  collectionData,
  query,
  orderBy
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface NewsItem {
  id?: string;
  cim: string;
  rovidLeiras: string;
  tartalom: string;
  kepUrl?: string;
  letrehozva: any;
}

@Component({
  selector: 'app-hirek',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hirek.component.html',
  styleUrl: './hirek.component.scss'
})
export class HirekComponent {
  private firestore = inject(Firestore);

  news$: Observable<NewsItem[]>;

  constructor() {
    const newsRef = collection(this.firestore, 'news');

    const newsQuery = query(
      newsRef,
      orderBy('letrehozva', 'desc')
    );

    this.news$ = collectionData(newsQuery, {
      idField: 'id'
    }) as Observable<NewsItem[]>;
  }
}
