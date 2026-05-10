import {
  Component,
  inject,
  signal
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AuthService } from '../../services/auth';
import { LakeService } from '../../services/lake';

import { Lake } from '../../models/lake';

@Component({
  selector: 'app-manager-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './manager-dashboard.component.html',
  styleUrl: './manager-dashboard.component.scss'
})
export class ManagerDashboardComponent {

  private authService =
    inject(AuthService);

  private lakeService =
    inject(LakeService);

  lakes = signal<Lake[]>([]);

  loading = signal(true);

  constructor() {

    this.authService.appUser$
      .subscribe(user => {

        if (!user?.uid) {

          this.loading.set(false);
          return;
        }

        if (
          user.role !== 'manager' &&
          user.role !== 'admin'
        ) {

          this.loading.set(false);
          return;
        }

        this.lakeService
          .getManagedLakes(user.uid)
          .subscribe(lakes => {

            this.lakes.set(lakes);

            this.loading.set(false);
          });
      });
  }
}