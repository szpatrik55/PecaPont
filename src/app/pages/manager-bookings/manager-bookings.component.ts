import {
  Component,
  inject,
  signal
} from '@angular/core';

import {
  ActivatedRoute
} from '@angular/router';

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

  private route =
  inject(ActivatedRoute);

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

    const lakeId =
      this.route.snapshot.paramMap.get('id');

    if (!lakeId) {

      this.loading.set(false);
      return;
    }

    this.bookingService
      .getBookingsByLake(
        lakeId
      )
      .subscribe(bookings => {

        this.bookings.set(
          bookings
        );

        this.loading.set(false);
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

      case 'jóváhagyás alatt':
        return 'Függőben';

      case 'jóváhagyva':
        return 'Jóváhagyva';

      case 'elutasítva':
        return 'Elutasítva';

      case 'törölve':
        return 'Lemondva';

      default:
        return status;
    }
  }
}