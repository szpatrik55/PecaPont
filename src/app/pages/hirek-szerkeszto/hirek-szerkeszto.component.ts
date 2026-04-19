import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NewsService } from '../../services/news';

@Component({
  selector: 'app-hirek-szerkeszto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hirek-szerkeszto.component.html',
  styleUrls: ['./hirek-szerkeszto.component.scss']
})
export class NewsEditorComponent {
  private newsService = inject(NewsService);

  article = {
    cim: '',
    rovidLeiras: '',
    tartalom: '',
    kepUrl: ''
  };

  selectedFile: File | null = null;
  previewUrl: string | null = null;
  mentesFolyamatban = signal(false);

  onFileSelected(event: any) {
    const file = event.target.files[0] as File;
    if (file && file.type.startsWith('image/')) {
      this.selectedFile = file;
      
      // Előnézet generálása
      const reader = new FileReader();
      reader.onload = () => this.previewUrl = reader.result as string;
      reader.readAsDataURL(file);
    }
  }

  async hirMentese() {
    if (!this.article.cim || !this.article.tartalom) {
      alert('A cím és a tartalom kitöltése kötelező!');
      return;
    }

    try {
      this.mentesFolyamatban.set(true);
      let finalImageUrl = '';

      // 1. Kép feltöltése, ha van kiválasztva
      if (this.selectedFile) {
        finalImageUrl = await this.newsService.uploadNewsImage(this.selectedFile);
      }

      // 2. Adatok mentése Firestore-ba
      await this.newsService.createNews({
        ...this.article,
        kepUrl: finalImageUrl
      });

      alert('Hír sikeresen közzétéve!');
      this.resetForm();

    } catch (error) {
      console.error('Hiba a mentés során:', error);
      alert('Hiba történt a mentés során! Ellenőrizd a jogosultságokat.');
    } finally {
      this.mentesFolyamatban.set(false);
    }
  }

  resetForm() {
    this.article = { cim: '', rovidLeiras: '', tartalom: '', kepUrl: '' };
    this.selectedFile = null;
    this.previewUrl = null;
  }
}