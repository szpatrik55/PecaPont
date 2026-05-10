import { Timestamp } from '@angular/fire/firestore';

import { EventCategory } from '../config/verseny-kategoriak';


export interface EventItem {
  id?: string;

  nev: string;
  rovidLeiras: string;
  leiras: string;

  helyszin: string;
  datum: string;

  kategoria: EventCategory;

  kepUrl?: string;

  letrehozva?: Timestamp;
}