import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { GalleryPost } from '../../models/gallery-post';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './galeria.component.html',
  styleUrl: './galeria.component.scss'
})
export class GalleryComponent {

  posts$: Observable<GalleryPost[]>;

  constructor(private firestore: Firestore) {

    const ref = collection(this.firestore, 'gallery');

    this.posts$ = collectionData(ref, { idField: 'id' }) as Observable<GalleryPost[]>;

  }

}