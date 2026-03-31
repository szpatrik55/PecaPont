import { Component, inject, OnInit, signal } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-to-lista',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './tavak.component.html',
  styleUrl: './tavak.component.scss'
})
export class ToListaComponent implements OnInit {
  private firestore = inject(Firestore);
  
  tavak = signal<any[]>([]);
  betoltes = signal<boolean>(true);

  async ngOnInit() {
    console.log("Közvetlen lekérdezés indítása...");
    try {
      const colRef = collection(this.firestore, 'lakes');
      const snapshot = await getDocs(colRef);
      
      const adatok = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      this.tavak.set(adatok);
    } catch (error) {
      console.error("Firebase hiba történt:", error);
    } finally {
      this.betoltes.set(false);
    }
  }
}