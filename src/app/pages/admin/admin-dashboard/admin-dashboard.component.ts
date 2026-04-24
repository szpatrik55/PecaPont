// admin-dashboard.component.ts
import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../services/admin';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  stats: { label: string; value: number | null }[] = [
    { label: 'Felhasználók', value: null },
    { label: 'Tavak', value: null },
    { label: 'Új felhasználók (7 nap)', value: null },
    { label: 'Aktív felhasználók (24h)', value: null }
  ];

  growthData: { date: string; count: number }[] = [];

  constructor(
    private adminService: AdminService,
    private zone: NgZone,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit(): Promise<void> {

    const [
      userCount,
      lakeCount,
      newUsers,
      activeUsers,
      growth
    ] = await Promise.all([
      this.adminService.getUserCount(),
      this.adminService.getLakeCount(),
      this.adminService.getNewUsersLast7Days(),
      this.adminService.getActiveUsers24h(),
      this.adminService.getUserGrowthLast7Days()
    ]);

    console.log('VALUES:', {
      userCount,
      lakeCount,
      newUsers,
      activeUsers,
      growth
    });

    this.zone.run(() => {
      this.stats = [
        { label: 'Felhasználók', value: userCount },
        { label: 'Tavak', value: lakeCount },
        { label: 'Új felhasználók (7 nap)', value: newUsers },
        { label: 'Aktív felhasználók (24h)', value: activeUsers }
      ];

      this.growthData = growth;

      this.cdr.detectChanges(); // 💥 biztos frissítés
    });
  }
}