import { inject, Injectable } from '@angular/core';
import { 
  Firestore, 
  collection, 
  query, 
  orderBy, 
  getDocs, 
  doc, 
  getDoc, 
  addDoc, 
  Timestamp 
} from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private firestore = inject(Firestore);
  private storage = inject(Storage);

  // Kép feltöltése
  async uploadNewsImage(file: File): Promise<string> {
    const filePath = `news/${Date.now()}_${file.name}`;
    const storageRef = ref(this.storage, filePath);
    const snapshot = await uploadBytes(storageRef, file);
    return getDownloadURL(snapshot.ref);
  }

  // Hír létrehozása
  async createNews(newsData: any) {
    // EXPLICIT ÁTADÁS: collection(this.firestore, ...)
    const newsCollection = collection(this.firestore, 'news');
    return addDoc(newsCollection, {
      ...newsData,
      letrehozva: Timestamp.now()
    });
  }

  // Összes hír lekérése
  async getAllNews() {
    // EXPLICIT ÁTADÁS: collection(this.firestore, ...)
    const colRef = collection(this.firestore, 'news');
    const q = query(colRef, orderBy('letrehozva', 'desc'));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }

  // Egy hír lekérése ID alapján
  async getNewsById(id: string) {
    // EXPLICIT ÁTADÁS: doc(this.firestore, ...)
    const docRef = doc(this.firestore, 'news', id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
  }
}