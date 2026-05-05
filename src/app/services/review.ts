import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  query,
  where,
  collectionData,
  doc,
  deleteDoc,
  updateDoc,
  serverTimestamp
} from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReviewService {
  private firestore = inject(Firestore);
  private auth = inject(Auth);

  // 🔽 Lekérés tó alapján
  getReviewsByLake(lakeId: string): Observable<any[]> {
    const ref = collection(this.firestore, 'reviews');
    const q = query(ref, where('lakeId', '==', lakeId));

    return collectionData(q, { idField: 'id' });
  }

  // ➕ Új értékelés
  async addReview(lakeId: string, rating: number, comment: string) {
    const user = this.auth.currentUser;
    if (!user) throw new Error('Nem vagy bejelentkezve');

    return addDoc(collection(this.firestore, 'reviews'), {
      lakeId,
      userId: user.uid,
      userName: user.displayName || user.email,
      rating,
      comment,
      createdAt: serverTimestamp()
    });
  }

  // ✏️ Módosítás
  async updateReview(id: string, rating: number, comment: string) {
    const ref = doc(this.firestore, `reviews/${id}`);
    return updateDoc(ref, {
      rating,
      comment,
      updatedAt: serverTimestamp()
    });
  }

  // ❌ Törlés
  async deleteReview(id: string) {
    const ref = doc(this.firestore, `reviews/${id}`);
    return deleteDoc(ref);
  }
}