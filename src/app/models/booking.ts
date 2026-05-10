export type BookingStatus =
  | 'jóváhagyás alatt'
  | 'jóváhagyva'
  | 'elutasítva'
  | 'törölve';

  export interface Booking {
  id?: string;

  lakeId: string;
  lakeName: string;

  managerId: string;

  userId: string;
  userName: string;
  userEmail: string;

  from: any;
  to: any;

  places: number;

  note?: string;

  totalPrice: number;

  status: BookingStatus;

  createdAt: any;
}