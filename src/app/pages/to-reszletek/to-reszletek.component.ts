import {
  Component,
  inject,
  OnInit,
  signal
} from '@angular/core';

import {
  ActivatedRoute,
  Router,
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
  ReviewService
} from '../../services/review';

import {
  AuthService,
  AppUser
} from '../../services/auth';

import {
  BookingService
} from '../../services/booking';

import {
  Booking
} from '../../models/booking';

@Component({
  selector: 'app-to-adatlap',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl:
    './to-reszletek.component.html',

  styleUrls: [
    './to-reszletek.component.scss'
  ]
})
export class ToReszletekComponent
implements OnInit {

  private route =
    inject(ActivatedRoute);

  private router =
    inject(Router);

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
  // REALTIME SZABAD HELYEK
  // =========================
  availablePlaces =
    signal<number | null>(null);

  bookingForm = signal({

    from: '',
    to: '',

    places: 1,

    note: ''
  });

  ujErtekeles = signal({

    rating: 5,
    comment: ''
  });

  ngOnInit() {

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
    // ROUTE
    // =========================
    this.route.paramMap
      .subscribe(params => {

        const id =
          params.get('id');

        if (!id) return;

        this.lakeId = id;

        // =========================
        // LAKE
        // =========================
        const ref =
          doc(
            this.firestore,
            `lakes/${id}`
          );

        docData(ref)
          .subscribe(data => {

            this.toAdat.set(data);
          });

        // =========================
        // REVIEWS
        // =========================
        this.reviewService
          .getReviewsByLake(id)
          .subscribe(data => {

            this.reviews.set(data);
          });

        // =========================
        // SZABAD HELYEK
        // =========================
        this.updateAvailablePlaces();
      });
  }

  // =========================
  // SZABAD HELYEK SZÁMOLÁSA
  // =========================
  async updateAvailablePlaces() {

    const form =
      this.bookingForm();

    const lake =
      this.toAdat();

    if (
      !form.from
      ||
      !form.to
      ||
      !lake
    ) {

      this.availablePlaces.set(
        null
      );

      return;
    }

    try {

      const occupied =

        await this.bookingService
          .getOccupiedPlaces(

            this.lakeId,

            form.from,

            form.to
          );

      const available =

        Math.max(

          lake.helyek_szama
          - occupied,

          0
        );

      this.availablePlaces.set(
        available
      );

    } catch (err) {

      console.error(
        'Szabad hely számolási hiba:',
        err
      );

      this.availablePlaces.set(
        null
      );
    }
  }

  // =========================
  // FORM UPDATE
  // =========================
  async updateBookingForm(
    field: string,
    value: any
  ) {

    this.bookingForm.set({

      ...this.bookingForm(),

      [field]: value
    });

    await this.updateAvailablePlaces();
  }

  // =========================
  // REVIEW
  // =========================
  async submitReview() {

    if (
      !this.ujErtekeles()
        .comment
        .trim()
    ) {

      alert(
        'Írj véleményt!'
      );

      return;
    }

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

    const confirmed =
      confirm(
        'Biztosan törlöd az értékelést?'
      );

    if (!confirmed) return;

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

      this.router.navigate(
        ['/belepes']
      );

      return;
    }

    if (!lake) return;

    const form =
      this.bookingForm();

    if (
      !form.from
      ||
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

    // =========================
    // MÚLTBELI DÁTUM
    // =========================
    if (fromDate < today) {

      alert(
        'Múltbeli dátum nem választható!'
      );

      return;
    }

   // =========================
  // HIBÁS INTERVALLUM
  // =========================
  if (toDate < fromDate) {

    alert(
      'A távozás dátuma hibás!'
    );

    return;
  }
    // =========================
    // HIBÁS HELY
    // =========================
    if (
      form.places <= 0
    ) {

      alert(
        'Legalább 1 hely szükséges!'
      );

      return;
    }

    // =========================
    // NINCS ELÉG HELY
    // =========================
    if (

      this.availablePlaces() !== null

      &&

      form.places >
      this.availablePlaces()!
    ) {

      alert(

        `Maximum ${this.availablePlaces()} szabad hely foglalható!`
      );

      return;
    }

    this.bookingLoading.set(
      true
    );

    try {

      const available =

        await this.bookingService
          .checkAvailability(

            this.lakeId,

            form.from,

            form.to,

            form.places,

            lake.helyek_szama
          );

      if (!available) {

        alert(
          'Nincs elegendő szabad hely a kiválasztott időpontra!'
        );

        return;
      }

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
          ||

          user.email
          ||

          'Felhasználó',

        userEmail:
          user.email || '',

        from:
          form.from,

        to:
          form.to,

        places:
          form.places,

        note:
          form.note || '',

        totalPrice:

          (lake.sport_napijegy_ar || 0)
          * form.places,

        status:
          'jóváhagyás alatt'
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

      this.availablePlaces.set(
        null
      );

    } catch (err) {

      console.error(err);

      alert(
        'Foglalási hiba'
      );

    } finally {

      this.bookingLoading.set(
        false
      );
    }
  }
}