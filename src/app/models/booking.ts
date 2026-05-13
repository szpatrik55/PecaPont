// src/app/models/booking.ts

import { Timestamp } from '@angular/fire/firestore';

export type BookingStatus =
  | 'jóváhagyás alatt'
  | 'jóváhagyva'
  | 'elutasítva'
  | 'törölve';

export interface Booking {

  id?: string;

  // =========================
  // TÓ
  // =========================

  lakeId: string;
  lakeName: string;

  // =========================
  // KEZELŐ
  // =========================

  managerId: string;

  // =========================
  // FELHASZNÁLÓ
  // =========================

  userId: string;
  userName: string;
  userEmail: string;

  // =========================
  // FOGLALÁS
  // =========================

  from: Timestamp;
  to: Timestamp;

  places: number;

  note?: string;

  // =========================
  // ÁR
  // =========================

  totalPrice: number;

  // =========================
  // ÁLLAPOT
  // =========================

  status: BookingStatus;

  // =========================
  // META
  // =========================

  createdAt?: Timestamp;
}