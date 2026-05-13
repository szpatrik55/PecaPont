import {
  Component,
  inject,
  OnInit,
  signal
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  Firestore,
  collection,
  collectionData
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';

import { EventsService } from '../../services/events';

import { EventCategory } from '../../config/event-categories';

interface Lake {

  id: string;

  nev: string;
}

@Component({
  selector: 'app-verseny-szerkeszto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './verseny-szerkeszto.component.html',
  styleUrls: ['./verseny-szerkeszto.component.scss']
})
export class VersenySzerkesztoComponent implements OnInit {

  private eventsService = inject(EventsService);

  private firestore = inject(Firestore);

  tavak$!: Observable<Lake[]>;

  kategoriak: EventCategory[] = [
    'Bojlis',
    'Feeder',
    'Method',
    'Úszós',
    'Gyerek',
    'Esemény',
    'Tábor',
    'Rendezvény'
  ];

  event = {

    nev: '',

    rovidLeiras: '',

    leiras: '',

    helyszin: '',

    datum: '',

    kategoria: 'Esemény' as EventCategory,

    kepUrl: ''
  };

  selectedFile: File | null = null;

  previewUrl: string | null = null;

  mentesFolyamatban = signal(false);

  ngOnInit(): void {

    const lakesRef = collection(this.firestore, 'lakes');

    this.tavak$ = collectionData(lakesRef, {
      idField: 'id'
    }) as Observable<Lake[]>;
  }

  async versenyMentese() {

    if (
      !this.event.nev ||
      !this.event.leiras ||
      !this.event.helyszin ||
      !this.event.kategoria
    ) {

      alert('Kötelező mezők hiányoznak!');

      return;
    }

    try {

      this.mentesFolyamatban.set(true);

      let finalImageUrl = '';

      if (this.selectedFile) {

        finalImageUrl =
          await this.eventsService.uploadEventImage(
            this.selectedFile
          );
      }

      await this.eventsService.createEvent({

        ...this.event,

        kepUrl: finalImageUrl
      });

      alert('Verseny sikeresen létrehozva!');

      this.resetForm();

    } catch (error) {

      console.error(error);

      alert('Hiba történt!');
    }
    finally {

      this.mentesFolyamatban.set(false);
    }
  }

  onFileSelected(event: Event) {

    const input =
      event.target as HTMLInputElement;

    if (!input.files?.length) return;

    this.selectedFile = input.files[0];

    const reader = new FileReader();

    reader.onload = () => {

      this.previewUrl =
        reader.result as string;
    };

    reader.readAsDataURL(this.selectedFile);
  }

  resetForm() {

    this.event = {

      nev: '',

      rovidLeiras: '',

      leiras: '',

      helyszin: '',

      datum: '',

      kategoria: 'Esemény',

      kepUrl: ''
    };

    this.previewUrl = null;

    this.selectedFile = null;
  }
}