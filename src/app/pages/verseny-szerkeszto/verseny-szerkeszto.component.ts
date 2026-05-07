import { Component, inject, signal } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EventsService } from '../../services/events';

@Component({
  selector: 'app-verseny-szerkeszto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './verseny-szerkeszto.component.html',
  styleUrls: ['./verseny-szerkeszto.component.scss']
})
export class VersenySzerkesztoComponent {

  private eventsService = inject(EventsService);

  event = {

    nev: '',
    rovidLeiras: '',
    leiras: '',

    helyszin: '',
    datum: '',

    kepUrl: ''
  };

  selectedFile: File | null = null;

  previewUrl: string | null = null;

  mentesFolyamatban = signal(false);

  async versenyMentese() {

    if (!this.event.nev || !this.event.leiras) {

      alert('Kötelező mezők hiányoznak!');

      return;
    }

    try {

      this.mentesFolyamatban.set(true);

      let finalImageUrl = '';

      if (this.selectedFile) {

        finalImageUrl =
          await this.eventsService.uploadEventImage(this.selectedFile);
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

    const input = event.target as HTMLInputElement;

    if (!input.files?.length) return;

    this.selectedFile = input.files[0];

    const reader = new FileReader();

    reader.onload = () => {

      this.previewUrl = reader.result as string;
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

      kepUrl: ''
    };

    this.previewUrl = null;

    this.selectedFile = null;
  }
}