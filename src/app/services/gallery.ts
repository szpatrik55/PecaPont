import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Storage, ref, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor(
    private firestore: Firestore,
    private storage: Storage
  ) {}

  async uploadImage(file: File, userId: string): Promise<string> {

    const path = `gallery/${userId}/${Date.now()}_${file.name}`;
    const storageRef = ref(this.storage, path);

    const task = uploadBytesResumable(storageRef, file);

    await task;

    return await getDownloadURL(storageRef);
  }

  async createPost(post: any) {

    const galleryRef = collection(this.firestore, 'gallery');

    return addDoc(galleryRef, post);
  }

}