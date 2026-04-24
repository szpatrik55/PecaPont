import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, updateDoc, deleteDoc, getCountFromServer, query, where, getDocs } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AppUser } from './auth';

@Injectable({ providedIn: 'root' })
export class AdminService {
  constructor(private firestore: Firestore) {}

  getUsers(): Observable<AppUser[]> {
    const ref = collection(this.firestore, 'users');
    return collectionData(ref, { idField: 'uid' }) as Observable<AppUser[]>;
  }

  async getUserCount(): Promise<number> {
    const ref = collection(this.firestore, 'users');
    const snapshot = await getCountFromServer(ref);
    return snapshot.data().count;
  }

  async getLakeCount(): Promise<number> {
    const ref = collection(this.firestore, 'lakes');
    const snapshot = await getCountFromServer(ref);
    return snapshot.data().count;
  }

  updateUserRole(uid: string, role: AppUser['role']) {
    const ref = doc(this.firestore, `users/${uid}`);
    return updateDoc(ref, { role });
  }

  deleteUser(uid: string) {
    const ref = doc(this.firestore, `users/${uid}`);
    return deleteDoc(ref);
  }

  // 🆕 Új felhasználók (7 nap)
  async getNewUsersLast7Days(): Promise<number> {
    const date = new Date();
    date.setDate(date.getDate() - 7);

    const ref = collection(this.firestore, 'users');
    const q = query(ref, where('createdAt', '>=', date));

    const snap = await getCountFromServer(q);
    return snap.data().count;
  }

  // ⚡ Aktív felhasználók (24h)
  async getActiveUsers24h(): Promise<number> {
    const date = new Date();
    date.setDate(date.getDate() - 1);

    const ref = collection(this.firestore, 'users');
    const q = query(ref, where('lastLoginAt', '>=', date));

    const snap = await getCountFromServer(q);
    return snap.data().count;
  }

  // 📈 Napi regisztrációk (7 nap)
  async getUserGrowthLast7Days(): Promise<{ date: string; count: number }[]> {
    const ref = collection(this.firestore, 'users');
    const snap = await getDocs(ref);

    const result: Record<string, number> = {};

    const now = new Date();

    // init 7 nap
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(now.getDate() - i);
      const key = d.toISOString().split('T')[0];
      result[key] = 0;
    }

    snap.forEach(doc => {
      const data: any = doc.data();
      if (!data.createdAt) return;

      const date = data.createdAt.toDate();
      const key = date.toISOString().split('T')[0];

      if (result[key] !== undefined) {
        result[key]++;
      }
    });

    return Object.entries(result).map(([date, count]) => ({
      date,
      count
    }));
  }
}