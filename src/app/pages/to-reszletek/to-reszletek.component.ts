import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-to-adatlap',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './to-reszletek.component.html',
  styleUrl: './to-reszletek.component.scss'
})
export class ToReszletekComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private firestore = inject(Firestore);
  
  toAdat = signal<any>(null);

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const docRef = doc(this.firestore, `lakes/${id}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        this.toAdat.set(docSnap.data());
      } else {
        console.error("Nincs ilyen tó az adatbázisban!");
      }
    }
  }
}