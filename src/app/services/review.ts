import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Timestamp } from 'firebase/firestore';
import { Auth } from '@angular/fire/auth';

@Injectable({ providedIn: 'root' })
export class ReviewService {
  private firestore = inject(Firestore);
  private auth = inject(Auth);

  // 🔹 összes review lekérése egy tóhoz
  getReviews(lakeId: string) {
    const ref = collection(this.firestore, `lakes/${lakeId}/reviews`);
    return collectionData(ref, { idField: 'id' });
  }

  // 🔹 új review
  async addReview(lakeId: string, rating: number, comment: string, userName: string) {
    const user = this.auth.currentUser;
    if (!user) throw new Error('Nincs bejelentkezve');

    const ref = collection(this.firestore, `lakes/${lakeId}/reviews`);

    return addDoc(ref, {
      rating,
      comment,
      userId: user.uid,
      userName,
      createdAt: Timestamp.now()
    });
  }

  // 🔹 törlés
  deleteReview(lakeId: string, reviewId: string) {
    const ref = doc(this.firestore, `lakes/${lakeId}/reviews/${reviewId}`);
    return deleteDoc(ref);
  }

  // 🔹 módosítás
  updateReview(lakeId: string, reviewId: string, rating: number, comment: string) {
    const ref = doc(this.firestore, `lakes/${lakeId}/reviews/${reviewId}`);
    return updateDoc(ref, {
      rating,
      comment,
      updatedAt: Timestamp.now()
    });
  }
}