import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Firebase SDK importok a típus-összeütközések elkerülése érdekében
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore, collection, addDoc, Timestamp, Firestore } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL, FirebaseStorage } from 'firebase/storage';

@Component({
  selector: 'app-hirek-szerkeszto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hirek-szerkeszto.component.html',
  styleUrls: ['./hirek-szerkeszto.component.scss']
})
export class NewsEditorComponent implements OnInit {
  private db!: Firestore;
  private storage!: FirebaseStorage;

  // Konfiguráció az újrapéldányosításhoz
  private firebaseConfig = {
    apiKey: "AIzaSyB7k-N4xhzNaPt2pZc48kd4aAeyoLWKs_o",
    authDomain: "pecapont-50489.firebaseapp.com",
    projectId: "pecapont-50489",
    storageBucket: "pecapont-50489.firebasestorage.app",
    messagingSenderId: "1029335197913",
    appId: "1:1029335197913:web:f84de64072a44a2d0eb6c8",
    measurementId: "G-KYYVJJTTSN"
  };

  article = {
    cim: '',
    rovidLeiras: '',
    tartalom: '',
    kepUrl: ''
  };

  selectedFile: File | null = null;
  mentesFolyamatban = signal(false);

  ngOnInit() {
    // Saját példányok létrehozása a kompatibilitásért
    const app = !getApps().length ? initializeApp(this.firebaseConfig) : getApp();
    this.db = getFirestore(app);
    this.storage = getStorage(app);
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  async hirMentese() {
    if (!this.article.cim || !this.article.tartalom) {
      alert('A cím és a tartalom kitöltése kötelező!');
      return;
    }

    this.mentesFolyamatban.set(true);

    try {
      let uploadedImageUrl = this.article.kepUrl;

      // Kép feltöltése a Storage 'news' mappájába
      if (this.selectedFile) {
        const filePath = `news/${Date.now()}_${this.selectedFile.name}`;
        const storageRef = ref(this.storage, filePath);
        
        // Feltöltési folyamat
        await uploadBytes(storageRef, this.selectedFile);
        
        // Publikus URL lekérése a hírbe mentéshez
        uploadedImageUrl = await getDownloadURL(storageRef);
      }

      // Hír mentése Firestore-ba
      await addDoc(collection(this.db, 'news'), {
        ...this.article,
        kepUrl: uploadedImageUrl,
        letrehozva: Timestamp.now()
      });

      alert('Hír sikeresen közzétéve!');
      this.resetForm();

    } catch (error) {
      console.error('Hiba:', error);
      alert('Hiba történt a mentés során!');
    } finally {
      this.mentesFolyamatban.set(false);
    }
  }

  resetForm() {
    this.article = { cim: '', rovidLeiras: '', tartalom: '', kepUrl: '' };
    this.selectedFile = null;
    // Az input file mezőt a template-ben lévő (change) kezeli
  }
}