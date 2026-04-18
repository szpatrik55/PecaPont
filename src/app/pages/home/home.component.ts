import { Component, inject } from '@angular/core';
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
import { Observable, shareReplay, catchError, of, map } from 'rxjs';
import { GalleryPost } from '../../models/gallery-post';

interface To {
  id: string;
  nev: string;
  telepules: string;
  kepUrl?: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  private firestore = inject(Firestore);

  latestPosts$: Observable<GalleryPost[]> = collectionData(
    query(
      collection(this.firestore, 'gallery'),
      orderBy('createdAt', 'desc'),
      limit(4)
    ),
    { idField: 'id' }
  ).pipe(
    map(data => data as GalleryPost[]),
    catchError(err => {
      console.error('Firestore hiba:', err);
      console.log('Firestore instance:', this.firestore);
      return of([]);
    }),
    shareReplay(1)
  );

  popularLakes$: Observable<To[]> = collectionData(
    query(
      collection(this.firestore, 'lakes'),
      orderBy('megtekintesek', 'desc'),
      limit(3)
    ),
    { idField: 'id' }
  ).pipe(
    map(data => data as To[]),
    catchError(() => of([])),
    shareReplay(1)
  );
}