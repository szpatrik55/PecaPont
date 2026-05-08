import { ApplicationConfig } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { provideAuth, getAuth } from '@angular/fire/auth';
import {
  provideCalendar,
  DateAdapter,
  CalendarUtils
} from 'angular-calendar';
import {
  adapterFactory
} from 'angular-calendar/date-adapters/date-fns';

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
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top'
      })
    ),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    provideAuth(() => getAuth()),
    provideCalendar({ provide: DateAdapter, useFactory: adapterFactory })
]
};