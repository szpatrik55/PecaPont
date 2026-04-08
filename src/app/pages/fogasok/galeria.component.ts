import { Component, inject, OnInit, NgZone, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Firestore,
  collection,
  query,
  orderBy,
  onSnapshot
} from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { GalleryPost } from '../../models/gallery-post';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './galeria.component.html',
  styleUrl: './galeria.component.scss'
})
export class GalleryComponent implements OnInit, OnDestroy {
  private firestore = inject(Firestore);
  private zone = inject(NgZone);
  
  // BehaviorSubject-et használunk, hogy manuálisan toljuk be az adatokat
  private postsSubject = new BehaviorSubject<GalleryPost[]>([]);
  posts$: Observable<GalleryPost[]> = this.postsSubject.asObservable();
  
  private unsubscribe: any;

  ngOnInit(): void {
    // Közvetlen Firebase SDK hívás a zónán belül
    this.zone.runOutsideAngular(() => {
      const colRef = collection(this.firestore, 'gallery');
      const q = query(colRef, orderBy('createdAt', 'desc'));

      this.unsubscribe = onSnapshot(q, 
        (snapshot) => {
          this.zone.run(() => {
            const posts = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            })) as GalleryPost[];
            this.postsSubject.next(posts);
          });
        },
        (error) => {
          console.error("Firestore hiba:", error);
        }
      );
    });
  }

  ngOnDestroy(): void {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
}