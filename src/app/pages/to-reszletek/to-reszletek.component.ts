import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import {
  Firestore,
  doc,
  docData
} from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { ReviewService } from '../../services/review';
import { AuthService } from '../../services/auth';
import { FormsModule } from '@angular/forms';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-to-adatlap',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './to-reszletek.component.html',
  styleUrl: './to-reszletek.component.scss'
})
export class ToReszletekComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private firestore = inject(Firestore);
  private reviewService = inject(ReviewService);
  private authService = inject(AuthService);

  lakeId!: string;

  reviews = signal<any[]>([]);
  isAdmin = signal(false);
  currentUserId = signal<string | null>(null);
  toAdat = signal<any>(null);

  ujErtekeles = signal({
    rating: 5,
    comment: ''
  });

  ngOnInit() {
    // ✅ Route + Firestore (HELYES)
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (!id) throw new Error('Nincs ID');

        this.lakeId = id;

        const ref = doc(this.firestore, `lakes/${id}`);
        return docData(ref);
      })
    ).subscribe(data => {
      this.toAdat.set(data);
    });

    // ✅ Review-k
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (!id) return;

      this.reviewService.getReviewsByLake(id).subscribe(data => {
        this.reviews.set(data);
      });
    });

    // ✅ User
    this.authService.appUser$.subscribe(user => {
      this.currentUserId.set(user?.uid || null);
      this.isAdmin.set(user?.role === 'admin');
    });
  }

  async submitReview() {
    await this.reviewService.addReview(
      this.lakeId,
      this.ujErtekeles().rating,
      this.ujErtekeles().comment
    );

    this.ujErtekeles.set({ rating: 5, comment: '' });
  }

  canModify(review: any): boolean {
    return this.isAdmin() || this.currentUserId() === review.userId;
  }

  async deleteReview(id: string) {
    await this.reviewService.deleteReview(id);
  }
}