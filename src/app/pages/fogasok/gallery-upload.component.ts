import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth } from '@angular/fire/auth';
import { Timestamp, Firestore, doc, getDoc } from '@angular/fire/firestore';
import { GalleryService } from '../../services/gallery';

/* 🔥 CONFIG IMPORT */
import {
  FISH_CATEGORIES,
  METHOD_OPTIONS,
  BAIT_OPTIONS,
  TIME_OPTIONS
} from '../../config/fogas-adatok';

@Component({
  selector: 'app-kepfeltoltes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './gallery-upload.component.html',
  styleUrl: './gallery-upload.component.scss'
})
export class GaleriaFeltoltoComponent implements OnInit {

  private firestore = inject(Firestore);
  private fb = inject(FormBuilder);
  private auth = inject(Auth);
  private galleryService = inject(GalleryService);

  form!: FormGroup;
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  uploading = false;

  // 🔥 CONFIG HASZNÁLAT
  fishCategories = FISH_CATEGORIES;
  fishCategoryKeys = Object.keys(FISH_CATEGORIES);

  methodOptions = METHOD_OPTIONS;
  baitOptions = BAIT_OPTIONS;
  timeOptions = TIME_OPTIONS;

  selectedFishList: string[] = [];

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

      weight: [null],
      length: [null],

      bait: [''],
      method: [''],
      catchDate: [new Date().toISOString().substring(0, 10), Validators.required],
      timeOfDay: [''],
    });

    // 🔥 DINAMIKUS HALFaj + VALIDÁCIÓ
    this.form.get('fishGroup')?.valueChanges.subscribe(group => {
      this.selectedFishList = this.fishCategories[group] || [];
      this.form.get('species')?.setValue('');

      const weightCtrl = this.form.get('weight');
      const lengthCtrl = this.form.get('length');

      if (group === 'Békés halak') {
        weightCtrl?.setValidators([Validators.required, Validators.min(0.1)]);
        lengthCtrl?.clearValidators();
        lengthCtrl?.setValue(null);
      } 
      else if (group === 'Ragadozó halak') {
        lengthCtrl?.setValidators([Validators.required, Validators.min(1)]);
        weightCtrl?.clearValidators();
        weightCtrl?.setValue(null);
      } 
      else {
        weightCtrl?.clearValidators();
        lengthCtrl?.clearValidators();
      }

      weightCtrl?.updateValueAndValidity();
      lengthCtrl?.updateValueAndValidity();
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
      alert('Válassz ki egy képet!');
      return;
    }

    const user = this.auth.currentUser;
    if (!user) {
      alert('Be kell jelentkezned!');
      return;
    }

    try {
      this.uploading = true;

      const imageUrl = await this.galleryService.uploadImage(this.selectedFile, user.uid);

      // 🔥 USERNAME FIRESTORE-BÓL
      const userDoc = await getDoc(doc(this.firestore, 'users', user.uid));

      let username = 'Névtelen horgász';

      if (userDoc.exists()) {
        username = userDoc.data()['username'] || username;
      }

      const postData = {
        ...this.form.value,

        weight: this.form.value.weight ? Number(this.form.value.weight) : null,
        length: this.form.value.length ? Number(this.form.value.length) : null,

        imageUrl,
        uid: user.uid,
        username: username,
        createdAt: Timestamp.now()
      };

      await this.galleryService.createPost(postData);

      alert('Sikeres feltöltés!');

      this.form.reset({
        catchDate: new Date().toISOString().substring(0, 10),
        released: false
      });

      this.selectedFile = null;
      this.previewUrl = null;
      this.selectedFishList = [];

    } catch (error) {
      console.error(error);
      alert('Hiba történt.');
    } finally {
      this.uploading = false;
    }
  }
}