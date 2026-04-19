import { Component, OnInit, inject, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NewsService } from '../../services/news';
import { Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'app-hir-reszletek',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './hir-reszletek.component.html',
  styleUrls: ['./hir-reszletek.component.scss']
})
export class HirReszletekComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private newsService = inject(NewsService);
  protected cdr = inject(ChangeDetectorRef);
  
  hir: any = null;
  loading = true;
  private routeSub?: Subscription;

  ngOnInit() {
    // A paramMap-re való feliratkozás biztosítja, hogy ID váltáskor újra lefusson a lekérés
    this.routeSub = this.route.paramMap.pipe(
      switchMap(params => {
        this.loading = true;
        this.cdr.markForCheck(); // Jelezzük a változást
        const id = params.get('id');
        return id ? this.newsService.getNewsById(id) : Promise.resolve(null);
      })
    ).subscribe({
      next: (data) => {
        this.hir = data;
        this.loading = false;
        this.cdr.detectChanges(); // Azonnali UI frissítés az aszinkron hívás után
      },
      error: (err) => {
        console.error("Hiba a hír betöltésekor:", err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  ngOnDestroy() {
    // Memóriaszivárgás megelőzése
    this.routeSub?.unsubscribe();
  }
}