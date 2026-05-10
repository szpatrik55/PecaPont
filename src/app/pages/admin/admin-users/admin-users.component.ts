import {
  Component,
  OnInit,
  signal
} from '@angular/core';

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
import { LakeService } from '../../../services/lake';
import { Lake } from '../../../models/lake';

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

  loading:
    Record<string, boolean> = {};

  pendingRoles:
    Record<string, AppUser['role']> = {};

  selectedUserId = '';

  currentUsers: AppUser[] = [];

  // 🆕 Tavak
  lakes = signal<Lake[]>([]);

  // 🆕 User -> selected lake
  selectedLakeByUser:
    Record<string, string> = {};

  constructor(
    private adminService: AdminService,
    private lakeService: LakeService
  ) {

    this.users$ =
      this.refreshUsers$.pipe(

        switchMap(() =>
          this.adminService.getUsers()
        )
      );

    this.users$.subscribe(users => {

      this.currentUsers = users;
    });
  }

  ngOnInit(): void {

    // 🔥 Valódi Firestore tavak
    this.lakeService
      .getLakes()
      .subscribe(lakes => {

        this.lakes.set(lakes);
      });
  }

  trackByUser(
    index: number,
    user: AppUser
  ): string {

    return user.uid;
  }

  getPendingRole(
    user: AppUser
  ): AppUser['role'] {

    return (
      this.pendingRoles[user.uid]
      ?? user.role
    );
  }

  onRoleChange(
    user: AppUser,
    newRole: any
  ): void {

    this.pendingRoles[user.uid] =
      newRole;
  }

  get selectedUser():
    AppUser | undefined {

    return this.currentUsers.find(
      user =>
        user.uid ===
        this.selectedUserId
    );
  }

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

      user.role = newRole;

      delete this.pendingRoles[user.uid];

    } catch (err) {

      console.error('Hiba:', err);

    } finally {

      this.loading[user.uid] = false;
    }
  }

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

      if (
        this.selectedUserId ===
        user.uid
      ) {

        this.selectedUserId = '';
      }

      this.refreshUsers$.next();

    } catch (err) {

      console.error(err);

    } finally {

      this.loading[user.uid] = false;
    }
  }

  // 🆕 Manager hozzárendelés
  async assignManager(
    user: AppUser
  ) {

    const lakeId =
      this.selectedLakeByUser[user.uid];

    if (!lakeId) {

      alert('Válassz tavat!');
      return;
    }

    const lake =
      this.lakes().find(
        l => l.id === lakeId
      );

    if (!lake) return;

    this.loading[user.uid] = true;

    try {

      await this.adminService
        .assignManagerToLake(
          user,
          lake.id!,
          lake.nev
        );

      alert('Tókezelő hozzárendelve!');

      this.refreshUsers$.next();

    } catch (err) {

      console.error(err);

      alert('Hiba történt');

    } finally {

      this.loading[user.uid] = false;
    }
  }
}