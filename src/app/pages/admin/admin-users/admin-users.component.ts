import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule, AsyncPipe } from '@angular/common'; //
import { FormsModule } from '@angular/forms'; //
import { AdminService } from '../../../services/admin'; //
import { AppUser } from '../../../services/auth'; //

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    AsyncPipe // <--- Ez elengedhetetlen az 'users$ | async' használatához standalone módban
  ],
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {
  users$: Observable<AppUser[]>;
  loading: Record<string, boolean> = {};
  pendingRoles: Record<string, AppUser['role']> = {};

  constructor(private adminService: AdminService) {
    // Az AdminService lekéri a 'users' kollekciót
    this.users$ = this.adminService.getUsers();
  }

  ngOnInit(): void {}

  trackByUser(index: number, user: AppUser): string {
    return user.uid; // A trackBy-hoz az uid-t használjuk
  }

  getPendingRole(user: AppUser): AppUser['role'] {
    return this.pendingRoles[user.uid] ?? user.role; //
  }

  onRoleChange(user: AppUser, newRole: any): void {
    this.pendingRoles[user.uid] = newRole; //
  }

  async updateRole(user: AppUser): Promise<void> {
    const newRole = this.pendingRoles[user.uid];
    if (!newRole || newRole === user.role) return;

    this.loading[user.uid] = true;

    try {
      await this.adminService.updateUserRole(user.uid, newRole); //
      delete this.pendingRoles[user.uid];
    } catch (err) {
      console.error('Hiba:', err);
    } finally {
      this.loading[user.uid] = false;
    }
  }
}