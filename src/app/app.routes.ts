import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ToListaComponent } from './pages/tavak/tavak.component';
import { ToReszletekComponent } from './pages/to-reszletek/to-reszletek.component';

import { HirekComponent } from './pages/hirek/hirek.component';
import { HirekSzerkesztoComponent } from './pages/hirek-szerkeszto/hirek-szerkeszto.component';
import { HirReszletekComponent } from './pages/hir-reszletek/hir-reszletek.component';

import { VersenyekComponent } from './pages/versenyek/versenyek.component';
import { VersenyReszletekComponent } from './pages/verseny-reszletek/verseny-reszletek.component';
import { VersenySzerkesztoComponent } from './pages/verseny-szerkeszto/verseny-szerkeszto.component';

import { GaleriaComponent } from './pages/fogasok/galeria.component';
import { GaleriaFeltoltoComponent } from './pages/fogasok/gallery-upload.component';

import { RolunkComponent } from './pages/rolunk/rolunk.component';

import { RegisztracioComponent } from './pages/regisztracio/regisztracio.component';
import { BejelentkezesComponent } from './pages/bejelentkezes/bejelentkezes.component';

import { ProfilComponent } from './pages/profil/profil.component';

import { authGuard } from './guards/auth-guard';
import { adminGuard } from './guards/admin-guard';

import { ToHozzaadComponent } from './pages/to-hozzaad/to-hozzaad.component';

export const routes: Routes = [

  { path: '', component: HomeComponent },

  // =========================
  // TAVAK
  // =========================
  { path: 'tavak', component: ToListaComponent },

  { path: 'tavak/:id', component: ToReszletekComponent },

  // =========================
  // HÍREK
  // =========================
  { path: 'hirek', component: HirekComponent },

  { path: 'hirek/:id', component: HirReszletekComponent },

  {
    path: 'hirek-szerkeszto',
    component: HirekSzerkesztoComponent,
    canActivate: [authGuard]
  },

  // =========================
  // VERSENYEK
  // =========================
  {
    path: 'versenyek',
    component: VersenyekComponent
  },

  {
    path: 'versenyek/:id',
    component: VersenyReszletekComponent
  },

  {
    path: 'verseny-szerkeszto',
    component: VersenySzerkesztoComponent,
    canActivate: [authGuard]
  },

  // =========================
  // GALÉRIA
  // =========================
  { path: 'galeria', component: GaleriaComponent },

  {
    path: 'kepfeltoltes',
    component: GaleriaFeltoltoComponent,
    canActivate: [authGuard]
  },

  // =========================
  // RÓLUNK
  // =========================
  { path: 'rolunk', component: RolunkComponent },

  // =========================
  // AUTH
  // =========================
  { path: 'regisztracio', component: RegisztracioComponent },

  { path: 'bejelentkezes', component: BejelentkezesComponent },

  {
    path: 'profil',
    component: ProfilComponent,
    canActivate: [authGuard]
  },

  // =========================
  // ADMIN
  // =========================
  {
    path: 'admin',
    canActivate: [adminGuard],

    loadComponent: () =>
      import('./pages/admin/admin-layout/admin-layout.component')
        .then(m => m.AdminLayoutComponent),

    children: [

      {
        path: '',

        loadComponent: () =>
          import('./pages/admin/admin-dashboard/admin-dashboard.component')
            .then(m => m.AdminDashboardComponent)
      },

      {
        path: 'users',

        loadComponent: () =>
          import('./pages/admin/admin-users/admin-users.component')
            .then(m => m.AdminUsersComponent)
      },

      {
        path: 'to-hozzaad',

        loadComponent: () =>
          import('./pages/to-hozzaad/to-hozzaad.component')
            .then(m => m.ToHozzaadComponent)
      }
    ]
  },

  // =========================
  // 404
  // =========================
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full'
  }
];