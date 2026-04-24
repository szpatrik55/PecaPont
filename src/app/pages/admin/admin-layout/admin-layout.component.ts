import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Az *ngFor-hoz
import { RouterModule } from '@angular/router'; // A routerLink-hez

@Component({
  selector: 'app-admin-layout',
  standalone: true, // Standalone komponensként jelölve
  imports: [CommonModule, RouterModule], // Szükséges eszközök importálása
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'] // Ha van külön CSS fájlod
})
export class AdminLayoutComponent {

  menuItems = [
    { label: 'Dashboard', icon: '📊', route: '/admin' },
    { label: 'Felhasználók', icon: '👤', route: '/admin/users' },
    { label: 'Tó hozzáadása', icon: '➕', route: '/admin/to-hozzaad' }
  ];

}