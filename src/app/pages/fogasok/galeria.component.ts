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

  private postsSubject = new BehaviorSubject<GalleryPost[]>([]);
  posts$: Observable<GalleryPost[]> = this.postsSubject.asObservable();

  private unsubscribe: any;

  selectedPost: GalleryPost | null = null;

  ngOnInit(): void {
    this.zone.runOutsideAngular(() => {
      const colRef = collection(this.firestore, 'gallery');
      const q = query(colRef, orderBy('createdAt', 'desc'));

      this.unsubscribe = onSnapshot(q, (snapshot) => {
        this.zone.run(() => {
          const posts = snapshot.docs.map(doc => {
            const data: any = doc.data();

            return {
              id: doc.id,
              title: data.title || '',
              description: data.description || '',
              water: data.water || '',
              fishGroup: data.fishGroup || '',
              species: data.species || '',
              weight: data.weight ?? null,
              length: data.length ?? null,
              bait: data.bait || '',
              method: data.method || '',
              timeOfDay: data.timeOfDay || '',
              released: data.released || false,
              imageUrl: data.imageUrl || '',
              createdAt: data.createdAt,

              uid: data.uid || ''
            } as GalleryPost;
          });

          this.postsSubject.next(posts);
        });
      });
    });
  }

  ngOnDestroy(): void {
    if (this.unsubscribe) this.unsubscribe();
  }

  openPost(post: GalleryPost) {
    this.selectedPost = post;
    document.body.style.overflow = 'hidden';
  }

  closePost() {
    this.selectedPost = null;
    document.body.style.overflow = 'auto';
  }
}