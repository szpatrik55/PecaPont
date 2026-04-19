import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-hir-reszletek',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './hir-reszletek.component.html',
  styleUrls: ['./hir-reszletek.component.scss']
})
export class HirReszletekComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private firestore = inject(Firestore);
  
  hir: any = null;
  loading = true;

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      try {
        // Fontos: a doc() függvénynek átadjuk az injektált firestore-t
        const docRef = doc(this.firestore, `news/${id}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          this.hir = { id: docSnap.id, ...docSnap.data() };
        }
      } catch (error) {
        console.error("Hiba a hír betöltésekor:", error);
      } finally {
        this.loading = false;
      }
    }
  }
}