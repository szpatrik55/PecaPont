import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { provideAuth, getAuth } from '@angular/fire/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB7k-N4xhzNaPt2pZc48kd4aAeyoLWKs_o",
  authDomain: "pecapont-50489.firebaseapp.com",
  projectId: "pecapont-50489",
  storageBucket: "pecapont-50489.firebasestorage.app",
  messagingSenderId: "1029335197913",
  appId: "1:1029335197913:web:f84de64072a44a2d0eb6c8",
  measurementId: "G-KYYVJJTTSN"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    provideAuth(() => getAuth()),
  ]
};