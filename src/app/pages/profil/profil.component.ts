import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  inject
} from '@angular/core';

import {
  AsyncPipe,
  NgIf,
  NgFor,
  CommonModule
} from '@angular/common';

import {
  AuthService
} from '../../services/auth';

import {
  Router
} from '@angular/router';

import {
  updatePassword
} from 'firebase/auth';

import {
  Auth
} from '@angular/fire/auth';

import {
  Firestore,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  getDoc
} from '@angular/fire/firestore';

import {
  Subscription
} from 'rxjs';

import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import {
  FISH_CATEGORIES,
  METHOD_OPTIONS,
  BAIT_OPTIONS,
  TIME_OPTIONS
} from '../../config/fogas-adatok';

import {
  BookingService
} from '../../services/booking';

import {
  Booking
} from '../../models/booking';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    NgIf,
    NgFor,
    ReactiveFormsModule
  ],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.scss'
})
export class ProfilComponent
implements OnInit, OnDestroy {

  private fb =
    inject(FormBuilder);

  constructor(
    public auth: AuthService,
    private firebaseAuth: Auth,
    private firestore: Firestore,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private bookingService: BookingService
  ) {}

  userSub!: Subscription;

  bookingSub!: Subscription;

  userData: any = null;

  myPosts: any[] = [];

  // =========================
  // BOOKINGS
  // =========================
  myBookings: Booking[] = [];

  bookingLoading = false;

  // =========================
  // EDIT
  // =========================
  editingPost: any = null;

  editForm!: FormGroup;

  selectedFishList: string[] = [];

  fishCategories =
    FISH_CATEGORIES;

  fishCategoryKeys =
    Object.keys(FISH_CATEGORIES);

  methodOptions =
    METHOD_OPTIONS;

  baitOptions =
    BAIT_OPTIONS;

  timeOptions =
    TIME_OPTIONS;

  async ngOnInit() {

    this.userSub =
      this.auth.user$
        .subscribe(async user => {

          if (!user) return;

          // =========================
          // USER
          // =========================
          const userDoc =
            await getDoc(
              doc(
                this.firestore,
                'users',
                user.uid
              )
            );

          if (userDoc.exists()) {

            this.userData =
              userDoc.data();
          }

          // =========================
          // POSTS
          // =========================
          const colRef =
            collection(
              this.firestore,
              'gallery'
            );

          const q =
            query(
              colRef,
              where(
                'uid',
                '==',
                user.uid
              )
            );

          const snapshot =
            await getDocs(q);

          this.myPosts =
            snapshot.docs.map(d => ({

              id: d.id,

              ...(d.data() as any)
            }));

          // =========================
          // BOOKINGS
          // =========================
          this.bookingSub =
            this.bookingService
              .getBookingsByUser(
                user.uid
              )
              .subscribe(bookings => {

                this.myBookings =
                  bookings;

                this.cdr.detectChanges();
              });

          this.cdr.detectChanges();
        });
  }

  ngOnDestroy() {

    if (this.userSub) {

      this.userSub.unsubscribe();
    }

    if (this.bookingSub) {

      this.bookingSub.unsubscribe();
    }
  }

  // =========================
  // DELETE POST
  // =========================
  async deletePost(id: string) {

    if (
      !confirm(
        'Biztos törlöd?'
      )
    ) return;

    await deleteDoc(
      doc(
        this.firestore,
        'gallery',
        id
      )
    );

    this.myPosts =
      this.myPosts.filter(
        p => p.id !== id
      );
  }

  // =========================
  // EDIT POST
  // =========================
  openEdit(post: any) {

    this.editingPost = post;

    this.editForm =
      this.fb.group({

        title: [
          post.title,
          [
            Validators.required,
            Validators.minLength(3)
          ]
        ],

        description:
          [post.description],

        water: [
          post.water,
          Validators.required
        ],

        spot: [post.spot],

        fishGroup: [
          post.fishGroup,
          Validators.required
        ],

        species: [
          post.species,
          Validators.required
        ],

        weight: [post.weight],

        length: [post.length],

        bait: [post.bait],

        method: [post.method],

        timeOfDay: [post.timeOfDay],

        catchDate: [post.catchDate]
      });

    this.selectedFishList =
      this.fishCategories[
        post.fishGroup
      ] || [];

    this.editForm
      .get('fishGroup')
      ?.valueChanges
      .subscribe(group => {

        this.selectedFishList =
          this.fishCategories[group]
          || [];

        this.editForm
          .get('species')
          ?.setValue('');
      });
  }

  closeEdit() {

    this.editingPost = null;
  }

  async saveEdit() {

    if (
      this.editForm.invalid
    ) {

      this.editForm
        .markAllAsTouched();

      alert(
        'Hiányos adatok!'
      );

      return;
    }

    try {

      await updateDoc(

        doc(
          this.firestore,
          'gallery',
          this.editingPost.id
        ),

        {
          ...this.editForm.value,

          weight:
            this.editForm.value.weight
            || null,

          length:
            this.editForm.value.length
            || null
        }
      );

      const index =
        this.myPosts.findIndex(

          p =>
            p.id ===
            this.editingPost.id
        );

      if (index !== -1) {

        this.myPosts[index] = {

          ...this.myPosts[index],

          ...this.editForm.value
        };
      }

      this.editingPost = null;

      this.editForm.reset();

      this.cdr.detectChanges();

      alert('Mentve!');

    } catch (error) {

      console.error(error);

      alert(
        'Mentés sikertelen!'
      );
    }
  }

  // =========================
  // UPDATE USERNAME
  // =========================
  async updateName(
    name: string
  ) {

    if (
      !name ||
      name.length < 3
    ) return;

    const user =
      this.firebaseAuth
        .currentUser;

    if (!user) return;

    await updateDoc(

      doc(
        this.firestore,
        'users',
        user.uid
      ),

      {
        username: name
      }
    );

    this.userData.username =
      name;
  }

  // =========================
  // PASSWORD
  // =========================
  async changePassword(
    password: string
  ) {

    if (
      !password ||
      password.length < 6
    ) return;

    const user =
      this.firebaseAuth
        .currentUser;

    if (!user) return;

    await updatePassword(
      user,
      password
    );
  }

  // =========================
  // BOOKING STATUS
  // =========================
  getBookingStatusLabel(
    status: string
  ): string {

    switch (status) {

      case 'jóváhagyás alatt':
        return 'Függőben';

      case 'jóváhagyva':
        return 'Jóváhagyva';

      case 'elutasítva':
        return 'Elutasítva';

      case 'törölve':
        return 'Lemondva';

      default:
        return 'Függőben';
    }
  }

  // =========================
  // CANCEL BOOKING
  // =========================
  async cancelBooking(
    booking: Booking
  ) {

    if (!booking.id) return;

    const confirmed = confirm(
      'Biztosan lemondod a foglalást?'
    );

    if (!confirmed) return;

    this.bookingLoading = true;

    try {

      await this.bookingService
        .cancelBooking(
          booking.id
        );

      alert(
        'Foglalás lemondva!'
      );

    } catch (err) {

      console.error(err);

      alert(
        'Lemondási hiba'
      );

    } finally {

      this.bookingLoading = false;
    }
  }

  async logout() {

    await this.auth.logout();

    this.router.navigate(['/']);
  }
}