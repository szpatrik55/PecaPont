import { Component, inject, signal } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hirek-szerkeszto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hirek-szerkeszto.component.html'
})
export class NewsEditorComponent {
  private firestore = inject(Firestore);

  article = {
    cim: '',
    rovidLeiras: '',
    tartalom: '',
    kepUrl: '',
    letrehozva: new Date()
  };

  mentesFolyamatban = signal(false);

  async hirMentese() {
    if (!this.article.cim || !this.article.tartalom) {
      alert('A cím és a tartalom kötelező');
      return;
    }

    this.mentesFolyamatban.set(true);

    try {
      await addDoc(
        collection(this.firestore, 'news'),
        this.article
      );

      alert('Hír mentve');

      this.article = {
        cim: '',
        rovidLeiras: '',
        tartalom: '',
        kepUrl: '',
        letrehozva: new Date()
      };

    } catch (error) {
      console.error(error);
      alert('Mentési hiba');
    } finally {
      this.mentesFolyamatban.set(false);
    }
  }
}