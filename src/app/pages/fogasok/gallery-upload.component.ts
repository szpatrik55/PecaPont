import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth } from '@angular/fire/auth';
import { Timestamp } from '@angular/fire/firestore';
import { GalleryService } from '../../services/gallery';

@Component({
  selector: 'app-kepfeltoltes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './gallery-upload.component.html',
  styleUrl: './gallery-upload.component.scss'
})
export class GalleryUploadComponent implements OnInit {
  private fb = inject(FormBuilder);
  private auth = inject(Auth);
  private galleryService = inject(GalleryService);

  form!: FormGroup;
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  uploading = false;

  fishCategories: { [key: string]: string[] } = {
    'Békés halak': ['Ponty', 'Amur', 'Dévérkeszeg', 'Kárász', 'Compó'],
    'Ragadozó halak': ['Csuka', 'Süllő', 'Harcsa', 'Balin', 'Sügér'],
    'Egyéb': ['Törpeharcsa', 'Angolna', 'Tokhal']
  };

  methodOptions = ['Feeder', 'Spicc', 'Pergetés', 'Fenék', 'Úszós'];
  baitOptions = ['Kukorica', 'Bojli', 'Giliszta', 'Műcsali', 'Wobbler', 'Pellet'];
  timeOptions = ['Reggel', 'Délután', 'Este', 'Éjszaka'];
  
  selectedFishList: string[] = [];
  // Ezt a nevet használjuk a HTML-ben a kategóriák ciklusához
  fishCategoryKeys = Object.keys(this.fishCategories);

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      water: ['', Validators.required],
      spot: [''],
      fishGroup: ['', Validators.required],
      species: ['', Validators.required],
      weight: [null, [Validators.required, Validators.min(0.1)]],
      length: [null, [Validators.required, Validators.min(1)]],
      bait: [''],
      method: [''],
      catchDate: [new Date().toISOString().substring(0, 10), Validators.required],
      timeOfDay: [''],
      released: [false]
    });

    this.form.get('fishGroup')?.valueChanges.subscribe(group => {
      this.selectedFishList = this.fishCategories[group] || [];
      this.form.get('species')?.setValue('');
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0] as File;
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Csak kép tölthető fel!');
      return;
    }

    this.selectedFile = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  async upload() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      alert('Kérlek, töltsd ki az összes kötelező mezőt!');
      return;
    }

    if (!this.selectedFile) {
      alert('Válassz ki egy képet a fogásról!');
      return;
    }

    const user = this.auth.currentUser;
    if (!user) {
      alert('A feltöltéshez be kell jelentkezned!');
      return;
    }

    try {
      this.uploading = true;
      const imageUrl = await this.galleryService.uploadImage(this.selectedFile, user.uid);

      const postData = {
        ...this.form.value,
        weight: Number(this.form.value.weight),
        length: Number(this.form.value.length),
        imageUrl: imageUrl,
        uid: user.uid,
        userName: user.displayName || 'Névtelen horgász',
        createdAt: Timestamp.now()
      };

      await this.galleryService.createPost(postData);
      alert('Gratulálunk a fogáshoz! Sikeres feltöltés.');

      this.form.reset({
        catchDate: new Date().toISOString().substring(0, 10),
        released: false
      });
      this.selectedFile = null;
      this.previewUrl = null;
      this.selectedFishList = [];

    } catch (error) {
      console.error('Feltöltési hiba:', error);
      alert('Hiba történt a mentés során.');
    } finally {
      this.uploading = false;
    }
  }
}