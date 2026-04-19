import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable, shareReplay } from 'rxjs';

// KIZÁRÓLAG a sima firebase csomagból importálunk a konzisztencia miatt
import { initializeApp, getApp, getApps } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  query, 
  orderBy, 
  limit, 
  onSnapshot,
  Firestore 
} from 'firebase/firestore';

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
  private db!: Firestore;
  
  latestPosts$: Observable<GalleryPost[]> | undefined;
  popularLakes$: Observable<To[]> | undefined;
  latestNews$: Observable<NewsItem[]> | undefined; // Új Observable a híreknek

  private firebaseConfig = {
    apiKey: "AIzaSyB7k-N4xhzNaPt2pZc48kd4aAeyoLWKs_o",
    authDomain: "pecapont-50489.firebaseapp.com",
    projectId: "pecapont-50489",
    storageBucket: "pecapont-50489.firebasestorage.app",
    messagingSenderId: "1029335197913",
    appId: "1:1029335197913:web:f84de64072a44a2d0eb6c8",
    measurementId: "G-KYYVJJTTSN"
  };

  ngOnInit() {
    const app = !getApps().length ? initializeApp(this.firebaseConfig) : getApp();
    this.db = getFirestore(app);

    // 1. Legfrissebb fogások lekérése (4 db)
    this.latestPosts$ = new Observable<GalleryPost[]>(subscriber => {
      const q = query(
        collection(this.db, 'gallery'),
        orderBy('createdAt', 'desc'),
        limit(4)
      );
      
      return onSnapshot(q, (snapshot) => {
        const posts = snapshot.docs.map(doc => ({ 
          id: doc.id, 
          ...doc.data() 
        } as GalleryPost));
        subscriber.next(posts);
      }, (err) => subscriber.error(err));
    }).pipe(shareReplay(1));

    // 2. Népszerű tavak lekérése (3 db)
    this.popularLakes$ = new Observable<To[]>(subscriber => {
      const q = query(
        collection(this.db, 'lakes'),
        orderBy('megtekintesek', 'desc'),
        limit(3)
      );

      return onSnapshot(q, (snapshot) => {
        const lakes = snapshot.docs.map(doc => ({ 
          id: doc.id, 
          ...doc.data() 
        } as To));
        subscriber.next(lakes);
      }, (err) => subscriber.error(err));
    }).pipe(shareReplay(1));

    // 3. Friss hírek lekérése (3 db)
    this.latestNews$ = new Observable<NewsItem[]>(subscriber => {
      const q = query(
        collection(this.db, 'news'),
        orderBy('letrehozva', 'desc'),
        limit(3)
      );

      return onSnapshot(q, (snapshot) => {
        const news = snapshot.docs.map(doc => ({ 
          id: doc.id, 
          ...doc.data() 
        } as NewsItem));
        subscriber.next(news);
      }, (err) => subscriber.error(err));
    }).pipe(shareReplay(1));
  }
}