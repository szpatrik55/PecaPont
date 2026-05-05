import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import {
  Firestore,
  collection,
  query,
  orderBy,
  limit,
  collectionData
} from '@angular/fire/firestore';

import { Observable,  map } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { GalleryPost } from '../../models/gallery-post';

interface To {
  id: string;
  nev: string;
  telepules: string;
  kepUrl?: string;
  megtekintesek?: number;
}

interface NewsItem {
  id: string;
  cim: string;
  rovidLeiras: string;
  tartalom: string;
  letrehozva: any;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  private db = inject(Firestore);

  latestPosts$!: Observable<GalleryPost[]>;
  popularLakes$!: Observable<To[]>;
  latestNews$!: Observable<NewsItem[]>;

  ngOnInit() {

    this.latestPosts$ = collectionData(
        query(
        collection(this.db, 'gallery'),
        orderBy('createdAt', 'desc'),
        limit(4)
        ),
        { idField: 'id' }
      ).pipe(
      map(data => data as GalleryPost[]), // 👈 EZ A KULCS
      shareReplay(1)
    );

    this.popularLakes$ = collectionData(
      query(
        collection(this.db, 'lakes'),
        orderBy('megtekintesek', 'desc'),
        limit(3)
      ),
      { idField: 'id' }
    ).pipe( 
      map(data => data as To[]),
      shareReplay(1)
    );

    this.latestNews$ = collectionData(
        query(
        collection(this.db, 'news'),
        orderBy('letrehozva', 'desc'),
        limit(3)
      ),
      { idField: 'id' }
    ).pipe(
      map(data => data as NewsItem[]),
      shareReplay(1)
    );
  }
}