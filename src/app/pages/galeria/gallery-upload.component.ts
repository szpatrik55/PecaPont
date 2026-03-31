import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { GalleryService } from '../../services/gallery';
import { Auth } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gallery-upload',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './gallery-upload.component.html',
  styleUrl: './gallery-upload.component.scss'
})
export class GalleryUploadComponent {

  form!: FormGroup;

  selectedFile: File | null = null;
  previewUrl: string | null = null;
  uploading = false;

  constructor(
    private fb: FormBuilder,
    private galleryService: GalleryService,
    private auth: Auth
  ) {

    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      water: ['', Validators.required]
    });

  }

  onFileSelected(event: any) {

    const file = event.target.files[0];

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert("Csak kép tölthető fel!");
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

    if (this.form.invalid || !this.selectedFile) {
      alert("Tölts ki minden mezőt és válassz képet!");
      return;
    }

    const user = this.auth.currentUser;

    if (!user) {
      alert("Be kell jelentkezni!");
      return;
    }

    try {

      this.uploading = true;

      const imageUrl = await this.galleryService.uploadImage(
        this.selectedFile,
        user.uid
      );

      await this.galleryService.createPost({
        title: this.form.value.title,
        description: this.form.value.description,
        water: this.form.value.water,
        imageUrl: imageUrl,
        userId: user.uid,
        createdAt: new Date()
      });

      alert("Sikeres feltöltés!");

      this.form.reset();
      this.previewUrl = null;
      this.selectedFile = null;

    } catch (error) {

      console.error(error);
      alert("Hiba történt feltöltés közben");

    }

    this.uploading = false;
  }

}