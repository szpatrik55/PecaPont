import { Timestamp } from '@angular/fire/firestore';

export interface EventItem {
  id?: string;

  nev: string;
  rovidLeiras: string;
  leiras: string;

  helyszin: string;
  datum: string;

  kepUrl?: string;

  letrehozva?: Timestamp;
}