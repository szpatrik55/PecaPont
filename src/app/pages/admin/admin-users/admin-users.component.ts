import { Component, OnInit } from '@angular/core';
import {
  Observable,
  BehaviorSubject,
  switchMap
} from 'rxjs';

import {
  CommonModule,
  AsyncPipe
} from '@angular/common';

import { FormsModule } from '@angular/forms';

import { AdminService } from '../../../services/admin';
import { AppUser } from '../../../services/auth';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AsyncPipe
  ],
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent
implements OnInit {

  private refreshUsers$ =
    new BehaviorSubject<void>(undefined);

  users$: Observable<AppUser[]>;

  // 🔥 MEGMARAD AZ EREDETI
  loading:
    Record<string, boolean> = {};

  pendingRoles:
    Record<string, AppUser['role']> = {};

  // 🔥 ÚJ MOBILE VIEW
  selectedUserId = '';

  currentUsers: AppUser[] = [];

  constructor(
    private adminService: AdminService
  ) {

    // 🔥 EREDETI MEGMARAD
    this.users$ =
      this.refreshUsers$.pipe(

        switchMap(() =>
          this.adminService.getUsers()
        )
      );

    // 🔥 MOBILE CACHE
    this.users$.subscribe(users => {

      this.currentUsers = users;
    });
  }

  ngOnInit(): void {}

  // 🔥 EREDETI
  trackByUser(
    index: number,
    user: AppUser
  ): string {

    return user.uid;
  }

  // 🔥 EREDETI
  getPendingRole(
    user: AppUser
  ): AppUser['role'] {

    return (
      this.pendingRoles[user.uid]
      ?? user.role
    );
  }

  // 🔥 EREDETI
  onRoleChange(
    user: AppUser,
    newRole: any
  ): void {

    this.pendingRoles[user.uid] =
      newRole;
  }

  // 🔥 MOBILE SELECTED USER
  get selectedUser():
    AppUser | undefined {

    return this.currentUsers.find(
      user =>
        user.uid ===
        this.selectedUserId
    );
  }

  // 🔥 EREDETI + MOBILE SUPPORT
  async updateRole(
    user: AppUser
  ): Promise<void> {

    const newRole =
      this.pendingRoles[user.uid];

    if (
      !newRole ||
      newRole === user.role
    ) return;

    this.loading[user.uid] = true;

    try {

      await this.adminService.updateUserRole(
        user.uid,
        newRole
      );

      // 🔥 AZONNALI UI UPDATE
      user.role = newRole;

      delete this.pendingRoles[user.uid];

    } catch (err) {

      console.error('Hiba:', err);

    } finally {

      this.loading[user.uid] = false;
    }
  }

  // 🔥 EREDETI + MOBILE RESET
  async deleteUser(
    user: AppUser
  ): Promise<void> {

    const confirmed = confirm(
      `Biztosan törölni akarod?\n\n${user.email}`
    );

    if (!confirmed) return;

    this.loading[user.uid] = true;

    try {

      await this.adminService.deleteUser(
        user.uid
      );

      // 🔥 MOBILE RESET
      if (
        this.selectedUserId ===
        user.uid
      ) {

        this.selectedUserId = '';
      }

      // 🔥 EREDETI REFRESH
      this.refreshUsers$.next();

    } catch (err) {

      console.error(err);

    } finally {

      this.loading[user.uid] = false;
    }
  }
}