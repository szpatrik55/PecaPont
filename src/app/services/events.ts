import { inject, Injectable } from '@angular/core';

import {
  Firestore,
  collection,
  query,
  orderBy,
  getDocs,
  doc,
  getDoc,
  addDoc,
  Timestamp
} from '@angular/fire/firestore';

import {
  Storage,
  ref,
  uploadBytes,
  getDownloadURL
} from '@angular/fire/storage';

import { EventItem } from '../models/event';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private firestore = inject(Firestore);

  private storage = inject(Storage);

  // =========================
  // KÉP FELTÖLTÉS
  // =========================
  async uploadEventImage(
    file: File
  ): Promise<string> {

    const filePath =
      `events/${Date.now()}_${file.name}`;

    const storageRef =
      ref(this.storage, filePath);

    const snapshot =
      await uploadBytes(storageRef, file);

    return getDownloadURL(snapshot.ref);
  }

  // =========================
  // VERSENY LÉTREHOZÁS
  // =========================
  async createEvent(
    eventData: EventItem
  ) {

    const eventsCollection =
      collection(this.firestore, 'events');

    return addDoc(eventsCollection, {

      ...eventData,

      letrehozva: Timestamp.now()
    });
  }

  // =========================
  // ÖSSZES VERSENY
  // =========================
  async getAllEvents(): Promise<EventItem[]> {

    const colRef =
      collection(this.firestore, 'events');

    const q = query(
      colRef,
      orderBy('letrehozva', 'desc')
    );

    const snapshot =
      await getDocs(q);

    return snapshot.docs.map(doc => ({

      id: doc.id,

      ...doc.data()

    } as EventItem));
  }

  // =========================
  // EGY VERSENY
  // =========================
  async getEventById(
    id: string
  ): Promise<EventItem | null> {

    const docRef = doc(
      this.firestore,
      'events',
      id
    );

    const docSnap =
      await getDoc(docRef);

    return docSnap.exists()

      ? ({
          id: docSnap.id,

          ...docSnap.data()

        } as EventItem)

      : null;
  }
}