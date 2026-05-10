import {
  Component,
  inject,
  OnInit,
  NgZone,
  OnDestroy,
  HostListener,
  signal,
  computed
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  Firestore,
  collection,
  query,
  orderBy,
  onSnapshot
} from '@angular/fire/firestore';

import {
  BehaviorSubject,
  Observable
} from 'rxjs';

import { FormsModule } from '@angular/forms';

import {
  GalleryPost
} from '../../models/gallery-post';

@Component({
  selector: 'app-galeria',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './galeria.component.html',
  styleUrl: './galeria.component.scss'
})
export class GaleriaComponent
implements OnInit, OnDestroy {

  private firestore =
    inject(Firestore);

  private zone =
    inject(NgZone);

  private postsSubject =
    new BehaviorSubject<
      GalleryPost[]
    >([]);

  posts$:
    Observable<GalleryPost[]>
      =
    this.postsSubject.asObservable();

  private unsubscribe: any;

  /* SIGNAL */
  posts =
    signal<GalleryPost[]>([]);

  selectedPost:
    GalleryPost | null = null;

  currentIndex = 0;

  touchStartX = 0;

  /* FILTERS */
  searchTerm = signal('');

  selectedGroup = signal('');

  fishGroups: string[] = [];

  speciesCount = 0;

  filteredPosts = computed(() => {

    const search =
      this.searchTerm()
        .toLowerCase();

    const selected =
      this.selectedGroup();

    return this.posts().filter(post => {

      const searchMatch =

        post.title
          .toLowerCase()
          .includes(search)

        ||

        post.water
          .toLowerCase()
          .includes(search)

        ||

        post.species
          ?.toLowerCase()
          .includes(search);

      const groupMatch =

        !selected ||

        post.fishGroup === selected;

      return (
        searchMatch &&
        groupMatch
      );
    });
  });

  ngOnInit(): void {

    this.zone.runOutsideAngular(() => {

      const colRef =
        collection(
          this.firestore,
          'gallery'
        );

      const q = query(
        colRef,
        orderBy(
          'createdAt',
          'desc'
        )
      );

      this.unsubscribe =
        onSnapshot(q, snapshot => {

          this.zone.run(() => {

            const posts =
              snapshot.docs.map(doc => {

                const data: any =
                  doc.data();

                return {

                  id: doc.id,

                  title:
                    data.title || '',

                  description:
                    data.description || '',

                  water:
                    data.water || '',

                  fishGroup:
                    data.fishGroup || '',

                  species:
                    data.species || '',

                  weight:
                    data.weight ?? null,

                  length:
                    data.length ?? null,

                  bait:
                    data.bait || '',

                  method:
                    data.method || '',

                  timeOfDay:
                    data.timeOfDay || '',

                  imageUrl:
                    data.imageUrl || '',

                  createdAt:
                    data.createdAt,

                  username:
                    data.username
                    ||
                    'Ismeretlen horgász',

                  uid:
                    data.uid || ''

                } as GalleryPost;
              });

            /* SIGNAL UPDATE */
            this.posts.set(posts);

            this.postsSubject
              .next(posts);

            this.generateFilters();

            this.calculateStats();

          });
        });
    });
  }

  ngOnDestroy(): void {

    if (this.unsubscribe) {

      this.unsubscribe();
    }
  }

  generateFilters(): void {

    const unique =
      new Set(

        this.posts().map(
          post => post.fishGroup
        )
      );

    this.fishGroups =
      [...unique];
  }

  calculateStats(): void {

    const unique =
      new Set(

        this.posts()
          .map(
            post => post.species
          )
          .filter(Boolean)
      );

    this.speciesCount =
      unique.size;
  }

  openPost(
    post: GalleryPost
  ): void {

    this.currentIndex =
      this.filteredPosts()
        .findIndex(
          p => p.id === post.id
        );

    this.selectedPost =
      this.filteredPosts()[
        this.currentIndex
      ];

    document.body.style
      .overflow = 'hidden';
  }

  closePost(): void {

    this.selectedPost = null;

    document.body.style
      .overflow = 'auto';
  }

  next(): void {

    this.currentIndex =

      (
        this.currentIndex + 1
      )

      %

      this.filteredPosts().length;

    this.selectedPost =

      this.filteredPosts()[
        this.currentIndex
      ];
  }

  prev(): void {

    this.currentIndex =

      (
        this.currentIndex - 1
        +
        this.filteredPosts().length
      )

      %

      this.filteredPosts().length;

    this.selectedPost =

      this.filteredPosts()[
        this.currentIndex
      ];
  }

  /* KEYBOARD */
  @HostListener(
    'document:keydown',
    ['$event']
  )

  handleKey(
    event: KeyboardEvent
  ): void {

    if (!this.selectedPost) {

      return;
    }

    if (
      event.key ===
      'ArrowRight'
    ) {

      this.next();
    }

    if (
      event.key ===
      'ArrowLeft'
    ) {

      this.prev();
    }

    if (
      event.key ===
      'Escape'
    ) {

      this.closePost();
    }
  }

  /* TOUCH */
  onTouchStart(
    e: TouchEvent
  ): void {

    this.touchStartX =
      e.touches[0].clientX;
  }

  onTouchEnd(
    e: TouchEvent
  ): void {

    const diff =

      e.changedTouches[0]
        .clientX

      -

      this.touchStartX;

    if (
      Math.abs(diff) < 50
    ) {

      return;
    }

    if (diff < 0) {

      this.next();
    }

    else {

      this.prev();
    }
  }

}