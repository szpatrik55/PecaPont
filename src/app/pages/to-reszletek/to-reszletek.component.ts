import {
  Component,
  inject,
  OnInit,
  signal
} from '@angular/core';

import {
  ActivatedRoute,
  RouterModule
} from '@angular/router';

import {
  Firestore,
  doc,
  docData
} from '@angular/fire/firestore';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

import {
  switchMap
} from 'rxjs';

import { ReviewService } from '../../services/review';

import {
  AuthService,
  AppUser
} from '../../services/auth';

import { BookingService } from '../../services/booking';

import { Booking } from '../../models/booking';

@Component({
  selector: 'app-to-adatlap',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './to-reszletek.component.html',
  styleUrl: './to-reszletek.component.scss'
})
export class ToReszletekComponent
implements OnInit {

  private route =
    inject(ActivatedRoute);

  private firestore =
    inject(Firestore);

  private reviewService =
    inject(ReviewService);

  private authService =
    inject(AuthService);

  private bookingService =
    inject(BookingService);

  lakeId!: string;

  reviews =
    signal<any[]>([]);

  isAdmin =
    signal(false);

  currentUserId =
    signal<string | null>(null);

  currentUser =
    signal<AppUser | null>(null);

  toAdat =
    signal<any>(null);

  bookingLoading =
    signal(false);

  // =========================
  // BOOKING INFO
  // =========================
  lakeBookings =
    signal<Booking[]>([]);

  occupiedPlaces =
    signal(0);

  remainingPlaces =
    signal(0);

  // =========================
  // BOOKING FORM
  // =========================
  bookingForm = signal({

    from: '',
    to: '',

    places: 1,

    note: ''
  });

  // =========================
  // REVIEW FORM
  // =========================
  ujErtekeles = signal({

    rating: 5,
    comment: ''
  });

  ngOnInit() {

    // =========================
    // LAKE
    // =========================
    this.route.paramMap.pipe(

      switchMap(params => {

        const id =
          params.get('id');

        if (!id) {

          throw new Error(
            'Nincs ID'
          );
        }

        this.lakeId = id;

        const ref =
          doc(
            this.firestore,
            `lakes/${id}`
          );

        return docData(ref);
      })

    ).subscribe(data => {

      this.toAdat.set(data);

      // 🔥 remainingPlaces inicializálás
      if (data) {

        this.remainingPlaces.set(
          data['helyek_szama'] || 0
        );
      }
    });

    // =========================
    // REVIEWS
    // =========================
    this.route.paramMap.subscribe(
      params => {

        const id =
          params.get('id');

        if (!id) return;

        this.reviewService
          .getReviewsByLake(id)
          .subscribe(data => {

            this.reviews.set(data);
          });
      }
    );

    // =========================
    // USER
    // =========================
    this.authService.appUser$
      .subscribe(user => {

        this.currentUser.set(user);

        this.currentUserId.set(
          user?.uid || null
        );

        this.isAdmin.set(
          user?.role === 'admin'
        );
      });

    // =========================
    // REALTIME BOOKING INFO
    // =========================
    this.route.paramMap.subscribe(
      params => {

        const id =
          params.get('id');

        if (!id) return;

        this.bookingService
          .getBookingsByLake(id)
          .subscribe(bookings => {

            this.lakeBookings.set(
              bookings
            );

            const activeBookings =

              bookings.filter(

                booking =>

                  booking.status === 'jóváhagyás alatt'
                  ||
                  booking.status === 'jóváhagyva'
              );

            const occupied =

              activeBookings.reduce(

                (sum, booking) =>

                  sum + booking.places,

                0
              );

            this.occupiedPlaces.set(
              occupied
            );

            const lake =
              this.toAdat();

            if (!lake) return;

            const maxPlaces =
              lake.helyek_szama || 0;

            this.remainingPlaces.set(

              Math.max(
                maxPlaces - occupied,
                0
              )
            );
          });
      }
    );
  }

  // =========================
  // REVIEW
  // =========================
  async submitReview() {

    await this.reviewService
      .addReview(

        this.lakeId,

        this.ujErtekeles().rating,

        this.ujErtekeles().comment
      );

    this.ujErtekeles.set({

      rating: 5,
      comment: ''
    });
  }

  canModify(
    review: any
  ): boolean {

    return (
      this.isAdmin()

      ||

      this.currentUserId()
      === review.userId
    );
  }

  async deleteReview(
    id: string
  ) {

    await this.reviewService
      .deleteReview(id);
  }

  // =========================
  // BOOKING
  // =========================
  async createBooking() {

    const user =
      this.currentUser();

    const lake =
      this.toAdat();

    if (!user) {

      alert(
        'Bejelentkezés szükséges!'
      );

      return;
    }

    if (!lake) return;

    const form =
      this.bookingForm();

    // =========================
    // VALIDÁCIÓ
    // =========================
    if (
      !form.from ||
      !form.to
    ) {

      alert(
        'Töltsd ki a dátumokat!'
      );

      return;
    }

    const today =
      new Date();

    today.setHours(
      0, 0, 0, 0
    );

    const fromDate =
      new Date(form.from);

    const toDate =
      new Date(form.to);

    // ❌ múltbeli dátum
    if (fromDate < today) {

      alert(
        'Múltbeli dátum nem választható!'
      );

      return;
    }

    // ❌ hibás intervallum
    if (toDate <= fromDate) {

      alert(
        'A távozás dátuma hibás!'
      );

      return;
    }

    // ❌ hibás hely szám
    if (
      form.places <= 0
    ) {

      alert(
        'Legalább 1 hely szükséges!'
      );

      return;
    }

    // ❌ több hely mint maximum
    if (
      form.places >
      lake.helyek_szama
    ) {

      alert(
        `Maximum ${lake.helyek_szama} hely foglalható!`
      );

      return;
    }

    this.bookingLoading.set(true);

    try {

      // =========================
      // AVAILABILITY CHECK
      // =========================
      const available =

        await this.bookingService
          .checkAvailability(

            this.lakeId,

            form.from,

            form.to,

            form.places,

            lake.helyek_szama
          );

      // ❌ nincs hely
      if (!available) {

        alert(
          'Nincs elegendő szabad hely a kiválasztott időpontra!'
        );

        return;
      }

      // =========================
      // BOOKING
      // =========================
      const booking: Booking = {

        lakeId:
          this.lakeId,

        lakeName:
          lake.nev,

        managerId:
          lake.managerId || '',

        userId:
          user.uid,

        userName:
          user.displayName
          || user.email
          || 'Felhasználó',

        userEmail:
          user.email || '',

        from:
          form.from,

        to:
          form.to,

        places:
          form.places,

        note:
          form.note,

        totalPrice:
          (lake.sport_napijegy_ar || 0)
          * form.places,

        // 🔥 EGYSÉGES STATUS
        status:
          'jóváhagyás alatt',

        createdAt:
          new Date()
      };

      await this.bookingService
        .createBooking(
          booking
        );

      alert(
        'Foglalás elküldve!'
      );

      this.bookingForm.set({

        from: '',
        to: '',

        places: 1,

        note: ''
      });

    } catch (err) {

      console.error(err);

      alert(
        'Foglalási hiba'
      );

    } finally {

      this.bookingLoading.set(false);
    }
  }
}