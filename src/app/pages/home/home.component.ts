import { Component, inject, OnInit, NgZone, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  Firestore,
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
  getDocs
} from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
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
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  private firestore = inject(Firestore);
  private zone = inject(NgZone);

  private latestPostsSubject = new BehaviorSubject<GalleryPost[]>([]);
  latestPosts$: Observable<GalleryPost[]> =
    this.latestPostsSubject.asObservable();

  popularLakes: To[] = [];

  private unsubscribe: any;

  async ngOnInit(): Promise<void> {
    this.loadPopularLakes();

    this.zone.runOutsideAngular(() => {
      const colRef = collection(this.firestore, 'gallery');

      const q = query(
        colRef,
        orderBy('createdAt', 'desc'),
        limit(4)
      );

      this.unsubscribe = onSnapshot(q, (snapshot) => {
        this.zone.run(() => {
          const posts = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as GalleryPost[];

          this.latestPostsSubject.next(posts);
        });
      });
    });
  }

  async loadPopularLakes() {
  const colRef = collection(this.firestore, 'lakes');

  const q = query(
    colRef,
    orderBy('megtekintesek', 'desc'),
    limit(3)
  );

  const snapshot = await getDocs(q);

  this.popularLakes = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as To[];
}

  ngOnDestroy(): void {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
}