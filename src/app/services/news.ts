import { inject, Injectable } from '@angular/core';
import { Firestore, collection, addDoc, Timestamp } from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private firestore = inject(Firestore);
  private storage = inject(Storage);

  async uploadNewsImage(file: File): Promise<string> {
    const filePath = `news/${Date.now()}_${file.name}`;
    const storageRef = ref(this.storage, filePath);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  }

  async createNews(newsData: any) {
    const newsRef = collection(this.firestore, 'news');
    return addDoc(newsRef, {
      ...newsData,
      letrehozva: Timestamp.now()
    });
  }
}