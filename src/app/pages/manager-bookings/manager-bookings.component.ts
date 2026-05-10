import {
  Component,
  inject,
  signal
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { BookingService } from '../../services/booking';
import { AuthService } from '../../services/auth';

import { Booking } from '../../models/booking';

@Component({
  selector: 'app-manager-bookings',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './manager-bookings.component.html',
  styleUrl: './manager-bookings.component.scss'
})
export class ManagerBookingsComponent {

  private bookingService =
    inject(BookingService);

  private authService =
    inject(AuthService);

  bookings =
    signal<Booking[]>([]);

  loading =
    signal(true);

  actionLoading:
    Record<string, boolean> = {};

  constructor() {

    this.authService.appUser$
      .subscribe(user => {

        if (!user?.uid) {

          this.loading.set(false);
          return;
        }

        this.bookingService
          .getBookingsByManager(
            user.uid
          )
          .subscribe(bookings => {

            this.bookings.set(
              bookings
            );

            this.loading.set(false);
          });
      });
  }

  async approveBooking(
    booking: Booking
  ) {

    if (!booking.id) return;

    this.actionLoading[
      booking.id
    ] = true;

    try {

      await this.bookingService
        .approveBooking(
          booking.id
        );

    } catch (err) {

      console.error(err);

      alert(
        'Jóváhagyási hiba'
      );

    } finally {

      this.actionLoading[
        booking.id
      ] = false;
    }
  }

  async rejectBooking(
    booking: Booking
  ) {

    if (!booking.id) return;

    this.actionLoading[
      booking.id
    ] = true;

    try {

      await this.bookingService
        .rejectBooking(
          booking.id
        );

    } catch (err) {

      console.error(err);

      alert(
        'Elutasítási hiba'
      );

    } finally {

      this.actionLoading[
        booking.id
      ] = false;
    }
  }

  getStatusLabel(
    status: string
  ): string {

    switch (status) {

      case 'approved':
        return 'Jóváhagyva';

      case 'rejected':
        return 'Elutasítva';

      case 'cancelled':
        return 'Lemondva';

      default:
        return 'Függőben';
    }
  }
}