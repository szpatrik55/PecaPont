import {
  Component,
  inject,
  OnInit,
  NgZone,
  OnDestroy,
  HostListener
} from '@angular/core';
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
  selector: 'app-galeria',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './galeria.component.html',
  styleUrl: './galeria.component.scss'
})
export class GaleriaComponent implements OnInit, OnDestroy {

  private firestore = inject(Firestore);
  private zone = inject(NgZone);

  private postsSubject = new BehaviorSubject<GalleryPost[]>([]);
  posts$: Observable<GalleryPost[]> = this.postsSubject.asObservable();

  private unsubscribe: any;

  posts: GalleryPost[] = [];
  selectedPost: GalleryPost | null = null;
  currentIndex = 0;

  touchStartX = 0;

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
              imageUrl: data.imageUrl || '',
              createdAt: data.createdAt,
              username: data.username || 'Ismeretlen horgász',
              uid: data.uid || ''
            } as GalleryPost;
          });

          this.posts = posts;
          this.postsSubject.next(posts);
        });
      });
    });
  }

  ngOnDestroy(): void {
    if (this.unsubscribe) this.unsubscribe();
  }

  openPost(post: GalleryPost) {
    this.currentIndex = this.posts.findIndex(p => p.id === post.id);
    this.selectedPost = this.posts[this.currentIndex];
    document.body.style.overflow = 'hidden';
  }

  closePost() {
    this.selectedPost = null;
    document.body.style.overflow = 'auto';
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.posts.length;
    this.selectedPost = this.posts[this.currentIndex];
  }

  prev() {
    this.currentIndex =
      (this.currentIndex - 1 + this.posts.length) % this.posts.length;
    this.selectedPost = this.posts[this.currentIndex];
  }

  // 🔥 Keyboard navigation
  @HostListener('document:keydown', ['$event'])
  handleKey(event: KeyboardEvent) {
    if (!this.selectedPost) return;

    if (event.key === 'ArrowRight') this.next();
    if (event.key === 'ArrowLeft') this.prev();
    if (event.key === 'Escape') this.closePost();
  }

  // 📱 Swipe
  onTouchStart(e: TouchEvent) {
    this.touchStartX = e.touches[0].clientX;
  }

  onTouchEnd(e: TouchEvent) {
    const diff = e.changedTouches[0].clientX - this.touchStartX;

    if (Math.abs(diff) < 50) return;

    if (diff < 0) this.next();
    else this.prev();
  }
}