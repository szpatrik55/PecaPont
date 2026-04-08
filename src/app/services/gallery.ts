// gallery.service.ts
import { Injectable, inject, NgZone } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';

@Injectable({ providedIn: 'root' })
export class GalleryService {
  private firestore = inject(Firestore);
  private storage = inject(Storage);
  private zone = inject(NgZone);

  async uploadImage(file: File, userId: string): Promise<string> {
    const filePath = `gallery/${userId}/${Date.now()}_${file.name}`;
    const storageRef = ref(this.storage, filePath);
    
    // Feltöltés és URL kérése a zónán belül
    return await this.zone.run(async () => {
      await uploadBytes(storageRef, file);
      return await getDownloadURL(storageRef);
    });
  }

  async createPost(post: any) {
    return await this.zone.run(async () => {
      const colRef = collection(this.firestore, 'gallery');
      // A spread operátorral biztosítjuk, hogy ne maradjon "rejtett" Angular típus az objektumban
      return await addDoc(colRef, { ...post });
    });
  }
}