import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, shareReplay } from 'rxjs';

// KIZÁRÓLAG a sima firebase csomagból importálunk mindent a Firestore-hoz
import { initializeApp, getApp, getApps } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  Timestamp,
  Firestore 
} from 'firebase/firestore';

export interface NewsItem {
  id?: string;
  cim: string;
  rovidLeiras: string;
  tartalom: string;
  kepUrl?: string;
  letrehozva: Timestamp;
}

@Component({
  selector: 'app-hirek',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hirek.component.html',
  styleUrl: './hirek.component.scss'
})
export class HirekComponent implements OnInit {
  // Nem használunk inject(Firestore)-t!
  private db!: Firestore;
  news$: Observable<NewsItem[]> | undefined;

  // Használd a saját configodat (ugyanaz, ami az appConfig-ban van)
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
    // 1. Inicializálás kézzel, hogy ugyanazt az SDK-t használjuk
    const app = !getApps().length ? initializeApp(this.firebaseConfig) : getApp();
    this.db = getFirestore(app);

    // 2. Az Observable összeállítása
    this.news$ = new Observable<NewsItem[]>(subscriber => {
      // Itt a 'this.db' garantáltan kompatibilis a collection() függvénnyel
      const q = query(
        collection(this.db, 'news'),
        orderBy('letrehozva', 'desc')
      );

      return onSnapshot(q, 
        (snapshot) => {
          const items = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          } as NewsItem));
          subscriber.next(items);
        },
        (error) => {
          console.error('Firestore hiba:', error);
          subscriber.error(error);
        }
      );
    }).pipe(
      shareReplay(1)
    );
  }
}