import { Injectable, inject } from '@angular/core';

import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  doc,
  updateDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  getDocs
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';

import {
  Booking,
  BookingStatus
} from '../models/booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private firestore =
    inject(Firestore);

  // =========================
  // ELÉRHETŐSÉG ELLENŐRZÉS
  // =========================
  async checkAvailability(
    lakeId: string,
    from: string,
    to: string,
    requestedPlaces: number,
    maxPlaces: number
  ): Promise<boolean> {

    const ref =
      collection(
        this.firestore,
        'bookings'
      );

    const q =
      query(
        ref,

        where(
          'lakeId',
          '==',
          lakeId
        )
      );

    const snapshot =
      await getDocs(q);

    const fromDate =
      new Date(from);

    const toDate =
      new Date(to);

    let occupiedPlaces = 0;

    snapshot.forEach(doc => {

      const booking =
        doc.data() as Booking;

      // ❌ Csak aktív bookingok
      if (
        booking.status !== 'jóváhagyás alatt'
        &&
        booking.status !== 'jóváhagyva'
      ) {
        return;
      }

      const bookingFrom =
        new Date(booking.from);

      const bookingTo =
        new Date(booking.to);

      // 🔥 Dátum átfedés
      const overlaps =

        fromDate < bookingTo
        &&
        toDate > bookingFrom;

      if (overlaps) {

        occupiedPlaces +=
          booking.places;
      }
    });

    return (
      occupiedPlaces
      + requestedPlaces
    ) <= maxPlaces;
  }

  // =========================
  // ÚJ FOGLALÁS
  // =========================
  async createBooking(
    booking: Booking
  ): Promise<void> {

    const ref =
      collection(
        this.firestore,
        'bookings'
      );

    await addDoc(
      ref,
      {
        ...booking,

        status: 'pending',

        createdAt:
          serverTimestamp()
      }
    );
  }

  // =========================
  // TÓ FOGLALÁSAI
  // =========================
  getBookingsByLake(
    lakeId: string
  ): Observable<Booking[]> {

    const ref =
      collection(
        this.firestore,
        'bookings'
      );

    const q =
      query(
        ref,

        where(
          'lakeId',
          '==',
          lakeId
        ),

        orderBy(
          'createdAt',
          'desc'
        )
      );

    return collectionData(
      q,
      {
        idField: 'id'
      }
    ) as Observable<Booking[]>;
  }

  // =========================
  // MANAGER FOGLALÁSAI
  // =========================
  getBookingsByManager(
    managerId: string
  ): Observable<Booking[]> {

    const ref =
      collection(
        this.firestore,
        'bookings'
      );

    const q =
      query(
        ref,

        where(
          'managerId',
          '==',
          managerId
        ),

        orderBy(
          'createdAt',
          'desc'
        )
      );

    return collectionData(
      q,
      {
        idField: 'id'
      }
    ) as Observable<Booking[]>;
  }

  // =========================
  // USER FOGLALÁSAI
  // =========================
  getBookingsByUser(
    userId: string
  ): Observable<Booking[]> {

    const ref =
      collection(
        this.firestore,
        'bookings'
      );

    const q =
      query(
        ref,

        where(
          'userId',
          '==',
          userId
        ),

        orderBy(
          'createdAt',
          'desc'
        )
      );

    return collectionData(
      q,
      {
        idField: 'id'
      }
    ) as Observable<Booking[]>;
  }

  // =========================
  // STÁTUSZ FRISSÍTÉS
  // =========================
  async updateBookingStatus(
    bookingId: string,
    status: BookingStatus
  ): Promise<void> {

    const ref =
      doc(
        this.firestore,
        `bookings/${bookingId}`
      );

    await updateDoc(
      ref,
      {
        status
      }
    );
  }

  // =========================
  // JÓVÁHAGYÁS
  // =========================
  async approveBooking(
    bookingId: string
  ): Promise<void> {

    await this.updateBookingStatus(
      bookingId,
      'jóváhagyva'
    );
  }

  // =========================
  // ELUTASÍTÁS
  // =========================
  async rejectBooking(
    bookingId: string
  ): Promise<void> {

    await this.updateBookingStatus(
      bookingId,
      'elutasítva'
    );
  }

  // =========================
  // LEMONDÁS
  // =========================
  async cancelBooking(
    bookingId: string
  ): Promise<void> {

    await this.updateBookingStatus(
      bookingId,
      'törölve'
    );
  }
}