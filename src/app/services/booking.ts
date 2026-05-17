// src/app/services/booking.ts

import {
  Injectable,
  inject
} from '@angular/core';

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

import {
  Observable
} from 'rxjs';

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
  // ÁTFEDÉS ELLENŐRZÉS
  // =========================

  // =========================
  // ELÉRHETŐSÉG
  // =========================

  private isOverlapping(
    from: Date,
    to: Date,
    bookingFrom: Date,
    bookingTo: Date
  ): boolean {

    return (
      from < bookingTo
      &&
      to > bookingFrom
    );
  }

  async checkAvailability(
    lakeId: string,
    from: Date,
    to: Date,
    requestedPlaces: number,
    maxPlaces: number
  ): Promise<boolean> {

    const occupied =

      await this.getOccupiedPlaces(
        lakeId,
        from,
        to
      );

    return (

      occupied
      + requestedPlaces

    ) <= maxPlaces;
  }

  // =========================
  // FOGLALT HELYEK
  // =========================

  async getOccupiedPlaces(
    lakeId: string,
    from: Date,
    to: Date
  ): Promise<number> {

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

        where(
          'status',
          'in',
          [
            'jóváhagyás alatt',
            'jóváhagyva'
          ]
        )
      );

    const snapshot =
      await getDocs(q);

    let occupied = 0;

    snapshot.forEach(docSnap => {

      const booking =
        docSnap.data() as Booking;

      const bookingFrom =
        booking.from.toDate();

      const bookingTo =
        booking.to.toDate();

      const overlaps =
        this.isOverlapping(
          from,
          to,
          bookingFrom,
          bookingTo
        );

      if (overlaps) {

        occupied +=
          booking.places;
      }
    });

    return occupied;
  }

  // =========================
  // CREATE
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

        status:
          'jóváhagyás alatt',

        createdAt:
          serverTimestamp()
      }
    );
  }

  // =========================
  // TÓ BOOKINGOK
  // =========================

  getLakeBookings(
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
  // MANAGER
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
  // USER
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

  async approveBooking(
    bookingId: string
  ): Promise<void> {

    return this.updateBookingStatus(
      bookingId,
      'jóváhagyva'
    );
  }

  async rejectBooking(
    bookingId: string
  ): Promise<void> {

    return this.updateBookingStatus(
      bookingId,
      'elutasítva'
    );
  }

  async cancelBooking(
    bookingId: string
  ): Promise<void> {

    return this.updateBookingStatus(
      bookingId,
      'törölve'
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
}